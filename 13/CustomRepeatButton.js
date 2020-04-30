/*
 * A more advanced custom button that generates repeated 'mousedown' events
 * for as long as it's held down. This approaches real spin box button
 * behavior.
 */

import {
  defaultState,
  firstRender,
  ids,
  render,
  setState,
  state,
} from "../lib/core/internal.js";
import CustomButton from "./CustomButton.js";

const initialTimeoutDuration = 500; // Wait a bit before starting repeats.
const repeatIntervalDuration = 50; // Once repeats start, they go fast.

export default class CustomRepeatButton extends CustomButton {
  get [defaultState]() {
    return {
      ...super[defaultState],
      interval: null,
      timeout: null,
    };
  }

  [render](changed) {
    super[render](changed);
    if (this[firstRender]) {
      // Wire up event handlers.
      // Only listen to mouse events with the primary (usually left) button.
      const inner = this[ids].inner;
      inner.addEventListener("mousedown", (event) => {
        if (event.button === 0) {
          repeatStart(this);
        }
      });
      inner.addEventListener("mouseup", (event) => {
        if (event.button === 0) {
          repeatStop(this);
        }
      });
      inner.addEventListener("mouseleave", (event) => {
        if (event.button === 0) {
          repeatStop(this);
        }
      });

      // Treat touch events like mouse events.
      inner.addEventListener("touchstart", () => {
        repeatStart(this);
      });
      inner.addEventListener("touchend", () => {
        repeatStop(this);
      });
    }
  }
}

function repeatStart(element) {
  // Start initial wait.
  const timeout = setTimeout(() => {
    // Initial wait complete; start repeat interval.
    const interval = setInterval(() => {
      // Repeat interval passed; raise a mousedown event.
      raiseMousedown(element);
    }, repeatIntervalDuration);
    element[setState]({ interval });
  }, initialTimeoutDuration - repeatIntervalDuration);
  element[setState]({ timeout });
}

function repeatStop(element) {
  // Stop timeout and/or interval in progress.
  if (element[state].timeout) {
    clearTimeout(element[state].timeout);
    element[setState]({ timeout: null });
  }
  if (element[state].interval) {
    clearInterval(element[state].interval);
    element[setState]({ interval: null });
  }
}

// Raise a synthetic mousedown event.
function raiseMousedown(element) {
  const event = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    clientX: 0,
    clientY: 0,
    button: 0,
  });
  element.dispatchEvent(event);
}

customElements.define("custom-repeat-button", CustomRepeatButton);
