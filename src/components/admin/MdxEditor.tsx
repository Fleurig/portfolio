'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';

const SAVE_SUCCESS_DISPLAY_DURATION_MS = 2500;

// Dynamically import to avoid SSR issues with MDXEditor
const MDXEditorComponent = dynamic(
  async () => {
    const {
      MDXEditor,
      headingsPlugin,
      listsPlugin,
      thematicBreakPlugin,
      toolbarPlugin,
      BoldItalicUnderlineToggles,
      BlockTypeSelect,
      CreateLink,
      linkPlugin,
      linkDialogPlugin,
      quotePlugin,
      markdownShortcutPlugin,
      frontmatterPlugin,
      InsertFrontmatter,
      UndoRedo,
      Separator,
    } = await import('@mdxeditor/editor');

    function Editor({
      markdown,
      onChange,
    }: {
      markdown: string;
      onChange: (val: string) => void;
    }) {
      return (
        <MDXEditor
          markdown={markdown}
          onChange={onChange}
          contentEditableClassName="mdxeditor-content"
          plugins={[
            frontmatterPlugin(),
            headingsPlugin(),
            listsPlugin(),
            thematicBreakPlugin(),
            quotePlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <CreateLink />
                  <Separator />
                  <InsertFrontmatter />
                </>
              ),
            }),
          ]}
        />
      );
    }

    return Editor;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center text-sm text-text-muted">
        Loading editor…
      </div>
    ),
  },
);

type Props = {
  initialContent: string;
  saveAction: (content: string) => Promise<{ success: true }>;
  /** Label shown in the save button, e.g. "Save CV" */
  label?: string;
};

export function MdxEditor({ initialContent, saveAction, label = 'Save' }: Props) {
  const contentRef = useRef<string>(initialContent);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  const handleChange = useCallback((val: string) => {
    contentRef.current = val;
    setStatus('idle');
  }, []);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await saveAction(contentRef.current);
        setStatus('saved');
        setTimeout(() => setStatus('idle'), SAVE_SUCCESS_DISPLAY_DURATION_MS);
      } catch {
        setStatus('error');
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar / action row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-text-muted">
          {status === 'saved' && (
            <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8l4 4 6-7" />
              </svg>
              Saved
            </span>
          )}
          {status === 'error' && (
            <span className="text-red-600 dark:text-red-400">Save failed — please try again.</span>
          )}
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {isPending ? (
            <>
              <svg aria-hidden="true" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Saving…
            </>
          ) : (
            <>
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 10v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3M8 2v8M5 7l3 3 3-3" />
              </svg>
              {label}
            </>
          )}
        </button>
      </div>

      {/* Editor surface */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <MDXEditorComponent markdown={initialContent} onChange={handleChange} />
      </div>
    </div>
  );
}
