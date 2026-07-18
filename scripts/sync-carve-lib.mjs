#!/usr/bin/env node
/*
 * Rebuild ../carve-js and copy its dist/ into docs/.vitepress/carve-lib.
 *
 * The Playground page imports the vendored copy directly. Whenever
 * carve-js changes, run `npm run sync-carve-lib` (here) to refresh.
 */

import { execSync } from 'node:child_process'
import {
  mkdirSync,
  readdirSync,
  unlinkSync,
  copyFileSync,
  statSync,
  existsSync,
} from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const carveJsRoot = resolve(repoRoot, '../carve-js')
const libDir = resolve(repoRoot, 'docs/.vitepress/carve-lib')

if (!existsSync(carveJsRoot)) {
  console.error(
    `carve-js not found at ${carveJsRoot}.\n` +
      `Clone it next to this repo:\n` +
      `  cd .. && git clone https://github.com/markup-carve/carve-js.git\n`,
  )
  process.exit(1)
}

console.log(`Building carve-js at ${carveJsRoot}...`)
execSync('npm run build', { cwd: carveJsRoot, stdio: 'inherit' })

const distDir = resolve(carveJsRoot, 'dist')
mkdirSync(libDir, { recursive: true })

// Clear existing vendored files (preserve README). The copy loop below copies
// every file in dist/, so clear every file too - a predicate that only removed
// .js/.d.ts/.map would leave stale artifacts of any other extension behind.
for (const f of readdirSync(libDir)) {
  if (f === 'README.md') continue
  const p = resolve(libDir, f)
  if (statSync(p).isFile()) unlinkSync(p)
}

let count = 0
for (const f of readdirSync(distDir)) {
  const src = resolve(distDir, f)
  if (!statSync(src).isFile()) continue
  copyFileSync(src, join(libDir, f))
  count += 1
}
console.log(`Copied ${count} files to ${libDir}`)
