import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Junyeol Blog',
  tagline: '개발과 공부를 기록하는 블로그',
  favicon: 'img/main-icon.svg',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: '개발, 코딩테스트, JavaScript, React, 블로그',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: 'Junyeol',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '개발 지식과 코딩테스트 문제 풀이를 기록하는 개발 블로그',
      },
    },
  ],

  url: 'https://junyeol.blog',
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
          showLastUpdateTime: false,
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

        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
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
        hideable: false,
        autoCollapseCategories: true,
      },
    },

    navbar: {
      title: 'Junyeol',
      hideOnScroll: false,
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
