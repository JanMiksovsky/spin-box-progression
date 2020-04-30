import html from "../lib/core/html.js";
import { ids, render, state, template } from "../lib/core/internal.js";
import SpinBox from "./SpinBox.js";

export default class CustomSpinBox extends SpinBox {
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
          background: linear-gradient(50deg, #6e00ff 0, #bb00ff 100%);
          border: none;
          color: #ddd;
          font-size: 0.6em;
          padding: 2px;
        }

        [part~="spin-button"]:hover {
          background: #bb00ff;
          color: white;
        }
      </style>
    `);
    return result;
  }
}

customElements.define("custom-spin-box", CustomSpinBox);
