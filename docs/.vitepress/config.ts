import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const carveGrammar = JSON.parse(
  readFileSync(resolve(__dirname, './syntaxes/carve.tmLanguage.json'), 'utf8'),
)

// If the repo is published at https://markup-carve.github.io/carve/
// keep `base: '/carve/'`. If you publish from an org page repo named
// `markup-carve.github.io`, change `base` to '/'.
export default defineConfig({
  title: 'Carve',
  description: 'A post-Djot markup language with visual mnemonics and human-centered design.',
  base: '/carve/',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    languages: [carveGrammar],
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Carve' }],
    ['meta', { property: 'og:description', content: 'A post-Djot markup language with visual mnemonics.' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Case Study', link: '/casestudy_carve' },
      {
        text: 'Reference',
        items: [
          { text: 'Edge Cases', link: '/edge-cases' },
          { text: 'Native Features', link: '/native-features-analysis' },
          { text: 'Markup Language Comparison', link: '/markup-languages' },
        ],
      },
      { text: 'Design Notes', link: '/dismissed-syntax' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
        ],
      },
      {
        text: 'Specification',
        items: [
          { text: 'Case Study', link: '/casestudy_carve' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Edge Cases', link: '/edge-cases' },
          { text: 'Native Features', link: '/native-features-analysis' },
          { text: 'Markup Language Comparison', link: '/markup-languages' },
        ],
      },
      {
        text: 'Design Notes',
        items: [
          { text: 'Dismissed Syntax', link: '/dismissed-syntax' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/markup-carve' },
    ],

    editLink: {
      pattern: 'https://github.com/markup-carve/carve/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Carve — a post-Djot markup language.',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },
  },
})
