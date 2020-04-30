import {
  defaultState,
  firstRender,
  ids,
  render,
  setState,
  state,
  template,
} from "../lib/core/internal.js";
import ReactiveElement from "../lib/core/ReactiveElement.js";
import { html } from "../lib/core/template.js";

export default class SpinBox extends ReactiveElement {
  get [defaultState]() {
    return {
      ...super[defaultState],
      value: 0,
    };
  }

  [render](changed) {
    super[render](changed);

    if (this[firstRender]) {
      // Wire up event handlers.
      this[ids].input.addEventListener("input", () => {
        this.value = this[ids].input.value;
      });
      this[ids].downButton.addEventListener("mousedown", () => {
        this.value--;
      });
      this[ids].upButton.addEventListener("mousedown", () => {
        this.value++;
      });
    }

    if (changed.value) {
      // Render value state to input.
      this[ids].input.value = this[state].value;
    }
  }

  get [template]() {
    return html`
      <style>
        :host {
          display: inline-grid;
        }

        [part~="input"] {
          grid-row-end: 3;
          grid-row-start: 1;
          text-align: right;
        }

        [part~="spin-button"] {
          grid-column: 2;
          user-select: none;
        }
      </style>
      <input id="input" part="input"></input>
      <button id="upButton" part="spin-button up-button">▲</button>
      <button id="downButton" part="spin-button down-button">▼</button>
    `;
  }

  get value() {
    return this[state].value;
  }
  set value(value) {
    this[setState]({ value });
  }
}

customElements.define("spin-box", SpinBox);
