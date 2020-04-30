import {
  defaultState,
  ids,
  render,
  setState,
  state,
  template,
} from "../lib/core/internal.js";
import ReactiveElement from "../lib/core/ReactiveElement.js";
import { html, transmute } from "../lib/core/template.js";

export default class SpinBox extends ReactiveElement {
  get [defaultState]() {
    return {
      ...super[defaultState],
      buttonPartType: "button",
      inputPartType: "input",
      value: 0,
    };
  }

  [render](changed) {
    super[render](changed);

    if (changed.buttonPartType) {
      // Transmute buttons to new button part type.
      const { buttonPartType } = this[state];
      transmute(this[ids].downButton, buttonPartType);
      transmute(this[ids].upButton, buttonPartType);

      // Wire up handlers on new buttons.
      this[ids].downButton.addEventListener("mousedown", () => {
        this.value--;
      });
      this[ids].upButton.addEventListener("mousedown", () => {
        this.value++;
      });
    }

    if (changed.inputPartType) {
      // Transmute input to new input part type.
      const { inputPartType } = this[state];
      transmute(this[ids].input, inputPartType);

      // Wire up handler on new input.
      this[ids].input.addEventListener("input", () => {
        this.value = this[ids].input.value;
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
      <div id="input" part="input"></div>
      <div id="upButton" part="spin-button up-button">▲</div>
      <div id="downButton" part="spin-button down-button">▼</div>
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
