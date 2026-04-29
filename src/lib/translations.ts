export type Locale = 'nl' | 'en';

export type Translations = {
  nav: {
    cv: string;
    projects: string;
    contact: string;
    switchLanguage: string;
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

const dict: Record<Locale, Translations> = {
  nl: {
    nav: {
      cv: 'CV',
      projects: 'Projecten',
      contact: 'Contact',
      switchLanguage: 'Wissel taal',
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
    nav: {
      cv: 'CV',
      projects: 'Projects',
      contact: 'Contact',
      switchLanguage: 'Switch language',
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
};

export function t(locale: Locale): Translations {
  return dict[locale];
}
