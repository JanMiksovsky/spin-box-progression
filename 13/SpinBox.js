import {
  defaultState,
  firstRender,
  ids,
  raiseChangeEvents,
  render,
  setState,
  state,
  template,
} from "../lib/core/internal.js";
import ReactiveElement from "../lib/core/ReactiveElement.js";
import { html, transmute } from "../lib/core/template.js";

export default class SpinBox extends ReactiveElement {
  decrement() {
    this.value--;
  }

  get [defaultState]() {
    return {
      ...super[defaultState],
      buttonPartType: "button",
      inputPartType: "input",
      value: 0,
    };
  }

  increment() {
    this.value++;
  }

  [render](changed) {
    super[render](changed);

    if (this[firstRender]) {
      // Add Up key and Down key handlers.
      this.addEventListener("keydown", (event) => {
        this[raiseChangeEvents] = true;
        let handled = false;
        switch (event.key) {
          case "ArrowDown":
            this.decrement();
            handled = true;
            break;

          case "ArrowUp":
            this.increment();
            handled = true;
            break;
        }
        if (handled) {
          event.preventDefault();
        }
        this[raiseChangeEvents] = false;
      });
    }

    // Transmute buttons to new button part type.
    if (changed.buttonPartType) {
      const { buttonPartType } = this[state];
      transmute(this[ids].downButton, buttonPartType);
      transmute(this[ids].upButton, buttonPartType);

      // Wire up handlers on new buttons.
      this[ids].downButton.addEventListener("mousedown", () => {
        this.decrement();
      });
      this[ids].upButton.addEventListener("mousedown", () => {
        this.increment();
      });
    }

    // Transmute input to new input part type.
    if (changed.inputPartType) {
      const { inputPartType } = this[state];
      transmute(this[ids].input, inputPartType);

      // Wire up handler on new input.
      this[ids].input.addEventListener("input", () => {
        this.value = this[ids].input.value;
      });
    }

    // Render value state to input.
    if (changed.value) {
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
      <div id="upButton" part="spin-button up-button"></div>
      <div id="downButton" part="spin-button down-button"></div>
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
