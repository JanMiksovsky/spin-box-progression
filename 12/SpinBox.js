import * as internal from "../lib/core/internal.js";
import * as template from "../lib/core/template.js";
import ReactiveElement from "../lib/core/ReactiveElement.js";

export default class SpinBox extends ReactiveElement {
  get [internal.defaultState]() {
    return {
      ...super[internal.defaultState],
      buttonPartType: "button",
      inputPartType: "input",
      value: 0
    };
  }

  [internal.render](changed) {
    super[internal.render](changed);
    if (changed.buttonPartType) {
      // Transmute buttons to new button part type.
      const { buttonPartType } = this[internal.state];
      template.transmute(this[internal.ids].downButton, buttonPartType);
      template.transmute(this[internal.ids].upButton, buttonPartType);

      // Wire up handlers on new buttons.
      this[internal.ids].downButton.addEventListener("mousedown", () => {
        this.value--;
      });
      this[internal.ids].upButton.addEventListener("mousedown", () => {
        this.value++;
      });
    }
    if (changed.inputPartType) {
      // Transmute input to new input part type.
      const { inputPartType } = this[internal.state];
      template.transmute(this[internal.ids].input, inputPartType);

      // Wire up handler on new input.
      this[internal.ids].input.addEventListener("input", () => {
        this.value = this[internal.ids].input.value;
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
    return this[internal.state].value;
  }
  set value(value) {
    this[internal.setState]({ value });
  }
}

customElements.define("spin-box", SpinBox);
