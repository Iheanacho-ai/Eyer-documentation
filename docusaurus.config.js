// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Eyer',
  tagline: 'AIOps platform for modern software teams',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://eyer-docs.netlify.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'eyer', // Usually your GitHub org/user name.
  projectName: 'Eyer-documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/Iheanacho-ai/Eyer-documentation/tree/main/docs',
        },
        blog: false,
        //{
        //   showReadingTime: true,
        //   blogSidebarCount: 10,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {name: 'keywords', content: 'Eyer, organization, technology, observability'},
      ],
      headTags:[
        {
          tagName: 'link',
          attributes: {
            rel: 'preconnect',
            href: 'https://www.eyer.ai/',
          },
        },
        // Declare some json-ld structured data
        {
          tagName: 'script',
          attributes: {
            type: 'application/ld+json',
          },
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Organization',
            name: 'Eyer',
            url: 'https://www.eyer.ai/',
            logo: '',
          }),
        },
      ],
      navbar: {
        title: 'Eyer',
        logo: {
          alt: 'Eyer',
          src: 'img/favicon.ico',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          // {to: '/tutorial', label: 'Tutorials', position: 'left'},
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Iheanacho-ai/Eyer-documentation',
            label: 'GitHub',
            position: 'right',
          },{
            href: 'https://discord.gg/FW4FZ9avfs',
            label: 'Discord',
            position: 'right',
          }, 
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/FW4FZ9avfs',
              },
              {
                label: 'Twitter',
                href: 'https://x.com/eyer_ai',
              },
            ],
          }
        ],
          copyright: `Copyright © ${new Date().getFullYear()} Eyer.`,
      },
      plugins: [
        async function myPlugin(context, options) {
          return {
            name: "docusaurus-tailwindcss",
            configurePostCss(postcssOptions) {
              // Appends TailwindCSS and AutoPrefixer.
              postcssOptions.plugins.push(require("tailwindcss"));
              postcssOptions.plugins.push(require("autoprefixer"));
              return postcssOptions;
            },
          };
        },
      ],
      // plugins: [
      //   [
      //     '@docusaurus/plugin-content-blog',
      //     {
      //       /**
      //        * Required for any multi-instance plugin
      //        */
      //       id: 'blog',
      //       /**
      //        * URL route for the blog section of your site.
      //        * *DO NOT* include a trailing slash.
      //        */
      //       routeBasePath: 'blog',
      //       /**
      //        * Path to data on filesystem relative to site dir.
      //        */
      //       path: './blog',
      //       postsPerPage: 2,
      //       feedOptions: {
      //         type: 'all',
      //         copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
      //       },
      //     },
      //   ],
      //   [
      //     '@docusaurus/plugin-content-blog',
      //     {
      //       id: 'tutorial',
      //       routeBasePath: 'tutorial',
      //       path: './tutorial',
      //       sidebarPath: require.resolve('./sidebarsTutorials.js'),
      //       postsPerPage: 2,
      //       feedOptions: {
      //         type: 'all',
      //         copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
      //       },
      //     },
      //   ]
      // ],
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
