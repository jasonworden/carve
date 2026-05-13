import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import githubLight from 'shiki/themes/github-light.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const carveGrammar = JSON.parse(
  readFileSync(resolve(__dirname, './syntaxes/carve.tmLanguage.json'), 'utf8'),
)

// Extend the bundled GitHub themes with rules for Carve scopes that don't
// have stock styling: highlight, subscript, superscript. Strikethrough has
// a built-in rule (fontStyle: strikethrough) but Shiki's HTML emitter has
// a long-standing limitation where it doesn't translate the strikethrough
// fontStyle bit into text-decoration in its output — see the transformer
// below for that.
const carveLightExtras = [
  { scope: 'markup.highlight', settings: { foreground: '#b08800', fontStyle: 'bold' } },
  { scope: 'markup.superscript', settings: { foreground: '#6f42c1' } },
  { scope: 'markup.subscript', settings: { foreground: '#6f42c1' } },
]

const carveDarkExtras = [
  { scope: 'markup.highlight', settings: { foreground: '#ffd33d', fontStyle: 'bold' } },
  { scope: 'markup.superscript', settings: { foreground: '#b392f0' } },
  { scope: 'markup.subscript', settings: { foreground: '#b392f0' } },
]

const carveLightTheme = {
  ...githubLight,
  tokenColors: [...githubLight.tokenColors, ...carveLightExtras],
}

const carveDarkTheme = {
  ...githubDark,
  tokenColors: [...githubDark.tokenColors, ...carveDarkExtras],
}

// Shiki sets fontStyle bit 8 for strikethrough on the token but does not
// emit `text-decoration: line-through` in its dual-theme HTML output.
// Bridge that with a transformer that adds the inline CSS for any token
// whose fontStyle bit is set, plus vertical-align / background for tokens
// matching our subscript / superscript / highlight scopes (detected via
// explanation, which we opt into in preprocess).
const FontStyle = { Italic: 1, Bold: 2, Underline: 4, Strikethrough: 8 }

const carveStylingTransformer = {
  name: 'carve-extras',
  preprocess(_code: string, options: Record<string, unknown>) {
    options.includeExplanation = 'scopeName'
  },
  tokens(tokens: Array<Array<{
    fontStyle?: number
    htmlAttrs?: Record<string, string>
    explanation?: Array<{ scopes: Array<{ scopeName: string }> }>
  }>>) {
    for (const line of tokens) {
      for (const tk of line) {
        const scopes = tk.explanation?.flatMap((e) =>
          e.scopes.map((s) => s.scopeName),
        ) ?? []
        const hasScope = (prefix: string) => scopes.some((s) => s.startsWith(prefix))

        const mark = (attr: string) => {
          if (!tk.htmlAttrs) tk.htmlAttrs = {}
          tk.htmlAttrs[attr] = ''
        }

        if ((tk.fontStyle ?? 0) & FontStyle.Strikethrough || hasScope('markup.strikethrough')) {
          mark('data-carve-strike')
        }
        if (hasScope('markup.superscript')) mark('data-carve-super')
        if (hasScope('markup.subscript')) mark('data-carve-sub')
        if (hasScope('markup.highlight')) mark('data-carve-highlight')
      }
    }
  },
}

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
    theme: { light: carveLightTheme, dark: carveDarkTheme },
    codeTransformers: [carveStylingTransformer],
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
