import Snapshot from "@/utils/behavior/snapshot.ts";
import Formatter from "@/utils/format/formatter.ts";

interface initOptions {
  onInput?: (e?: InputEvent) => unknown;
}

export default class Mask {
  private _formatter: Formatter;
  private _recorder = new Snapshot("");

  private constructor(...args: ConstructorParameters<typeof Formatter>) {
    this._formatter = new Formatter(...args);
  }

  static setup(mask: string, selectorOrElement: string | HTMLInputElement, options?: initOptions) {
    new Mask(mask).init(selectorOrElement, options);
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

    input.onbeforeinput = (event) => {
      this.handleBeforeInput(event);
    };
  }

  private handleBeforeInput(event: InputEvent) {
    const input = event.target;
    if (!this.isHTMLInputElement(input)) return;
    if (this.isDeletionEvent(event)) this._recorder.insert(input.value);
  }

  private handleInput(event: InputEvent) {
    const input = event.target;
    if (!this.isHTMLInputElement(input)) return;
    if (this.isUndoEvent(event)) return this.handleUndo(input);
    if (this.isRedoEvent(event)) return this.insertText(input, this._recorder.redo());

    const { value } = input;
    const maskedValue = this._formatter.mask(value);
    this.insertText(input, maskedValue);
  }

  private handleUndo(input: HTMLInputElement) {
    const { value } = input;
    if (this._recorder.getValue() !== value) this._recorder.insert(value);
    this.insertText(input, this._recorder.undo());
  }

  private isUndoEvent(event: InputEvent) {
    return event.inputType === "historyUndo";
  }

  private isRedoEvent(event: InputEvent) {
    return event.inputType === "historyRedo";
  }

  private isDeletionEvent(event: InputEvent) {
    return event.inputType.startsWith("delete");
  }

  private insertText(input: HTMLInputElement, text: string) {
    input.setRangeText(text, 0, input.value.length, "end");
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
