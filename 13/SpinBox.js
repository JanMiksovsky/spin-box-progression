import * as internal from "../lib/core/internal.js";
import * as template from "../lib/core/template.js";
import ReactiveElement from "../lib/core/ReactiveElement.js";

export default class SpinBox extends ReactiveElement {
  [internal.componentDidMount]() {
    this.addEventListener("keydown", event => {
      this[internal.raiseChangeEvents] = true;
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
      this[internal.raiseChangeEvents] = false;
    });
  }

  decrement() {
    this.value--;
  }

  get [internal.defaultState]() {
    return {
      ...super[internal.defaultState],
      buttonPartType: "button",
      inputPartType: "input",
      value: 0
    };
  }

  increment() {
    this.value++;
  }

  [internal.render](changed) {
    super[internal.render](changed);
    if (changed.buttonPartType) {
      const { buttonPartType } = this[internal.state];
      template.transmute(this[internal.ids].downButton, buttonPartType);
      template.transmute(this[internal.ids].upButton, buttonPartType);
      this[internal.ids].downButton.addEventListener("mousedown", () => {
        this.decrement();
      });
      this[internal.ids].upButton.addEventListener("mousedown", () => {
        this.increment();
      });
    }
    if (changed.inputPartType) {
      const { inputPartType } = this[internal.state];
      template.transmute(this[internal.ids].input, inputPartType);
      this[internal.ids].input.addEventListener("input", () => {
        this.value = this[internal.ids].input.value;
      });
    }
    if (changed.value) {
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
