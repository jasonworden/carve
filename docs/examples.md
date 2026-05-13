---
title: Examples
description: Side-by-side Carve source and the HTML it produces.
---

# Examples

Each pair shows the Carve source on the left and the HTML it produces on the right. The HTML rendering reflects the *intended* output — Carve itself is still a spec, so think of these as the contract a future implementation should honor.

## Emphasis

::: compare

```carve
/italic/  *bold*  /*bold italic*/
_underline_  ~strikethrough~
^super^  ,,sub,,  ==highlight==
```

```html
<em>italic</em>  <strong>bold</strong>  <strong><em>bold italic</em></strong>
<u>underline</u>  <s>strikethrough</s>
<sup>super</sup>  <sub>sub</sub>  <mark>highlight</mark>
```

:::

## Headings

::: compare

```carve
# Welcome
## Getting started
### Setup
```

```html
<h1>Welcome</h1>
<h2>Getting started</h2>
<h3>Setup</h3>
```

:::

## Links

::: compare

```carve
Read [Djot](https://djot.net) for details.
```

```html
<p>Read <a href="https://djot.net">Djot</a> for details.</p>
```

:::

## Images

::: compare

```carve
![Apollo 11](apollo.jpg)
```

```html
<img src="apollo.jpg" alt="Apollo 11">
```

:::

## Lists

::: compare

```carve
- apples
- oranges
- pears
```

```html
<ul>
  <li>apples</li>
  <li>oranges</li>
  <li>pears</li>
</ul>
```

:::

## Task lists

::: compare

```carve
- [ ] todo
- [x] done
```

```html
<ul>
  <li><input type="checkbox" disabled> todo</li>
  <li><input type="checkbox" checked disabled> done</li>
</ul>
```

:::

## Blockquote with attribution

::: compare

```carve
> Stay hungry, stay foolish.
^ Steve Jobs
```

```html
<figure>
  <blockquote><p>Stay hungry, stay foolish.</p></blockquote>
  <figcaption>Steve Jobs</figcaption>
</figure>
```

:::

## Image with caption

::: compare

```carve
![Apollo 11](apollo.jpg)
^ Figure 1: First moon landing
```

```html
<figure>
  <img src="apollo.jpg" alt="Apollo 11">
  <figcaption>Figure 1: First moon landing</figcaption>
</figure>
```

:::

## Tables

::: compare

```carve
|= Fruit |= Price |
| Apple  | $1     |
| Pear   | $2     |
^ Fruit prices
```

```html
<table>
  <caption>Fruit prices</caption>
  <thead><tr><th>Fruit</th><th>Price</th></tr></thead>
  <tbody>
    <tr><td>Apple</td><td>$1</td></tr>
    <tr><td>Pear</td><td>$2</td></tr>
  </tbody>
</table>
```

:::

## Tables with rowspan and colspan

::: compare

```carve
|= Category |= Item    |= Price |
| Fruit     | Apple    | $1     |
| ^         | Banana   | $0.50  |
| Total     | <        | $1.50  |
```

```html
<table>
  <thead><tr><th>Category</th><th>Item</th><th>Price</th></tr></thead>
  <tbody>
    <tr><td rowspan="2">Fruit</td><td>Apple</td><td>$1</td></tr>
    <tr><td>Banana</td><td>$0.50</td></tr>
    <tr><td>Total</td><td colspan="2">$1.50</td></tr>
  </tbody>
</table>
```

:::

## Fenced code

::: compare

````carve
```python
print("hi")
```
````

```html
<pre><code class="language-python">print("hi")
</code></pre>
```

:::

## Inline code

::: compare

```carve
Run `npm install` first.
```

```html
<p>Run <code>npm install</code> first.</p>
```

:::

## Admonitions

::: compare

```carve
::: note
Heads up — this is important.
:::
```

```html
<aside class="admonition note">
  <p>Heads up — this is important.</p>
</aside>
```

:::

## Abbreviations

::: compare

```carve
The HTML spec is essential reading.

*[HTML]: HyperText Markup Language
```

```html
<p>The <abbr title="HyperText Markup Language">HTML</abbr>
   spec is essential reading.</p>
```

:::

## Mentions and tags

::: compare

```carve
Hey @alice, see #release-1.0.
```

```html
<p>Hey <a class="mention" href="/users/alice">@alice</a>,
   see <a class="tag" href="/tags/release-1.0">#release-1.0</a>.</p>
```

:::

## Inline extensions

::: compare

```carve
Press :kbd[Ctrl+C] to copy.
```

```html
<p>Press <kbd>Ctrl+C</kbd> to copy.</p>
```

:::

## Attributes

::: compare

```carve
# Title {.large #intro}

A paragraph with [a styled link](url){.btn .primary}.
```

```html
<h1 class="large" id="intro">Title</h1>

<p>A paragraph with
   <a href="url" class="btn primary">a styled link</a>.</p>
```

:::

## Frontmatter

::: compare

```carve
---
title: My Document
author: Jane Doe
date: 2026-03-15
---

Content begins here.
```

```html
<!-- Metadata exposed to the host application,
     not part of the rendered output:
{
  "title": "My Document",
  "author": "Jane Doe",
  "date": "2026-03-15"
}
-->
<p>Content begins here.</p>
```

:::
