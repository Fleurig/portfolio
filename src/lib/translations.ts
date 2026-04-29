export type Theme = 'dark' | 'light' | 'contrast';

export type Translations = {
  brand: {
    name: string;
    location: string;
  };
  nav: {
    cv: string;
    projects: string;
    contact: string;
    switchLanguage: string;
  };
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    themeSystem: string;
    themeDark: string;
    themeLight: string;
    themeContrast: string;
  };
  footer: {
    builtWith: string;
  };
  pages: {
    homeTitle: string;
    projectsTitle: string;
    projectsIntro: string;
    cvTip: string;
    cvDownload: string;
  };
};

const dict = {
  nl: {
    brand: {
      name: 'Fleur Albers',
      location: 'Haarlem',
    },
    nav: {
      cv: 'CV',
      projects: 'Projecten',
      contact: 'Contact',
      switchLanguage: 'Wissel taal',
    },
    a11y: {
      skipToContent: 'Ga naar inhoud',
      toggleTheme: 'Thema wisselen',
      themeSystem: 'Systeem',
      themeDark: 'Donker',
      themeLight: 'Licht',
      themeContrast: 'Hoog contrast',
    },
    footer: {
      builtWith: 'Gebouwd met Next.js + MDX.',
    },
    pages: {
      homeTitle: 'Home',
      projectsTitle: 'Projecten',
      projectsIntro:
        'Een selectie van producten en platformen waar ik aan heb gewerkt — met focus op UX, toegankelijkheid en onderhoudbare front-end architectuur.',
      cvTip: 'Tip: gebruik je browser print-dialog voor een nette A4 export.',
      cvDownload: 'Download CV (PDF)',
    },
  },
  en: {
    brand: {
      name: 'Fleur Albers',
      location: 'Haarlem',
    },
    nav: {
      cv: 'CV',
      projects: 'Projects',
      contact: 'Contact',
      switchLanguage: 'Switch language',
    },
    a11y: {
      skipToContent: 'Skip to content',
      toggleTheme: 'Toggle theme',
      themeSystem: 'System',
      themeDark: 'Dark',
      themeLight: 'Light',
      themeContrast: 'High contrast',
    },
    footer: {
      builtWith: 'Built with Next.js + MDX.',
    },
    pages: {
      homeTitle: 'Home',
      projectsTitle: 'Projects',
      projectsIntro:
        'A selection of products and platforms I worked on — focusing on UX, accessibility, and maintainable front-end architecture.',
      cvTip: 'Tip: use your browser print dialog for a clean A4 export.',
      cvDownload: 'Download CV (PDF)',
    },
  },
} as const satisfies Record<'nl' | 'en', Translations>;

export function t(locale: 'nl' | 'en'): Translations {
  return dict[locale];
}
