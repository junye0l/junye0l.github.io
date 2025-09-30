import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  // 🏠 기본 사이트 정보
  title: 'Junyeol Blog',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/main.ico',

  // 🚀 호스팅 설정  
  url: 'https://junyeol.github.io',
  baseUrl: '/',

  // 📁 GitHub Pages 배포용
  organizationName: 'junye0l',
  projectName: 'junye0l.github.io',

  // ⚠️ 에러 처리 설정
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 🌍 다국어 설정 
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  // 🔧 플러그인 및 프리셋 설정
  presets: [
    [
      'classic',
      {
        // 📖 문서를 메인 페이지로
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/junye0l/my-blog/tree/main/',
        },

        // ✍️ 블로그는 /blog 경로로
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

        // 🎨 테마 설정
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // 🎨 테마 상세 설정
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    // 🧭 네비게이션 바
    navbar: {
      title: 'Junyeol',
      logo: {
        alt: 'My Site Logo',
        src: 'img/main.ico',
      },
      items: [
        // Study 탭 (메인)
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        
        // 블로그 링크
        {
          to: '/blog', 
          label: 'Blog', 
          position: 'left',
        },
        
        // 태그 페이지
        {
          to: '/blog/tags', 
          label: 'Tags', 
          position: 'left',
        },
        
        // GitHub 링크
        {
          href: 'https://github.com/junye0l',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    // 🎨 코드 하이라이팅 테마
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'python', 'javascript'],
    },

    // 🌙 다크모드 설정
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
