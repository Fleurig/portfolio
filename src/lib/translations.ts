export type Theme = 'dark' | 'light' | 'contrast';

export type Translations = {
  brand: {
    name: string;
    location: string;
  };
  nav: {
    home: string;
    back: string;
    cv: string;
    projects: string;
    contact: string;
    switchLanguage: string;
    featured: string;
  };
  a11y: {
    skipToContent: string;
    toggleTheme: string;
    themeDark: string;
    themeLight: string;
    themeContrast: string;
    externalLinkNewTab: string;
    useSystemTheme: string;
  };
  seo: {
    siteName: string;
    homeTitle: string;
    homeDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    cvTitle: string;
    cvDescription: string;
    contactTitle: string;
    contactDescription: string;
  };
  footer: {
    builtWith: string;
  };
  pages: {
    projectsIntro: string;
    cvTip: string;
    cvDownload: string;
    projectWebsite: string;
  };
};

const dict = {
  nl: {
    brand: {
      name: 'Fleur Albers',
      location: 'Haarlem',
    },
    nav: {
      home: 'Home',
      back: 'Terug',
      cv: 'CV',
      projects: 'Projecten',
      contact: 'Contact',
      switchLanguage: 'Wissel taal',
      featured: 'Uitgelicht',
    },
    a11y: {
      skipToContent: 'Ga naar inhoud',
      toggleTheme: 'Thema wisselen',
      themeDark: 'Donker thema',
      themeLight: 'Licht thema',
      themeContrast: 'Hoog contrast',
      externalLinkNewTab: 'Opent in een nieuw tabblad',
      useSystemTheme: 'Gebruik systeem thema',
    },
    seo: {
      siteName: 'Fleur Albers',
      homeTitle: 'Home',
      homeDescription:
        'Portfolio en CV van Fleur Albers (Haarlem) — Front-end Developer (React/Next.js).',
      projectsTitle: 'Projecten',
      projectsDescription:
        'Selectie van projecten: multi-tenant apps, design systems en form-heavy workflows.',
      cvTitle: 'CV',
      cvDescription:
        'CV van Fleur Albers — ervaring, projecten, skills en opleiding (print-friendly).',
      contactTitle: 'Contact',
      contactDescription:
        'Contactgegevens en links om Fleur Albers te bereiken.',
    },
    footer: {
      builtWith: '',
    },
    pages: {
      projectsIntro:
        'Een selectie van producten en platformen waar ik aan heb gewerkt — met focus op UX, toegankelijkheid en onderhoudbare front-end architectuur.',
      cvTip: 'Tip: gebruik je browser print-dialog voor een nette A4 export.',
      cvDownload: 'Download CV (PDF)',
      projectWebsite: 'Website',
    },
  },
  en: {
    brand: {
      name: 'Fleur Albers',
      location: 'Haarlem',
    },
    nav: {
      home: 'Home',
      back: 'Back',
      cv: 'CV',
      projects: 'Projects',
      contact: 'Contact',
      switchLanguage: 'Switch language',
      featured: 'Featured',
    },
    a11y: {
      skipToContent: 'Skip to content',
      toggleTheme: 'Toggle theme',
      themeDark: 'Dark theme',
      themeLight: 'Light theme',
      themeContrast: 'High contrast',
      externalLinkNewTab: 'Opens in a new tab',
      useSystemTheme: 'Use system theme',
    },
    seo: {
      siteName: 'Fleur Albers',
      homeTitle: 'Home',
      homeDescription:
        'Portfolio and CV of Fleur Albers (Haarlem) — Front-end Developer (React/Next.js).',
      projectsTitle: 'Projects',
      projectsDescription:
        'Selected projects: multi-tenant apps, design systems, and form-heavy workflows.',
      cvTitle: 'CV',
      cvDescription:
        'CV of Fleur Albers — experience, projects, skills and education (print-friendly).',
      contactTitle: 'Contact',
      contactDescription:
        'Contact details and links to reach Fleur Albers.',
    },
    footer: {
      builtWith: '',
    },
    pages: {
      projectsIntro:
        'A selection of products and platforms I worked on — focusing on UX, accessibility, and maintainable front-end architecture.',
      cvTip: 'Tip: use your browser print dialog for a clean A4 export.',
      cvDownload: 'Download CV (PDF)',
      projectWebsite: 'Website',
    },
  },
} as const satisfies Record<'nl' | 'en', Translations>;

export function t(locale: 'nl' | 'en'): Translations {
  return dict[locale];
}
