# carve-lib (vendored)

This directory contains a compiled copy of [`@markup-carve/carve`](https://github.com/markup-carve/carve-js), the reference TypeScript implementation. The docs site imports it directly for the live [Playground](../../playground.md).

## Updating

Whenever carve-js gets a relevant change, rebuild and re-vendor:

```sh
npm run sync-carve-lib
```

That runs `cd ../carve-js && npm run build` and copies the resulting `dist/` into here.

Do not edit files in this directory by hand — they're overwritten on every sync.
