import Button from "../lib/base/Button.js";
import html from "../lib/core/html.js";
import { template } from "../lib/core/internal.js";

export default class CustomButton extends Button {
  get [template]() {
    const result = super[template];
    result.content.append(html`
      <style>
        :host {
          background: linear-gradient(50deg, #6e00ff 0, #bb00ff 100%);
          border-radius: 5px;
          border: 2px solid #6e00ff;
          color: #ddd;
          overflow: hidden;
          padding: 0.3em 0.6em;
        }

        :host(:hover) {
          background: #bb00ff;
          color: white;
        }
      </style>
    `);
    return result;
  }
}

customElements.define("custom-button", CustomButton);
