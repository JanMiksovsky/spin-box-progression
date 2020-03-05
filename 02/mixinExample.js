// Functional mixin
function GreetMixin(Base) {
  return class Greet extends Base {
    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }
      this.greet();
    }

    greet() {
      console.log("Hello");
    }
  };
}

// Define a web component that uses the mixin.
class GreetElement extends GreetMixin(HTMLElement) {}
customElements.define("greet-element", GreetElement);

// Instantiate the component.
const element = new GreetElement();
document.body.append(element); // logs "Hello"
element.greet(); // logs "Hello"
