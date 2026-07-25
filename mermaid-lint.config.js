/**
 * Mermaid diagram linting for the Carve docs.
 *
 * Carve renders Mermaid through a Tier-3 extension but treats the diagram body
 * as an opaque code fence — it never parses Mermaid grammar. Without this lint a
 * broken diagram sails through CI and only fails later, in the reader's browser.
 *
 * Config lives here rather than in the `lint:mermaid` flags so editor and
 * toolchain adapters (VS Code, remark, markdownlint) apply the same settings.
 */
export default {
  // Carve's own diagrams live inside .crv documents (the playground demo), not
  // just Markdown, so discovery has to look past the default md/mdx/mmd set.
  extensions: ['crv'],

  // Fail on warnings, not just parse errors. Only `duplicate-ids` defaults to
  // "error"; the other ~56 semantic rules report at "warn", so without this
  // they would report into a log nobody reads and never gate a PR.
  //
  // `quiet` has no config key, so `lint:mermaid` passes --quiet on the command
  // line: it drops one "scanning" line per tracked file (706 lines -> 3 here)
  // while still printing warnings. That combination needs mermaid-lint >= 0.35.2
  // — before that fix, --quiet + strict exited 1 while printing "all valid"
  // (jasonworden/mermaid-lint#120).
  strict: true,
}
