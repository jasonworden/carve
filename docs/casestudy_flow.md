# Flow: A Case Study in Post-Djot Markup Design

## Part 1: The Landscape of Lightweight Markup

Before designing something new, we must understand what exists and why.

### 1.1 The Major Players

| Format          | Year | Philosophy                                    |
|-----------------|------|-----------------------------------------------|
| Markdown        | 2004 | "Write like email, get HTML"                  |
| reStructuredText| 2002 | "Explicit is better than implicit"            |
| AsciiDoc        | 2002 | "DocBook power, plain-text simplicity"        |
| Org-mode        | 2003 | "Your life in plain text"                     |
| Textile         | 2002 | "Web writing made easy"                       |
| Creole          | 2007 | "Universal wiki markup"                       |
| Gemtext         | 2019 | "Radical simplicity"                          |
| Djot            | 2022 | "Markdown done right"                         |
| Typst           | 2023 | "LaTeX replacement for the modern era"        |

### 1.2 What Each Teaches Us

#### Markdown
**Strengths**: Ubiquitous, feels natural for basic text
**Weaknesses**: Ambiguous, fragmented (CommonMark, GFM, etc.)
**Lesson**: Simplicity wins adoption, but ambiguity creates chaos.

#### reStructuredText
```rst
This is *emphasis* and **strong emphasis**.

.. note::
   Directives are powerful but verbose.

`Link text <https://example.com>`_
```
**Strengths**: Explicit directives, extensible, great for documentation
**Weaknesses**: Verbose, underscore suffix for links is bizarre
**Lesson**: Explicitness is good, but syntax should feel natural.

#### AsciiDoc
```asciidoc
= Document Title
:author: John Doe
:toc:

== Section

This is *bold* and _italic_.

NOTE: Admonitions are built-in.

[source,python]
----
def hello():
    print("Hello")
----
```
**Strengths**: Document attributes, admonitions, includes, powerful tables
**Weaknesses**: Learning curve, multiple syntaxes for same thing
**Lesson**: Metadata and document structure matter. Built-in admonitions are valuable.

#### Org-mode
```org
* Heading 1
** Heading 2

Regular text with *bold*, /italic/, _underline_, +strikethrough+.

- List item
  - [ ] Checkbox unchecked
  - [X] Checkbox checked

| Name  | Age |
|-------+-----|
| Alice |  30 |

#+BEGIN_SRC python
def hello():
    print("hello")
#+END_SRC
```
**Strengths**: Incredibly powerful, outlining, TODO states, time tracking
**Weaknesses**: Emacs-centric, `#+` syntax is ugly, steep learning curve
**Lesson**: Plain text can be a complete productivity system. Checkboxes and TODO
states are genuinely useful. The `/italic/` convention works!

#### Textile
```textile
This is *strong* and _emphasis_ and -deleted- and +inserted+.

"Link text":http://example.com

!image.jpg!

|_. Header |_. Header |
| Cell     | Cell     |
```
**Strengths**: Intuitive emphasis, simple links, readable
**Weaknesses**: Largely abandoned, some ambiguous cases
**Lesson**: `"text":url` for links is genuinely more readable. The `|_.` for
headers is clever.

#### Creole
```
This is **bold** and //italic//.

[[http://example.com|Link text]]

{{image.jpg|Alt text}}

|= Header |= Header |
| Cell    | Cell    |
```
**Strengths**: Designed for wiki interoperability, clear delimiters
**Weaknesses**: Never achieved widespread adoption
**Lesson**: `//italic//` is visually perfect. `|=` for table headers is elegant.

#### Gemtext (Gemini Protocol)
```
# Heading
## Subheading

Regular text is just text.

=> https://example.com Link text
=> gemini://example.org Another link

* List item
* Another item

> Quote

```preformatted block
code here
```​
```
**Strengths**: Radically simple, one link per line, unambiguous
**Weaknesses**: No inline formatting whatsoever, too minimal for rich documents
**Lesson**: Forcing links onto their own lines eliminates ALL link syntax
ambiguity. Sometimes constraints are features.

#### Typst
```typst
= Heading

This is *strong* and _emphasis_.

#set text(size: 12pt)
#let name = "World"

Hello, #name!

#table(
  columns: 2,
  [Header 1], [Header 2],
  [Cell 1], [Cell 2],
)
```
**Strengths**: Programmable, clean syntax, fast, modern
**Weaknesses**: More like a programming language than markup
**Lesson**: Programmability is powerful. The `#` prefix for commands is clean.
Content in `[]` brackets is intuitive.

### 1.3 Other Notable Ideas

#### CriticMarkup (Editorial Annotations)
```
{++addition++}
{--deletion--}
{~~old~>new~~}
{==highlight==}{>>comment<<}
```
**Lesson**: Track changes in plain text is valuable for collaboration.

#### Fountain (Screenwriting)
```
INT. COFFEE SHOP - DAY

JOHN
(nervous)
I have something to tell you.
```
**Lesson**: Context can be inferred from position and conventions. Minimal markup
for domain-specific formats.

#### YAML Frontmatter (Metadata)
```yaml
---
title: My Document
author: Jane Doe
date: 2024-01-15
tags: [tutorial, beginner]
---
```
**Lesson**: Structured metadata at the start of documents is universally useful.

---

## Part 2: Human Factors Research

### 2.1 How Non-Technical Users Mark Up Text

Observing how people annotate paper documents reveals natural instincts:

