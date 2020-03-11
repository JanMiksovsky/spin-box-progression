import * as internal from "../lib/core/internal.js";
import SpinBox from "./SpinBox.js";

export default class CustomSpinBox extends SpinBox {
  get [internal.template]() {
    const result = super[internal.template];
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    result.content.append(style);
    return result;
  }
}

customElements.define("custom-spin-box", CustomSpinBox);
