import html from "../lib/core/html.js";
import {
  defaultState,
  ids,
  render,
  state,
  template,
} from "../lib/core/internal.js";
import CustomButton from "./CustomButton.js";
import SpinBox from "./SpinBox.js";

export default class CustomSpinBox extends SpinBox {
  get [defaultState]() {
    return {
      ...super[defaultState],
      buttonPartType: CustomButton,
    };
  }

  [render](changed) {
    super[render](changed);
    if (changed.value) {
      const { value } = this[state];
      const negative = parseInt(value) < 0;
      this.style.borderColor = negative ? "rgb(255, 0, 255)" : "";
      this[ids].input.style.backgroundColor = negative
        ? "rgba(255, 0, 255, 0.1)"
        : "";
    }
  }

  get [template]() {
    const result = super[template];
    const upButton = result.content.getElementById("upButton");
    upButton.textContent = "▲";
    const downButton = result.content.getElementById("downButton");
    downButton.textContent = "▼";
    result.content.append(html`
      <style>
        :host {
          border: 2px solid #6e00ff;
          border-radius: 5px;
          color: #444;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 16px;
          overflow: hidden;
        }

        [part~="input"] {
          border: none;
          box-sizing: border-box;
          color: inherit;
          font: inherit;
          padding: 0.3em 0.6em;
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

customElements.define("custom-spin-box", CustomSpinBox);