| Intent          | Paper Action           | Keyboard Approximation |
|-----------------|------------------------|------------------------|
| Emphasis        | Underline              | `_text_`               |
| Strong emphasis | Circle / Box           | `[text]` or `*text*`   |
| Deletion        | Strikethrough          | `~text~` or `-text-`   |
| Insertion       | Caret + write above    | `^text^`               |
| Comment         | Margin note            | `%% comment`           |
| Reference       | Number in circle       | `[1]` or `(1)`         |
| Quote           | Quote marks            | `"text"` or `> text`   |

### 2.2 What People Get Wrong in Markdown

From teaching Markdown to non-programmers:

1. **Link syntax order** - "Is it `[]()` or `[]()`?" (yes, they ask this)
2. **Nested lists** - Not understanding the indent requirements
3. **Code blocks** - Backtick key location varies by keyboard
4. **Line breaks** - Two spaces at end of line is invisible
5. **Emphasis** - "Do I use one or two asterisks?"
6. **Escaping** - Not knowing why their `*` became italic

### 2.3 The "Five-Second Rule"

A good syntax should be:
- **Learnable in 5 seconds** for basic use
- **Memorable after 5 days** without use
- **Unambiguous within 5 characters** of context

---

## Part 3: Flow Design Principles

### 3.1 Core Principles

1. **One syntax, one meaning** - Never context-dependent
2. **Visual mnemonics** - Syntax resembles output
3. **Progressive disclosure** - Basic usage is trivial, power features exist
4. **Natural language order** - Read left-to-right logically
5. **Graceful degradation** - Plain text remains readable
6. **Keyboard-friendly** - Common operations use common keys
7. **No invisible syntax** - No trailing spaces, no significant whitespace tricks

### 3.2 Anti-Patterns to Avoid

- Double characters for "stronger" (`**bold**`) - not intuitive
- Asymmetric syntax (`[text](url)` vs `![alt](url)`)
- Significant trailing whitespace
- Context-dependent parsing
- Same character for different purposes (`*` for lists AND emphasis)

---

## Part 4: Flow Syntax Specification

### 4.1 Document Structure

#### Frontmatter (Optional)
```
---
title: My Document
author: Jane Doe
date: 2024-01-15
---
```

YAML frontmatter at document start. Well-established convention.

#### Headings
```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

Keep what works. The `#` convention is universal.

**Alternative (Setext-style for h1/h2 only):**
```
Heading 1
=========

Heading 2
---------
```

### 4.2 Inline Formatting

```
This is /italic/ text.
This is *bold* text.
This is /*bold italic*/ text.
This is _underline_ text.
This is ~strikethrough~ text.
This is `code` text.
This is ^superscript^ text.
This is ,,subscript,, text.
This is ==highlighted== text.
```

#### Rationale

| Syntax   | Visual Mnemonic                              |
|----------|----------------------------------------------|
| `/text/` | Slashes lean like italic letters             |
| `*text*` | Asterisks are heavy/bold looking             |
| `_text_` | Underscore is literally underneath           |
| `~text~` | Tilde looks like a strikethrough             |
| `^text^` | Caret points up                              |
| `,,t,,`  | Commas pull down                             |
| `==t==`  | Double equals like highlighter on both sides |

The `/italic/` syntax comes from Org-mode, where it has worked well for decades.

#### Rule: No Nesting of Same Type
```
/This /does not/ nest/    --> Invalid
/This *does* nest/        --> Valid: italic with bold inside
```

### 4.3 Links

**Standard form:**
```
See the [documentation](https://docs.example.com) for more.
```

**With title:**
```
Visit [Google](https://google.com "Search engine") today.
```

**Reference style:**
```
Read the [introduction][intro] first.

[intro]: https://example.com/intro "Introduction"
```

**Bare URLs (auto-linked):**
```
Check out https://example.com for details.
```

**Email:**
```
Contact [support](mailto:help@example.com) for help.
```

#### Why `[text](url)`?
- Universal convention from Markdown/Djot ecosystem
- Tooling support is ubiquitous
- Square brackets clearly delimit link text
- Parentheses naturally group the URL
- No learning curve for existing users

#### Cross-References (Auto-Text Links)

```
# Introduction {#intro}

...later in the document...

See </#intro> for background.
→ Renders as: See "Introduction" (linked to #intro)
```

The `</#id>` syntax auto-fills link text from the target heading.
No need to repeat yourself or keep text in sync.

#### Wiki-Style Links
For internal documents, use collapsed reference links:
```
See [Other Page][] for details.
```

The empty `[]` signals "use the link text as the target". A wiki processor
converts this to the appropriate URL (e.g., `other-page.html`).

For custom display text, use regular link syntax:
```
See [click here](Other Page) for details.
```

**Why not `[[...]]`?** It conflicts with valid nested spans:
`[[inner]{.attr} outer]{.attr}` is valid djot. The `[[` is ambiguous.

### 4.4 Images

Use djot's standard image syntax:
```
![Alt text](photo.jpg)
![A sunset over the ocean](photo.jpg)
```

**With caption:**
```
![A sunset over the ocean](photo.jpg)
^ Figure 1: Taken in Hawaii, 2024.
```

The `^` prefix on the following line creates a `<figure>` with `<figcaption>`.

**Linked images:**
```
[![Preview](thumb.jpg)](https://gallery.com)
```

**With attributes:**
```
![Photo](image.jpg){#fig-1 .hero width=800}
^ The main hero image for the article.
```

### 4.5 Lists

#### Unordered
```
- Item one
- Item two
  - Nested item
  - Another nested
    - Deep nesting
- Back to top
```

**Alternative bullets:**
```
* Also works
+ And this
```

All three (`-`, `*`, `+`) are equivalent. User preference.

#### Ordered
```
1. First item
2. Second item
   a. Sub-item
   b. Another
      i. Roman numeral sub-sub
3. Third item
```

