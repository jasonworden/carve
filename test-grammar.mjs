import { createHighlighter } from 'shiki'
import { readFileSync } from 'node:fs'

const grammar = JSON.parse(readFileSync('./docs/.vitepress/syntaxes/carve.tmLanguage.json', 'utf8'))
const hl = await createHighlighter({ themes: ['github-light'], langs: [grammar] })

const code = '`inline code`\n\n```language\ncode block\n```'

const result = hl.codeToTokens(code, { lang: 'carve', theme: 'github-light', includeExplanation: 'scopeName' })
for (const [i, line] of result.tokens.entries()) {
  console.log(`Line ${i}:`)
  for (const t of line) {
    const scopes = t.explanation?.flatMap(e => e.scopes.map(s => s.scopeName)) ?? []
    console.log(`  "${t.content}" -> [${scopes.join(', ')}]`)
  }
}
