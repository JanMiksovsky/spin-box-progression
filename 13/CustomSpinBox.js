import * as internal from "../lib/core/internal.js";
import html from "../lib/core/html.js";
import CustomInput from "./CustomInput.js";
import CustomRepeatButton from "./CustomRepeatButton.js";
import SpinBox from "./SpinBox.js";

export default class CustomSpinBox extends SpinBox {
  decrement() {
    const { number, unit } = parse(this.value);
    this.value = format(number - 1, unit);
  }

  get [internal.defaultState]() {
    return {
      ...super[internal.defaultState],
      buttonPartType: CustomRepeatButton,
      inputPartType: CustomInput
    };
  }

  increment() {
    const { number, unit } = parse(this.value);
    this.value = format(number + 1, unit);
  }

  [internal.render](changed) {
    super[internal.render](changed);
    if (changed.value) {
      const { value } = this[internal.state];
      const negative = parseInt(value) < 0;
      this.style.borderColor = negative ? "rgb(255, 0, 255)" : "";
      this.style.backgroundColor = negative ? "rgba(255, 0, 255, 0.1)" : "";
    }
  }

  get [internal.template]() {
    const result = super[internal.template];
    const upButton = result.content.getElementById("upButton");
    upButton.textContent = "▲";
    const downButton = result.content.getElementById("downButton");
    downButton.textContent = "▼";
    result.content.append(html`
      <style>
        :host {
          border: 2px solid #6e00ff;
          border-radius: 5px;
          overflow: hidden;
        }

        [part~="input"] {
          border: none;
          width: 4em;
        }

        [part~="spin-button"] {
          border-radius: 0;
          border-width: 0;
          font-size: 0.6em;
          padding: 2px;
        }
      </style>
    `);
    return result;
  }
}

function format(number, unit) {
  return unit ? `${number}${unit}` : number;
}

function parse(s) {
  const numberWithUnitRegex = /(?<number>-?\d+)(\s*(?<unit>.+))?/;
  const match = numberWithUnitRegex.exec(s);
  const parsed = parseInt(s);
  const number = match
    ? parseInt(match.groups.number)
    : isNaN(parsed)
    ? 0
    : parsed;
  const unit = match ? match.groups.unit : "";
  return { number, unit };
}

customElements.define("custom-spin-box", CustomSpinBox);
