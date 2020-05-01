# spin-box-progression

This repo walks through the conversion of a plain JavaScript spin box component into an extensible spin box base class and some customized variations.

## Progression

1. Initial plain JavaScript spin box in a single HTML file. [View](https://janmiksovsky.github.io/spin-box-progression/01)
2. Apply `ShadowTemplateMixin` to handle population of shadow root from a template property. [View](https://janmiksovsky.github.io/spin-box-progression/02)
3. Minor tweak to above to take advantage of `this[ids]` helper to reference shadow elements. [View](https://janmiksovsky.github.io/spin-box-progression/03)
4. Apply `ReactiveMixin` to handle representation of state and invoke a render function. [View](https://janmiksovsky.github.io/spin-box-progression/04)
5. Apply `AttributeMarshallingMixin` to handle conversion of attributes to properties. [View](https://janmiksovsky.github.io/spin-box-progression/05)
6. Consolidate use of those three mixins into use of a single `ReactiveElement` base class. [View](https://janmiksovsky.github.io/spin-box-progression/06)
7. Factor the JavaScript `SpinBox` component into its own file. [View](https://janmiksovsky.github.io/spin-box-progression/07)
8. Show the use of CSS `::part()` syntax to style a spin box from the outside. [View](https://janmiksovsky.github.io/spin-box-progression/08)
9. Introduce a `CustomSpinBox` subclass that applies that same styling via a template graft. [View](https://janmiksovsky.github.io/spin-box-progression/09)
10. The custom spin box overrides the `render` function to perform custom rendering when state changes. [View](https://janmiksovsky.github.io/spin-box-progression/10)
11. The base `SpinBox` turns the input and buttons into parts that can be replaced with custom parts. [View](https://janmiksovsky.github.io/spin-box-progression/11)
12. The up and down arrow glyphs are factored out of the base `SpinBox` and applied instead by the subclass. [View](https://janmiksovsky.github.io/spin-box-progression/12)
13. Show the complete set of pieces used to construct a custom spin box as part of a larger design system. [View](https://janmiksovsky.github.io/spin-box-progression/13)

The final `SpinBox` class handles basics like the buttons, keyboard support, and tracking the `value`. The final `CustomSpinBox` applies custom parts and rendering to support custom input and button parts, conditional styling for negative numbers, repeat-on-mousedown behavior for the buttons, and units like "px".

## Running locally

All of this is plain JavaScript, so you can just clone the repo and open the root folder with any web server, e.g., `npx http-server`.
