import Input from "../lib/base/Input.js";
import html from "../lib/core/html.js";
import { template } from "../lib/core/internal.js";

export default class CustomInput extends Input {
  get [template]() {
    const result = super[template];
    result.content.append(html`
      <style>
        :host {
          border-radius: 5px;
          border: 2px solid #6e00ff;
          box-sizing: border-box;
        }

        [part~="inner"] {
          background: none;
          border: none;
          color: inherit;
          padding: 0.3em 0.6em;
        }
      </style>
    `);
    return result;
  }
}

customElements.define("custom-input", CustomInput);
