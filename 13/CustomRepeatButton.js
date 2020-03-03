/*
 * A more advanced custom button that generates repeated 'mousedown' events
 * for as long as it's held down. This approaches real spin box button
 * behavior.
 */

import * as internal from "../lib/core/internal.js";
import CustomButton from "./CustomButton.js";

const initialTimeoutDuration = 500; // Wait a bit before starting repeats.
const repeatIntervalDuration = 50; // Once repeats start, they go fast.

export default class CustomRepeatButton extends CustomButton {
  [internal.componentDidMount]() {
    super[internal.componentDidMount]();

    // Wire up event handlers.
    // Only listen to mouse events with the primary (usually left) button.
    const inner = this[internal.ids].inner;
    inner.addEventListener("mousedown", event => {
      if (event.button === 0) {
        repeatStart(this);
      }
    });
    inner.addEventListener("mouseup", event => {
      if (event.button === 0) {
        repeatStop(this);
      }
    });
    inner.addEventListener("mouseleave", event => {
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

  get [internal.defaultState]() {
    return {
      ...super[internal.defaultState],
      interval: null,
      timeout: null
    };
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
    element[internal.setState]({ interval });
  }, initialTimeoutDuration - repeatIntervalDuration);
  element[internal.setState]({ timeout });
}

function repeatStop(element) {
  // Stop timeout and/or interval in progress.
  if (element[internal.state].timeout) {
    clearTimeout(element[internal.state].timeout);
    element[internal.setState]({ timeout: null });
  }
  if (element[internal.state].interval) {
    clearInterval(element[internal.state].interval);
    element[internal.setState]({ interval: null });
  }
}

// Raise a synthetic mousedown event.
function raiseMousedown(element) {
  const event = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    clientX: 0,
    clientY: 0,
    button: 0
  });
  element.dispatchEvent(event);
}

customElements.define("custom-repeat-button", CustomRepeatButton);
