import { createHighlighter } from 'shiki'
import { readFileSync } from 'node:fs'

const grammar = JSON.parse(readFileSync('./docs/.vitepress/syntaxes/carve.tmLanguage.json', 'utf8'))
const hl = await createHighlighter({ themes: ['github-light'], langs: [grammar] })

const cases = {
  list: '- unordered item\n1. ordered item\n- [ ] task     - [x] done',
  table: '|= Header |= Header |\n| Cell    | Cell    |\n| ^       | spanned |\n| Header  | <       |\n+ continuation cell  |',
  admonition: '::: note\nadmonition content\n:::',
  caption: '^ Figure 1: Caption text',
  attr: '{#id .class key=value}',
  ext: ':youtube[VIDEO_ID]\n@username   #tagname',
  abbr: '*[HTML]: HyperText Markup Language',
}

for (const [name, code] of Object.entries(cases)) {
  console.log(`=== ${name} ===`)
  const r = hl.codeToTokens(code, { lang: 'carve', theme: 'github-light', includeExplanation: 'scopeName' })
  for (const [i, line] of r.tokens.entries()) {
    for (const t of line) {
      const scopes = t.explanation?.flatMap(e => e.scopes.map(s => s.scopeName).filter(s => s !== 'source.carve')) ?? []
      console.log(`  L${i}: "${t.content}" -> [${scopes.join(', ')}]`)
    }
  }
}