**Auto-numbering:**
```
1. First
1. Second (auto-increments)
1. Third
```

#### Task Lists
```
- [ ] Unchecked task
- [x] Completed task
- [-] Cancelled task
- [>] Deferred task
- [?] Question/uncertain
```

Inspired by Org-mode TODO states but simplified.

#### Definition Lists

**Basic syntax:**
```
:: Term
:  Definition here.

:: Another term
:  Its definition.
```

- `::` (double colon) marks terms
- `:  ` (colon + 2 spaces) marks definitions

**Multiple terms sharing a definition:**
```
:: color
:: colour
:  The visual property of objects.
```

Output:
```html
<dl>
<dt>color</dt>
<dt>colour</dt>
<dd>The visual property of objects.</dd>
</dl>
```

**Multiple definitions for the same term(s):**
```
:: color
:: colour
:  The visual property of objects.
:  A pigment or paint.
```

Output:
```html
<dl>
<dt>color</dt>
<dt>colour</dt>
<dd>The visual property of objects.</dd>
<dd>A pigment or paint.</dd>
</dl>
```

**Multi-line terms:**
```
:: This is a long term \
   that spans two lines
:  Definition here.
```

**Multi-line definitions:**
```
:: Term
:  This definition continues \
   on the next line.
:  Second definition.
```

Or with indentation:
```
:: Term
:  This definition has
   multiple lines through
   indentation continuation.
```

**Rules:**
- `::` starts a term (`<dt>`)
- `:  ` starts a definition (`<dd>`)
- Consecutive `::` lines are grouped as multiple terms
- Consecutive `:  ` lines create multiple definitions
- `\` at line end continues the current term/definition
- Indented continuation lines also work for definitions
- Blank line ends the definition list entry

**Rationale:**
- Unambiguous: `::` vs `:  ` are visually and syntactically distinct
- Multi-line support via `\` continuation or indentation
- Matches dictionary structure (synonyms + multiple meanings)
- No confusion with other `:` uses (like blockquote attribution)

### 4.6 Code

#### Inline
```
Use the `print()` function.
```

With language hint:
```
The `SELECT * FROM users`{sql} query returns all users.
```

#### Blocks

**Fenced:**
~~~
```python
def hello():
    print("Hello, World!")
```
~~~

Keep triple backtick - it's universal and well-established:
- Works in Markdown, Djot, GitHub, everywhere
- Syntax highlighting support is ubiquitous
- No reason to change what works

**With attributes:**
~~~
```python {linenos=true highlight="3,5-7"}
def hello():
    print("Hello!")
```
~~~

### 4.7 Blockquotes

```
> Simple one-line quote.

> Multi-line quote continues
> as long as the prefix is present.

>> Nested quotes
>> for replies.
```

**With attribution (using caption syntax):**
```
> To be or not to be, that is the question.
^ William Shakespeare, Hamlet
```

The `^` prefix creates a `<figure>` wrapper with `<figcaption>` for attribution.

**Multi-paragraph quote with attribution:**
```
> The only thing we have to fear is fear itself.
>
> Nameless, unreasoning, unjustified terror.
^ Franklin D. Roosevelt, 1933
```

### 4.8 Tables

#### Simple Tables
```
|= Name     |= Age |= City     |
| Alice     | 28   | New York  |
| Bob       | 34   | London    |
```

`|=` marks header cells (from Creole). No separator row needed.

#### With Caption
```
|= Month    |= Sales  |
| January   | $10,000 |
| February  | $12,000 |
^ Table 1: Monthly sales figures for Q1 2024
```

The `^` prefix adds a `<caption>` element to the table.

#### Alignment
```
|= Name     |= Age |= City      |
| Alice     |   28 | New York   |
| Bob       |   34 | London     |
```

Alignment is inferred from whitespace:
- More space on left = right-aligned
- More space on right = left-aligned
- Equal space = centered

**Explicit alignment:**
```
|=< Name  |=> Age |=~ City   |
| Left    | Right | Center   |
```

#### Colspan (`<`)

The `<` marker means "this cell belongs to the cell on the left":
```
|= Name  |= Contact Info       |  <    |
|--------|---------------------|-------|
| Alice  | alice@example.com   | x5234 |
```

"Contact Info" header spans 2 columns.

#### Rowspan (`^`)

The `^` marker means "this cell belongs to the cell above":
```
|= Category |= Item   |= Price |
| Fruits    | Apple   | $1.00  |
| ^         | Banana  | $0.50  |
| ^         | Orange  | $0.75  |
| Veggies   | Carrot  | $0.30  |
```

"Fruits" spans 3 rows. Both markers point toward their source cell.

#### Multi-line Cells (`+`)

The `+` line prefix continues the previous row's cell content:
```
|= Feature |= Description               |
| Complex  | A long description         |
+          | that continues             |
+          | across multiple lines.     |
| Simple   | Single line description.   |
```

The `+` keeps pipes aligned while clearly marking continuation.

#### Combined: Rowspan + Multi-line
```
|= Category       |= Item   |
| Fresh Fruits    | Apple   |
+ from local      |         |
+ farms           |         |
| ^               | Banana  |
| ^               | Orange  |
```

"Fresh Fruits from local farms" spans 3 rows with multi-line content.

#### Headerless Tables
```
| Cell | Cell |
| Cell | Cell |
```

No special syntax needed - absence of `|=` means no headers.

### 4.9 Horizontal Rules

```
---
***
___
```

Any of these, at least 3 characters, alone on a line.

### 4.10 Attributes

Use Djot-style `{...}` syntax - it's proven and keeps `@` free for mentions:

```
# Heading {#intro .important}

This paragraph {lang=en} has inline attributes.

