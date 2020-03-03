import * as internal from "../lib/core/internal.js";
import html from "../lib/core/html.js";
import CustomButton from "./CustomButton.js";
import SpinBox from "./SpinBox.js";

export default class CustomSpinBox extends SpinBox {
  get [internal.defaultState]() {
    return {
      ...super[internal.defaultState],
      buttonPartType: CustomButton
    };
  }

  get [internal.template]() {
    const result = super[internal.template];
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
