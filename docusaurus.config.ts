import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Junyeol Blog',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/main.ico',

  url: 'https://junyeol.github.io',
  baseUrl: '/',

  organizationName: 'junye0l',
  projectName: 'junye0l.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/junye0l/my-blog/tree/main/',
        },

        blog: {
          routeBasePath: 'blog',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          blogTitle: 'Junyeol',
          blogDescription: '개발과 공부를 기록하는 블로그',
          postsPerPage: 5,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 100,
          editUrl: 'https://github.com/junye0l/my-blog/tree/main/',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    navbar: {
      title: 'Junyeol',
      logo: {
        alt: 'My Site Logo',
        src: 'img/main.ico',
      },
      items: [

        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        
        {
          to: '/blog', 
          label: 'Blog', 
          position: 'left',
        },

        {
          to: '/blog/tags', 
          label: 'Tags', 
          position: 'left',
        },
        

        {
          href: 'https://github.com/junye0l',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'python', 'javascript'],
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
