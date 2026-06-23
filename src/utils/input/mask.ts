import Snapshot from "@/utils/behavior/snapshot.ts";
import Formatter from "@/utils/format/formatter.ts";

interface initOptions {
  onInput?: (e?: InputEvent) => unknown;
  onBeforeInput?: (e?: InputEvent) => unknown;
}

export default class Mask {
  private _formatter;
  private _recorder;
  private _mask;

  private constructor(...args: ConstructorParameters<typeof Formatter>) {
    this._formatter = new Formatter(...args);
    this._recorder = new Snapshot("");
    this._mask = args[0];
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

    input.maxLength = this._mask.length;

    input.onblur = (event) => this.handleBlur(event);

    input.onbeforeinput = (event) => {
      this.handleBeforeInput(event);
      options.onBeforeInput?.(event);
    };

    input.oninput = (event) => {
      this.handleInput(event);
      options.onInput?.(event);
    };
  }

  private handleBlur(event: FocusEvent) {
    const input = event.target;
    if (!this.isHTMLInputElement(input)) return;
    if (!this.isFocused(input)) this.record(input.value);
  }

  private handleBeforeInput(event: InputEvent) {
    const input = event.target;
    if (!this.isHTMLInputElement(input)) return;

    const { value } = input;
    if (this.isDeletionEvent(event)) return this.record(value);
    if (this.isUndoEvent(event)) return this.record(value);
  }

  private handleInput(event: InputEvent) {
    const input = event.target;
    if (!this.isHTMLInputElement(input)) return;
    if (this.isUndoEvent(event)) return this.insertText(input, this.undo());
    if (this.isRedoEvent(event)) return this.insertText(input, this.redo());

    const { value } = input;
    const maskedValue = this.mask(value);
    if (maskedValue !== value) {
      if (!this.isDeletionEvent(event)) this.record(maskedValue);
      this.insertText(input, maskedValue);
    }
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

  private isFocused(element: HTMLElement) {
    return element === document.activeElement;
  }

  private insertText(input: HTMLInputElement, text: string) {
    input.setRangeText(text, 0, input.value.length, "end");
  }

  private mask(value: string) {
    return this._formatter.mask(value);
  }

  private record(value: string) {
    if (value !== this.currentRecord()) this._recorder.insert(value);
  }

  private currentRecord() {
    return this._recorder.getValue();
  }

  private undo() {
    return this._recorder.undo();
  }

  private redo() {
    return this._recorder.redo();
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