![](image.jpg){width=500 .float-right}
```

**Syntax:**
```
{#id}                   --> id attribute
{.class}                --> class attribute
{.one .two}             --> multiple classes
{key=value}             --> arbitrary attribute
{key="value with spaces"}  --> quoted values
{#id .class key=value}  --> combined
```

**Block-level attributes (before block):**
```
{#special .note}
This entire paragraph gets these attributes.
```

**Why keep Djot's syntax:**
- Already familiar to Djot users
- Attributes are a power feature anyway
- Frees `@` for mentions (universal expectation)
- No ambiguity with URLs or other syntax

### 4.11 Footnotes

**Inline definition:**
```
The theory[^Published in 1905 and changed physics forever.] was groundbreaking.
```

**Reference style:**
```
The theory[^einstein] revolutionized physics.

[^einstein]: Published in 1905 by Albert Einstein.
```

**Sidenotes (alternative display):**
```
The theory[>Published in 1905.] was groundbreaking.
```

`[>note]` suggests content pushed to the side/margin.

### 4.12 Special Blocks (Admonitions)

```
::: note
This is informational content.
:::

::: warning
Be careful with this operation!
:::

::: tip "Pro Tip"
Here's a helpful suggestion.
:::

::: danger
This action cannot be undone.
:::
```

**Built-in types:** note, tip, warning, danger, info, success, example, quote

**Custom types:**
```
::: custom-type
Content here.
:::
```

**Collapsible blocks:**
```
::: details "Click to expand"
Hidden content revealed on interaction.
:::
```

### 4.13 Comments

**Line comment:**
```
%% This is a line comment, not rendered.
%% Another line comment.
```

**Block comment:**
```
%%%
This is a block comment.

It can span multiple paragraphs.
Contains anything safely: // or /* or whatever.
%%%
```

**Nesting (use more `%` characters):**
```
%%%%
This block can contain %%% markers.
%%%%
```

**Rules:**
- `%%` at line start = line comment (rest of line ignored)
- `%%%` on its own line = block comment delimiter
- Use more `%` characters to nest (like code fences with more backticks)
- Comments are not rendered in output

### 4.14 Editorial Markup (CriticMarkup-inspired)

```
This is {+added+} text.
This is {-removed-} text.
This is {~old~>new~} replacement.
This is {=highlighted=} text.
This is text{# with a comment #}.
```

Useful for:
- Document review workflows
- Showing revisions
- Editorial collaboration

### 4.15 Raw/Passthrough Content

~~~
```raw html
<div class="custom">
  <p>Raw HTML here</p>
</div>
```

```raw latex
\begin{equation}
  E = mc^2
\end{equation}
```
~~~

### 4.16 Includes

```
{{ path/to/file.md }}
{{ path/to/file.md#section-id }}
{{ ./snippet.flow @indent:2 }}
```

### 4.17 Math

```
Inline math: $E = mc^2$ renders in-line.

Block math:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

**Alternative for dollar sign conflicts:**
```
Inline: \(E = mc^2\)

Block:
\[
\int_0^\infty e^{-x^2} dx
\]
```

### 4.18 Smart Typography

Auto-converted by default (can be disabled):

| Input       | Output | Description      |
|-------------|--------|------------------|
| `--`        | –      | En dash          |
| `---`       | —      | Em dash          |
| `...`       | …      | Ellipsis         |
| `"text"`    | "text" | Smart quotes     |
| `'text'`    | 'text' | Smart apostrophe |
| `(c)`       | ©      | Copyright        |
| `(r)`       | ®      | Registered       |
| `(tm)`      | ™      | Trademark        |
| `->`        | →      | Right arrow      |
| `<-`        | ←      | Left arrow       |
| `<->`       | ↔      | Bi-arrow         |
| `=>`        | ⇒      | Double arrow     |
| `!=`        | ≠      | Not equal        |
| `<=`        | ≤      | Less or equal    |
| `>=`        | ≥      | Greater or equal |
| `+-`        | ±      | Plus/minus       |
| `1/2`       | ½      | Fractions        |
| `1/4`       | ¼      | Fractions        |
| `3/4`       | ¾      | Fractions        |

Escape with backslash: `\->` = literal `->`

### 4.19 Abbreviations

Define abbreviations that are automatically expanded throughout the document:

```
The HTML specification defines how browsers render WWW content.

*[HTML]: HyperText Markup Language
*[WWW]: World Wide Web
```

**Output:**
```html
<p>The <abbr title="HyperText Markup Language">HTML</abbr> specification
defines how browsers render <abbr title="World Wide Web">WWW</abbr> content.</p>
```

**Rules:**
- Definitions can appear anywhere (typically at document end)
- Case-sensitive matching
- Word boundary matching only (`HTML` won't match inside `HTMLX`)
- Not applied inside code spans or code blocks
- `*[` is unambiguous (not valid in other contexts)

**Value:** Essential for technical documentation and accessibility.

### 4.20 Extensions (Custom Elements)

Flow needs a generic extension mechanism for domain-specific elements that
don't belong in core (embeds, mentions, custom widgets, etc.).

#### Inline Extensions: `:name[content]{attrs}`

```
Check out :youtube[dQw4w9WgXcQ] for the tutorial.


Hey :mention[john]{service=github} check this out!

This is :abbr[HTML]{title="HyperText Markup Language"}.

The color is :color[red]{hex=#ff0000}.
```

**Structure:** `:type[content]{attributes}`
- Colon prefix signals "extension"
- Type name identifies the handler
- Content in brackets
- Optional attributes in braces

#### Block Extensions: `::: name`

Already exists for admonitions, extends naturally:

```
::: youtube dQw4w9WgXcQ {width=560 height=315 autoplay=false}
:::

::: tweet
https://twitter.com/example/status/123456789
:::

::: codepen {user=johndoe slug=abcdef height=400}
:::
```

#### Common Shorthand Patterns

Some extensions are common enough to deserve shorthand:

```
@john                     --> :mention[john]
#project-x                --> :tag[project-x]
:emoji[rocket]  or  :rocket:  --> 🚀
```

**Parser behavior:**
- `@word` at word boundary → mention (configurable)
- `#word` at word boundary → tag (configurable)
- `:word:` → emoji shortcode (optional)

These are **opt-in** per document or processor config:
```
---
extensions:
  mentions: github    # @user links to GitHub
  tags: true          # #tag creates tag links
  emoji: true         # :smile: converts
---
```

#### Extension Registry (Recommendations)

Standard extensions that processors SHOULD support:

| Extension      | Inline                     | Block              | Purpose          |
|----------------|----------------------------|--------------------|------------------|
| `youtube`      | `:youtube[ID]`             | `::: youtube ID`   | YouTube embed    |
| `vimeo`        | `:vimeo[ID]`               | `::: vimeo ID`     | Vimeo embed      |
| `video`        | -                          | `::: video`        | Generic video    |
| `audio`        | -                          | `::: audio`        | Audio player     |
| `mention`      | `:mention[user]{service}`  | -                  | User mention     |
| `tag`          | `:tag[name]`               | -                  | Hashtag/label    |
| `abbr`         | `:abbr[ABBR]{title}`       | -                  | Abbreviation     |
| `kbd`          | `:kbd[Ctrl+C]`             | -                  | Keyboard key     |
| `mark`         | `:mark[text]`              | -                  | Highlight        |
| `spoiler`      | `:spoiler[text]`           | `::: spoiler`      | Hidden content   |
| `embed`        | -                          | `::: embed URL`    | Generic oEmbed   |
| `iframe`       | -                          | `::: iframe`       | Iframe embed     |
| `diagram`      | -                          | `::: mermaid`      | Mermaid diagrams |
| `math`         | `$...$`                    | `$$...$$`          | LaTeX math       |

#### Unknown Extensions

When a processor encounters an unknown extension:

1. **Inline**: Render content as plain text, ignore type
   - `:unknown[content]` → `content`

2. **Block**: Render as generic div with class
   - `::: unknown` → `<div class="unknown">...</div>`

3. **Emit warning** (optional): "Unknown extension: unknown"

This ensures documents remain readable even without all extensions.

#### Custom Extension Definition (Advanced)

Processors may allow defining extensions:

```yaml
# flow.config.yaml
extensions:
  mywidget:
    type: block
    render: |
      <div class="widget" data-id="{content}">{children}</div>
```

Or via code:
```javascript
flow.registerExtension('youtube', {
  inline: (id, attrs) => `<iframe src="https://youtube.com/embed/${id}"></iframe>`,
  block: (id, attrs, content) => { /* render block version */ }
});
```

### 4.21 Profiles (Feature Restriction)

Different contexts need different feature sets:

| Context | Needs | Should Block |
|---------|-------|--------------|
| Full document | Everything | Nothing |
| Blog post | Most features | Raw HTML |
| Comments | Basic formatting | Images, HTML, headings, code blocks |
| Chat/notes | Minimal | Almost everything |

#### Profile Configuration

```php
// Built-in profiles
$converter = new DjotConverter(profile: Profile::full());      // Everything
$converter = new DjotConverter(profile: Profile::article());   // No raw HTML
$converter = new DjotConverter(profile: Profile::comment());   // Basic only
$converter = new DjotConverter(profile: Profile::minimal());   // Text + emphasis

// Custom profile
$profile = new Profile()
    ->allowInline(['emphasis', 'strong', 'code', 'link'])
    ->allowBlock(['paragraph', 'list'])
    ->denyInline(['image', 'raw_html'])
    ->denyBlock(['heading', 'code_block', 'table', 'raw_block'])
    ->setLinkPolicy(LinkPolicy::internalOnly())  // or ::allowlist(['example.com'])
    ->setMaxNesting(3);  // prevent deeply nested structures
```

#### Profile: Comment Mode Example

```php
Profile::comment()
    // Allowed inline
    ->allowInline([
        'text',
        'emphasis',      // /italic/
        'strong',        // *bold*
        'code',          // `code`
        'link',          // [text](url) - validated
        'soft_break',
        'hard_break',
    ])
    // Allowed block
    ->allowBlock([
        'paragraph',
        'list',          // bullet lists only
        'blockquote',    // quotes
    ])
    // Security
    ->setLinkPolicy(
        LinkPolicy::create()
            ->allowSchemes(['https', 'http', 'mailto'])
            ->denySchemes(['javascript', 'data', 'file'])
            ->requireNofollow(true)  // add rel="nofollow"
            ->allowInternalLinks(true)
            ->denyExternalLinks(false)  // or set allowlist
    )
    // Limits
    ->setMaxLength(10000)      // character limit
    ->setMaxNesting(2)         // no deep nesting
    ->setMaxListItems(20)      // prevent abuse
    ->stripDisallowed(true);   // remove vs error
```

#### Link Policies

```php
// Internal links only (same domain)
LinkPolicy::internalOnly()

// Allowlist specific domains
LinkPolicy::allowlist(['github.com', 'example.com'])

// Block specific domains
LinkPolicy::denylist(['malware.com', 'spam.site'])

// Add nofollow/ugc to external links
LinkPolicy::create()
    ->addRelAttribute('nofollow')
    ->addRelAttribute('ugc');
```

#### Handling Disallowed Elements

**Option A: Strip silently**
```php
$profile->onDisallowed(Profile::STRIP);
// "# Heading\n\nText" → "Text" (heading removed)
```

**Option B: Convert to text**
```php
$profile->onDisallowed(Profile::TO_TEXT);
// "# Heading" → "# Heading" (literal, not rendered as h1)
```

**Option C: Error/warning**
```php
$profile->onDisallowed(Profile::ERROR);
// Throws exception or adds to warnings array
```

#### Implementation Approach

Two strategies:

**1. Parse-time filtering (efficient)**
- Parser skips disallowed constructs
- Never creates AST nodes for them
- More efficient, but less flexible

**2. Post-parse filtering (flexible)**
- Parse everything into AST
- Walk AST and remove/transform disallowed nodes
- Can provide detailed error messages
- Can show "preview" with violations highlighted

**Recommendation:** Post-parse filtering for flexibility:

```php
class ProfileFilter
{
    public function filter(Document $doc, Profile $profile): Document
    {
        $walker = new NodeWalker($doc);

        foreach ($walker as $node) {
            if (!$profile->isAllowed($node)) {
                match ($profile->getDisallowedAction()) {
                    Profile::STRIP => $node->remove(),
                    Profile::TO_TEXT => $this->convertToText($node),
                    Profile::ERROR => throw new DisallowedElementException($node),
                };
            }
        }

        return $doc;
    }
}
```

#### Usage Examples

```php
// Backend: full power
$html = DjotConverter::convert($userDoc);

// Frontend comments: restricted
$converter = new DjotConverter(profile: Profile::comment());
$html = $converter->convert($userComment);

// API with custom rules
$profile = Profile::create()
    ->allowInline(['emphasis', 'strong', 'link'])
    ->allowBlock(['paragraph'])
    ->setLinkPolicy(LinkPolicy::allowlist(['docs.example.com']));

$converter = new DjotConverter(profile: $profile);
```

#### Combining with SafeMode

`Profile` (feature restriction) and `SafeMode` (XSS prevention) are complementary:

```php
$converter = new DjotConverter(
    profile: Profile::comment(),    // Feature restriction
    safeMode: SafeMode::strict(),   // Security sanitization
);
```

- **Profile**: "What features are allowed?"
- **SafeMode**: "How do we prevent XSS in allowed features?"

### 4.22 File Extension

Flow documents use the `.flow` extension:

```
document.flow
README.flow
notes.flow
```

### 4.23 Frontmatter (Metadata Only)

```
---
title: My Document
author: Jane Doe
date: 2024-01-15
tags: [tutorial, beginner]
---
```

Frontmatter provides document metadata for processors. That's it.

**Explicitly NOT in scope:**
- Variable substitution (`{{name}}`)
- Conditionals (`{% if %}`)
- Loops (`{% for %}`)

These are **templating** concerns, not markup. Use a templating engine
(Liquid, Jinja, Mustache) as a separate processing step if needed.
Keeping them separate means:
- Simpler parser
- Cleaner specification
- Users choose their own templating tool
- No reinventing the wheel

---

## Part 5: Parsing Rules

### 5.1 Block Identification (First Pass)

1. Frontmatter (`---` delimited at document start)
2. Headings (`#` prefix)
3. Thematic breaks (`---`, `***`, `___`)
4. Code blocks (``` ` ``` ` ``` or `~~~` fenced)
5. Block quotes (`>` prefix)
6. Lists (`-`, `*`, `+`, or `1.` prefix)
7. Tables (`|` prefix)
8. Special blocks (`:::` delimited)
9. Paragraphs (everything else)

### 5.2 Inline Parsing (Second Pass)

Parse in this precedence order:
1. Escaped characters (`\*`)
2. Code spans (`` ` ``)
3. Autolinks (`<url>` and bare URLs)
4. Links and images (`[text](url)`, `![alt](src)`)
5. Math (`$...$`)
6. Emphasis markers (`/`, `*`, `_`, `~`, `^`, `==`)
7. Smart typography

### 5.3 The Disambiguation Rule

When ambiguous, prefer:
1. Literal text over markup
2. Shorter spans over longer
3. Earlier opening over later

Example: `*a *b* c*` parses as `*a ` + bold(b) + ` c*` (literal asterisks around)

### 5.4 Whitespace Rules

- Line ending = soft break (default, configurable)
- Blank line = paragraph break
- Two+ blank lines = paragraph break with extra space (optional)
- Indentation: 2+ spaces for list continuation
- Tabs: Normalized to spaces (default: 4)

---

## Part 6: AST Design

### 6.1 Node Types

```
Document
├── Frontmatter (optional)
├── Block+
    ├── Heading { level, content, id? }
    ├── Paragraph { content }
    ├── CodeBlock { language?, content, attributes }
    ├── BlockQuote { blocks, attribution? }
    ├── List { type, tight, items }
    │   └── ListItem { blocks, checked? }
    ├── Table { headers, rows, alignment[] }
    ├── ThematicBreak
    ├── Admonition { type, title?, blocks }
    └── RawBlock { format, content }

Inline
├── Text { content }
├── Emphasis { content }           // /text/
├── Strong { content }             // *text*
├── Underline { content }          // _text_
├── Strikethrough { content }      // ~text~
├── Superscript { content }        // ^text^
├── Subscript { content }          // ,,text,,
├── Highlight { content }          // ==text==
├── Code { content, language? }
├── Math { content, display }
├── Link { content, url, title? }
├── Image { src, alt, caption? }
├── Footnote { content }
├── SoftBreak
├── HardBreak
└── RawInline { format, content }
```

### 6.2 Source Mapping

Every node includes:
```
position: {
  start: { line, column, offset }
  end: { line, column, offset }
}
```

---

## Part 7: Compatibility and Migration

### 7.1 Compatibility Modes

```
---
flow-compat: markdown
---
```

Modes:
- `strict` - Only Flow syntax (default)
- `markdown` - Accept Markdown syntax with warnings
- `djot` - Accept Djot syntax with warnings

### 7.2 Migration Warnings

Parser can emit warnings for Markdown-specific syntax:
```
Line 15: Double-asterisk bold **text** detected
         Suggestion: *text*

Line 23: Single-asterisk emphasis *text* detected
         Suggestion: /text/
```

### 7.3 Auto-Migration Tool

```bash
flow migrate input.md --from markdown --to flow > output.flow
```

---

## Part 8: Comparison Matrix

### 8.1 Syntax Comparison

| Feature          | Markdown    | Djot        | rST           | AsciiDoc     | Org         | Flow         |
|------------------|-------------|-------------|---------------|--------------|-------------|--------------|
| Italic           | `*t*`/`_t_` | `_t_`       | `*t*`         | `_t_`        | `/t/`       | `/t/`        |
| Bold             | `**t**`     | `*t*`       | `**t**`       | `*t*`        | `*t*`       | `*t*`        |
| Underline        | N/A         | N/A         | N/A           | `[.underline]#t#` | `_t_` | `_t_`        |
| Strikethrough    | `~~t~~`     | `~t~`       | N/A           | `[.line-through]#t#` | `+t+` | `~t~`   |
| Links            | `[t](u)`    | `[t](u)`    | `` `t <u>`_ ``| `u[t]`       | `[[u][t]]`  | `[t](u)`     |
| Images           | `![a](u)`   | `![a](u)`   | directive     | `image::u[]` | `[[u]]`     | `![a](u)`    |
| Attributes       | N/A         | `{.c #i}`   | roles         | `[attrs]`    | `#+ATTR`    | `{.c #i}`    |
| Table headers    | `---`       | `---`       | underline     | `|===`       | `\|---+`    | `\|=`        |
| Admonitions      | N/A         | `:::type`   | `.. type::`   | `TYPE:`      | N/A         | `:::type`    |
| Code fence       | ``` ` ```   | ``` ` ```   | `::`          | `----`       | `#+BEGIN`   | ``` ` ```    |

### 8.2 Learning Curve

| Format    | 5 min | 1 hour | 1 day | Mastery |
|-----------|-------|--------|-------|---------|
| Gemtext   | 100%  | 100%   | 100%  | 100%    |
| Markdown  | 60%   | 80%    | 90%   | Never*  |
| Flow      | 70%   | 90%    | 95%   | 98%     |
| Djot      | 50%   | 85%    | 95%   | 98%     |
| AsciiDoc  | 40%   | 70%    | 85%   | 95%     |
| rST       | 30%   | 60%    | 80%   | 95%     |
| Org-mode  | 20%   | 50%    | 70%   | 90%     |

*Markdown: Never 100% due to ambiguities and variants

---

## Part 9: Implementation Considerations

### 9.1 Parser Architecture

1. **Lexer**: Stream of tokens (block markers, inline markers, text)
2. **Block Parser**: Builds block structure (two-pass like Djot)
3. **Inline Parser**: Parses inline content within blocks
4. **AST Builder**: Constructs typed AST nodes
5. **Renderer**: Transforms AST to output format

### 9.2 Reference Implementation Priorities

1. JavaScript/TypeScript (web, Node.js ubiquity)
2. Rust (performance, WASM compilation)
3. Python (data science, docs communities)
4. Go (modern backend systems)
5. PHP (existing Djot-PHP could be adapted)

### 9.3 Editor Support Essentials

- Syntax highlighting rules (TextMate grammars)
- LSP server for validation and completion
- Tree-sitter grammar for structural editing
- Preview rendering (HTML output)

---

## Part 10: Open Questions and Trade-offs

### 10.1 Emphasis Character Choice

**Option A (Current):** `/italic/`, `*bold*`
- Pro: Visual mnemonics
- Con: `/` is common in URLs, paths

**Option B:** `_italic_`, `*bold*` (like Djot)
- Pro: Familiar to Djot/AsciiDoc users
- Con: `_` underscore used for underline in Flow

**Option C:** `~italic~`, `*bold*`, `-underline-`
- Pro: Different associations
- Con: `~` is strikethrough in many systems

**Current Decision:** Option A, with smart parsing to avoid path conflicts.

### 10.2 Link Syntax

**Decision:** Standard `[text](url)` for all links.

Considered alternatives:
- `"text"(url)` - Natural reading order, but quotes conflict with code strings
- `[text -> url]` - Arrow suggests direction, but different from all formats
- `[[url | text]]` - Wiki-style, but ambiguous with nested spans

For wiki-style internal links, use collapsed reference `[Page Name][]` which
processors resolve to appropriate URLs.

### 10.3 Code Block Delimiters

**Decision:** Keep triple backtick (` ``` `)
- Universal across Markdown, Djot, GitHub, etc.
- Syntax highlighting support everywhere
- No learning curve - users already know it
- Alternative `~~~` also accepted for edge cases

Don't fix what isn't broken.

### 10.4 Attribute Syntax

**Decision:** Keep Djot's `{.class #id key=value}`

- Already proven and familiar to Djot users
- Frees `@` for mentions (social media expectation)
- Attributes are a power feature - slight verbosity is acceptable
- No ambiguity with other syntax

The temptation to use `@` for attributes was wrong - `@user` for mentions
is too deeply ingrained from Twitter/Instagram/GitHub.

### 10.5 Table Complexity

How complex should tables get?
- Cell merging (rowspan, colspan)
- Nested tables
- Multi-line cells

**Decision:** Support colspan (`||`), multi-line via `\`, recommend separate list for complex data.

### 10.6 Versioning Strategy

```
---
flow-version: 1.0
---
```

Parsers should:
1. Parse any version they understand
2. Warn on unknown versions
3. Fail gracefully on incompatible versions

---

## Part 11: Why Not Just Fix Markdown?

### 11.1 The Backward Compatibility Trap

Markdown has trillions of documents. Any "fix" must:
- Not break existing documents (impossible for real fixes)
- Be adopted by all implementations (fragmented ecosystem)
- Wait for CommonMark updates (slow process)

### 11.2 Why Djot Isn't Enough

Djot is technically excellent but:
- Designed by a programmer for programmers
- `{.class}` syntax feels like code
- Link syntax unchanged from Markdown
- No visual mnemonics for emphasis

### 11.3 Why Flow Is Needed

Flow takes Djot's technical rigor and adds:
- User research-driven syntax choices
- Visual mnemonics throughout
- Natural language-aligned patterns
- Progressive complexity disclosure

---

## Part 12: Conclusion

### 12.1 Flow's Key Innovations

1. **Visual Mnemonics**: `/slant/` for italic, `*heavy*` for bold
2. **Simpler Tables**: `|=` headers, no separator rows needed
3. **Social Mentions**: `@user` and `#tag` work as expected
4. **Extension System**: `:type[content]{attrs}` for custom elements
5. **Unambiguous Rules**: One syntax, one meaning, always
6. **Djot Foundation**: Inherits rigorous parsing and attributes

### 12.2 Success Metrics

Flow succeeds if:
- Non-technical users can write without consulting docs
- Technical users can access full power when needed
- Documents remain readable as plain text
- Parsing is deterministic and fast
- Migration from Markdown is trivial

### 12.3 Next Steps

1. Formalize EBNF grammar
2. Build reference parser in TypeScript
3. User testing with non-technical writers
4. Iterate on problem areas
5. Editor integration (VS Code, Obsidian, etc.)
6. Documentation and tutorials

---

*This is a design exploration, not a finished specification. Real-world testing
with diverse users would be essential before finalizing syntax decisions.*

*Feedback welcome at [hypothetical GitHub repo].*

---

## Appendix A: Quick Reference Card

```
FLOW QUICK REFERENCE

EMPHASIS
  /italic/  *bold*  /*bold italic*/
  _underline_  ~strikethrough~
  ^super^  ,,sub,,  ==highlight==

HEADINGS
  # H1  ## H2  ### H3  #### H4

LINKS & IMAGES
  [link text](https://url.com)
  [Page Name][]              (wiki-style)
  ![alt text](image.jpg)

CAPTIONS (for images, quotes, tables)
  ![Photo](img.jpg)
  ^ Figure 1: Caption text

  > Quote text
  ^ Attribution

LISTS
  - unordered item
  1. ordered item
  - [ ] task  - [x] done

CODE
  `inline code`
  ```language
  code block
  ```

QUOTES & ADMONITIONS
  > quoted text
  ::: note
  admonition content
  :::

TABLES
  |= Header |= Header |      (|= for headers)
  | Cell    | Cell    |
  ^ Table caption

  | ^       | Cell    |      (^ rowspan)
  | Cell    | <       |      (< colspan)
  + continuation row  |      (+ multiline)

ABBREVIATIONS
  *[HTML]: HyperText Markup Language

ATTRIBUTES
  {#id}  {.class}  {key=value}

EXTENSIONS
  :youtube[VIDEO_ID]         (inline)
  ::: youtube ID             (block)
  @username  #tagname        (mentions/tags)

FOOTNOTES
  text[^footnote content]

COMMENTS
  %% line comment
  %%%
  block comment
  %%%

EDITORIAL (CriticMarkup)
  {+added+}  {-removed-}
  {~old~>new~}  {=highlight=}
  {# comment #}

---   (horizontal rule)
```

## Appendix B: Example Document

```flow
---
title: Flow Example Document
author: Jane Writer
date: 2024-03-15
---

# Welcome to Flow

This is a /simple/ demonstration of *Flow* markup.

## Features

Flow includes:

1. Visual emphasis with /italics/ and *bold*
2. Easy tables without separator rows
3. Standard [link syntax](https://example.com) with full tooling support

::: tip "Getting Started"
Just write naturally and let Flow handle the rest.
:::

### Sample Table

|= Feature        |= Status    |= Notes              |
| Visual syntax   | Done       | `/italic/` works    |
| Link syntax     | Done       | Natural order       |
| Tables          | Done       | Simpler than MD     |

### Sample Code

```python
def greet(name: str) -> str:
    """Greet someone with Flow."""
    return f"Hello, {name}!"
```

## Conclusion

> The best markup is the one you don't have to think about.
> -- Anonymous

For more info, see the [documentation](https://flow-markup.example.org).

[^This is a footnote with inline definition.]
```

## Appendix C: Influences and Acknowledgments

Flow draws inspiration from:

- **Djot** (John MacFarlane) - Rigorous parsing, attributes
- **Org-mode** (Carsten Dominik) - `/italic/` syntax, TODO states
- **Creole** - `|=` table headers, `//italic//`
- **Textile** - `"text":url` link syntax
- **AsciiDoc** (Stuart Rackham) - Admonitions, includes
- **CriticMarkup** - Editorial annotations
- **Gemtext** - Radical simplicity principles
- **Typst** - Modern syntax thinking
- **CommonMark** - Specification rigor

And countless Markdown users whose struggles informed our design.
