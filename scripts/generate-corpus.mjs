#!/usr/bin/env node
/*
 * Generate tests/corpus/ from docs/examples.md.
 *
 * Each `## Section name` in examples.md that is followed by a
 * `::: compare` block containing one ```carve and one ```html fence
 * becomes a pair of files:
 *
 *   tests/corpus/NN-slug.crv     ← Carve source
 *   tests/corpus/NN-slug.html    ← canonical HTML output
 *
 * These pairs are the executable spec. Any Carve implementation
 * (the reference TS one, or future ports) is expected to read each
 * .crv, produce HTML, and match the corresponding .html exactly.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const examplesPath = resolve(repoRoot, 'docs/examples.md')
const outDir = resolve(repoRoot, 'tests/corpus')

const src = readFileSync(examplesPath, 'utf8')
const lines = src.split('\n')

const examples = []
let currentSection = null
let mode = 'scanning'
let pendingBlocks = { carve: null, html: null }
let currentLang = null
let fenceMarker = null
let blockLines = []

const finalizePair = () => {
  if (currentSection && pendingBlocks.carve && pendingBlocks.html) {
    examples.push({
      section: currentSection,
      carve: pendingBlocks.carve,
      html: pendingBlocks.html,
    })
  }
  pendingBlocks = { carve: null, html: null }
}

for (const line of lines) {
  const h2 = line.match(/^##\s+(.+?)\s*$/)
  if (h2 && mode === 'scanning') {
    currentSection = h2[1]
    pendingBlocks = { carve: null, html: null }
    continue
  }

  if (mode === 'scanning' && line.trim() === '::: compare') {
    mode = 'in_compare'
    continue
  }

  if (mode === 'in_compare') {
    if (line.trim() === ':::') {
      finalizePair()
      mode = 'scanning'
      continue
    }
    const fenceOpen = line.match(/^(`{3,})(carve|html)\s*$/)
    if (fenceOpen) {
      fenceMarker = fenceOpen[1]
      currentLang = fenceOpen[2]
      blockLines = []
      mode = 'in_fence'
    }
    continue
  }

  if (mode === 'in_fence') {
    if (line.startsWith(fenceMarker) && line.slice(fenceMarker.length).trim() === '') {
      pendingBlocks[currentLang] = blockLines.join('\n')
      mode = 'in_compare'
      currentLang = null
      fenceMarker = null
      continue
    }
    blockLines.push(line)
  }
}

// Clean and recreate output dir
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const slugify = (s) =>
  s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

let n = 0
for (const ex of examples) {
  n += 1
  const idx = String(n).padStart(2, '0')
  const slug = slugify(ex.section)
  const base = `${idx}-${slug}`
  writeFileSync(resolve(outDir, `${base}.crv`), ex.carve + '\n')
  writeFileSync(resolve(outDir, `${base}.html`), ex.html + '\n')
  console.log(`  ${base}.{crv,html}`)
}

console.log(`\nWrote ${examples.length} pairs to ${outDir}`)
