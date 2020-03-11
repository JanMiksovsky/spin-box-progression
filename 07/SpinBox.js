import * as internal from "../lib/core/internal.js";
import * as template from "../lib/core/template.js";
import ReactiveElement from "../lib/core/ReactiveElement.js";

export default class SpinBox extends ReactiveElement {
  get [internal.defaultState]() {
    return {
      ...super[internal.defaultState],
      value: 0
    };
  }

  [internal.render](changed) {
    super[internal.render](changed);
    if (this[internal.firstRender]) {
      // Wire up event handlers.
      this[internal.ids].input.addEventListener("input", () => {
        this.value = this[internal.ids].input.value;
      });
      this[internal.ids].downButton.addEventListener("mousedown", () => {
        this.value--;
      });
      this[internal.ids].upButton.addEventListener("mousedown", () => {
        this.value++;
      });
    }
    if (changed.value) {
      // Render value state to input.
      this[internal.ids].input.value = this[internal.state].value;
    }
  }

  get [internal.template]() {
    return template.html`
      <style>
        :host {
          display: inline-grid;
        }

        #input {
          grid-row-end: 3;
          grid-row-start: 1;
          text-align: right;
        }

        #upButton,
        #downButton {
          grid-column: 2;
          user-select: none;
        }
      </style>
      <input id="input"></input>
      <button id="upButton">▲</button>
      <button id="downButton">▼</button>
    `;
  }

  get value() {
    return this[internal.state].value;
  }
  set value(value) {
    this[internal.setState]({ value });
  }
}

customElements.define("spin-box", SpinBox);
