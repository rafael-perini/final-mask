import Formatter from "@/utils/format/formatter.ts";

interface initOptions {
  onInput?: (e?: InputEvent) => unknown;
}

export default class Mask {
  private _formatter: Formatter;

  constructor(...args: ConstructorParameters<typeof Formatter>) {
    this._formatter = new Formatter(...args);
  }

  init(selectorOrElement: string | HTMLInputElement, options: initOptions = {}) {
    const input = this.toHTMLInputElement(selectorOrElement);
    if (!input) {
      return console.warn(
        `[final-mask]: Failed to find the associated input element for: ${selectorOrElement as string}`,
      );
    }

    if (!this.isHTMLInputElement(input)) {
      return console.warn(
        `[final-mask]: Associated input element for "${this.toString(selectorOrElement)}" is not an input`,
      );
    }

    input.oninput = (event) => {
      this.handleInput(event);
      options.onInput?.(event);
    };
  }

  private handleInput(event: InputEvent) {
    const element = event.target;
    if (!this.isHTMLInputElement(element)) return;

    const { value } = element;
    const maskedValue = this._formatter.mask(value);
    element.setRangeText(maskedValue, 0, value.length, "end");
  }

  private toString(selectorOrElement: string | HTMLElement) {
    if (this.isSelector(selectorOrElement)) return selectorOrElement;
    return selectorOrElement.outerHTML;
  }

  private toHTMLInputElement(
    selectorOrElement: string | HTMLInputElement,
  ): HTMLInputElement | null {
    return this.isSelector(selectorOrElement)
      ? document.querySelector(selectorOrElement)
      : selectorOrElement;
  }

  private isSelector(selectorOrElement: string | Element): selectorOrElement is string {
    return typeof selectorOrElement === "string";
  }

  private isHTMLInputElement(element: Element | EventTarget | null): element is HTMLInputElement {
    return !!(element instanceof HTMLInputElement);
  }
}
