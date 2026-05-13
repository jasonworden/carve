/*
 * Public API for @markup-carve/carve.
 *
 * Implementation status:
 *   ✓ Headings (M1, step 1)
 *   - Paragraphs, lists, blockquotes, fences, tables, frontmatter, hr,
 *     admonitions, captions — to come in M1
 *   - All inline constructs — to come in M2
 */
import { parse as parseImpl } from './parse.js';
import { renderHtml as renderHtmlImpl } from './render-html.js';
export * from './ast.js';
/** Parse Carve source into a typed AST. */
export function parse(source, opts = {}) {
    return parseImpl(source, opts);
}
/** Render a Carve AST to HTML matching the spec corpus. */
export function renderHtml(ast, opts = {}) {
    return renderHtmlImpl(ast, opts);
}
/** Convenience: parse + render in one call. */
export function carveToHtml(source, opts = {}) {
    return renderHtml(parse(source, opts), opts);
}
//# sourceMappingURL=index.js.map