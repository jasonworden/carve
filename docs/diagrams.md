---
title: "Diagrams & Charts"
description: Draw UML, flowcharts, graphs and charts from fenced code blocks - diagrams-as-code in Carve.
---

# Diagrams & Charts

Carve draws diagrams from **fenced code blocks**. The diagram stays plain text in
your source - no binary image to keep in sync, no ASCII art to hand-align - and a
client library or a build step turns it into real vector output.

````carve
``` mermaid
classDiagram
  class Parser {
    +parse(source) Document
    -blockPass()
  }
  Parser --> Document : produces
  Document <|-- Section
```
````

That is the whole authoring story. Everything below is about which languages are
available and who does the drawing.

## Available presets

All seven are instances of one extension, `FencedRender`: a renderer claims a
fenced block by its language word and emits a single hydration element.

| Fence word | Draws | Mode |
| ---------- | ----- | ---- |
| `mermaid` | flowcharts, UML (class, sequence, state, ER), Gantt, C4 | text |
| `d2` | declarative diagrams, layered layouts | text |
| `graphviz` (`dot`) | directed / undirected graphs | text |
| `wavedrom` | digital timing diagrams, register maps | text |
| `abc` | musical notation | text |
| `vega-lite` | statistical charts from a grammar-of-graphics spec | json |
| `chart` | Chart.js charts | json |

Any other client-rendered language needs no new code, only a new instance with
its own fence word.

## UML specifically

Mermaid covers most of UML directly:

| Diagram | Mermaid keyword |
| ------- | --------------- |
| Class | `classDiagram` |
| Sequence | `sequenceDiagram` |
| State | `stateDiagram-v2` |
| Entity relationship | `erDiagram` |
| Activity | `flowchart` / `graph` |

````carve
``` mermaid
sequenceDiagram
  participant U as User
  participant P as Parser
  U->>P: parse(source)
  P-->>U: Document
```
````

Use-case, component, deployment and timing diagrams are **not** covered by
Mermaid. There is currently no PlantUML preset; for those diagram types, render
externally and embed the result as an image.

## What Carve emits

Carve emits only the marker element. Loading the client library and hydrating it
is the host's job.

**Text mode** (Mermaid, D2, Graphviz, WaveDrom, ABC) escapes the body inside a
`<pre>`. Note that `&` and `<` are escaped but `>` is preserved, so arrow syntax
like `-->` survives intact:

```html
<pre class="mermaid">graph LR; A --&gt; B</pre>
```

**JSON mode** (Vega-Lite, Chart.js) emits the body verbatim inside a script tag:

```html
<div class="chart"><script type="application/json">{"type":"bar"}</script></div>
```

## Rendering without a browser

For PDF, email, or any output with no client-side JavaScript, `renderStatic`
accepts a **renderers** map. The canonical keys are `mermaid`, `chart`,
`graphviz` and `math`; implementations must use exactly these names so one config
behaves identically across engines.

Renderers are synchronous (`source -> string`). An async tool such as `mmdc` or
an HTTP service must run in a build step and be supplied as a pre-resolved
lookup, not awaited inside the render. A renderer typically returns a
self-contained `data:` image URI, so if you sanitize the static HTML afterwards,
**allow the `data:` scheme for images** or the diagram is silently stripped.

Working per-engine recipes are in
[Static Rendering Recipes](/static-rendering-recipes).

## Degradation

When the extension is off, or no renderer is supplied for that key, the fence
falls back to its **source as a code block**. It never renders blank. The
diagram description stays readable in the document, which is the point of
keeping it as text in the first place.

See [Graceful Degradation](/graceful-degradation) for the full matrix.

## Enabling

`FencedRender` is a Tier-3 extension and ships **off**. Turn it on per document
or per project in your engine's extension configuration; see the
[Extensions Contract](/extensions) and each implementation's own
`docs/extensions.md` for the client libraries it pairs with.

Because Tier-3 output is never conformance-pinned, these presets are free to
track upstream diagram libraries without a spec change.
