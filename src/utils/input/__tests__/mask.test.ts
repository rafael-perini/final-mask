import Mask from "@/utils/input/mask.ts";
import type { Mock } from "vite-plus/test";

describe("Mask", () => {
  const onInput = vi.fn();
  const onBeforeInput = vi.fn();
  let input = setupInput();

  beforeEach(() => {
    input = setupInput({ onInput, onBeforeInput });
  });

  describe("setup", () => {
    it("should warn if the provided element isn't an input type text", () => {
      expect(console.warn).not.toHaveBeenCalled();

      const selector = "not-and-input";
      setupMask(selector);

      expect(console.warn).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Failed to find the associated input element for: ${selector}`,
      );

      const h1 = appendH1();
      const h1Selector = "h1";
      setupMask(h1Selector);

      expect(console.warn).toHaveBeenCalledTimes(2);
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Associated input element for "${h1Selector}" is not an input`,
      );

      setupMask(h1 as HTMLInputElement);

      expect(console.warn).toHaveBeenCalledTimes(3);
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Associated input element for "${h1?.outerHTML}" is not an input`,
      );
    });
  });

  describe.todo("getMaskedValue");
  describe.todo("getUnmaskedValue");

  describe("common inputs", () => {
    it("should mask the inserted value", () => {
      const expectedValue = "12.345.678/9012-34";
      const unmaskedValue = "12345678901234";
      setValue(input, unmaskedValue);
      expect(input.value).toBe(expectedValue);
    });

    it("should handle deletions", () => {
      const firstValue = "12.345.678/9012-34";
      setValue(input, "12345678901234");
      expect(input.value).toBe(firstValue);

      const secondValue = "12.345.678/9";
      setValue(input, "123456789");
      expect(input.value).toBe(secondValue);

      deleteBackward(input);
      expect(input.value).toBe("12.345.678");

      deleteBackward(input);
      deleteBackward(input);
      expect(input.value).toBe("12.345.6");

      deleteForward(input);
      expect(input.value).toBe("23.456");
    });
  });

  describe("undo and redo", () => {
    it("should handle ordinary typing", () => {
      const firstValue = "12";
      const maskedFirstValue = "12";

      setValue(input, firstValue);

      undo(input);
      expect(input.value).toBe("");

      redo(input);
      expect(input.value).toBe(maskedFirstValue);

      const secondValue = "123456789";
      const maskedSecondValue = "12.345.678/9";

      setValue(input, secondValue);

      undo(input);
      expect(input.value).toBe(maskedFirstValue);

      redo(input);
      expect(input.value).toBe(maskedSecondValue);

      const thirdValue = "1235468793210";
      const maskedThirdValue = "12.354.687/9321-0";

      setValue(input, thirdValue);

      undo(input);
      expect(input.value).toBe(maskedSecondValue);

      undo(input);
      expect(input.value).toBe(maskedFirstValue);

      undo(input);
      expect(input.value).toBe("");

      redo(input);
      redo(input);
      redo(input);
      expect(input.value).toBe(maskedThirdValue);

      undo(input);
      undo(input);
      undo(input);
      expect(input.value).toBe("");
    });

    it("should handle text deletions", () => {
      const firstValue = "43210987654321";
      const maskedFirstValue = "43.210.987/6543-21";

      setValue(input, firstValue);
      deleteBackward(input);

      undo(input);
      expect(input.value).toBe(maskedFirstValue);

      redo(input);
      expect(input.value).toBe("43.210.987/6543-2");

      deleteBackward(input);
      deleteBackward(input);
      deleteForward(input);
      deleteForward(input);

      expect(input.value).toBe("21.098.765/4");

      undo(input);
      expect(input.value).toBe("32.109.876/54");

      undo(input);
      expect(input.value).toBe("43.210.987/654");

      undo(input);
      expect(input.value).toBe("43.210.987/6543");

      undo(input);
      expect(input.value).toBe("43.210.987/6543-2");

      redo(input);
      expect(input.value).toBe("43.210.987/6543");

      redo(input);
      expect(input.value).toBe("43.210.987/654");

      redo(input);
      expect(input.value).toBe("32.109.876/54");

      redo(input);
      expect(input.value).toBe("21.098.765/4");
    });

    it("should handle blur", () => {
      const firstValue = "78945612309876";

      setValue(input, firstValue);
      blurLeavingPage(input);

      const secondValue = "87678945612309";
      const maskedSecondValue = "87.678.945/6123-09";

      setValue(input, secondValue);
      undo(input);
      expect(input.value).toBe("");

      redo(input);
      expect(input.value).toBe(maskedSecondValue);

      const thirdValue = "86789456123";
      const maskedThirdValue = "86.789.456/123";
      setValue(input, thirdValue);

      expect(getFocusedElement()).toBe(input);
      blurToAnotherElement(input);
      expect(getFocusedElement()).not.toBe(input);

      const fourtValue = "8678945634512";
      setValue(input, fourtValue);

      undo(input);
      expect(input.value).toBe(maskedThirdValue);
    });

    it.todo("should handle text replacements");
    it.todo("should handle paste");
    it.todo("should handle selection positioning");
  });

  describe("options", () => {
    it("should be able to receive an input callback", () => {
      const expectedValue = "12.678.345/9012-34";
      const unmaskedValue = "12678345901234";
      setValue(input, unmaskedValue);
      expect(onInput).toHaveBeenCalledOnce();
      expect(onInput).toHaveBeenCalledWith(expect.any(InputEvent));
      expect(onInput).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
      expect(onInput).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: expectedValue }),
        }),
      );
    });

    it("should be able to receive a before input callback", () => {
      const expectedValue = "34.126.783/4590-12";
      const unmaskedValue = "34126783459012";
      setValue(input, unmaskedValue);
      expect(onBeforeInput).toHaveBeenCalledOnce();
      expect(onBeforeInput).toHaveBeenCalledWith(expect.any(InputEvent));
      expect(onBeforeInput).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
      expect(onBeforeInput).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: expectedValue }),
        }),
      );
    });
  });
});

interface SetupOptions {
  onInput?: Mock;
  onBeforeInput?: Mock;
}
function setupInput(options: SetupOptions = {}) {
  const input = appendInput();
  setupMask(input, options);
  return input;
}

const mask = "##.###.###/####-##";
function setupMask(input: string | HTMLInputElement, options?: SetupOptions) {
  Mask.setup(mask, input, options);
}

function appendH1() {
  const h1 = document.createElement("h1");
  h1.innerText = "Test Title";
  document.body.append(h1);
  return h1;
}

let counter = 0;
function appendInput() {
  const id = `test-input-${counter++}`;
  const input = document.createElement("input");
  input.id = id;
  document.body.append(input);
  return input;
}

function setValue(input: HTMLInputElement, value: string) {
  input.focus();
  input.dispatchEvent(new InputEvent("beforeinput", { inputType: "insertText" }));
  input.value = value;
  input.dispatchEvent(new InputEvent("input", { inputType: "insertText" }));
}

function deleteBackward(input: HTMLInputElement) {
  const { value } = input;

  input.focus();
  input.dispatchEvent(new InputEvent("beforeinput", { inputType: "deleteContentForward" }));

  input.value = value.substring(0, value.length - 1);
  input.dispatchEvent(new InputEvent("input", { inputType: "deleteContentBackward" }));
}

function deleteForward(input: HTMLInputElement) {
  const { value } = input;

  input.focus();
  input.dispatchEvent(new InputEvent("beforeinput", { inputType: "deleteContentForward" }));

  input.value = value.substring(1, value.length);
  input.dispatchEvent(new InputEvent("input", { inputType: "deleteContentForward" }));
}

function undo(input: HTMLInputElement) {
  input.dispatchEvent(new InputEvent("beforeinput", { inputType: "historyUndo" }));
  input.value = "********";
  input.dispatchEvent(new InputEvent("input", { inputType: "historyUndo" }));
}

function redo(input: HTMLInputElement) {
  input.dispatchEvent(new InputEvent("beforeinput", { inputType: "historyRedo" }));
  input.value = "********";
  input.dispatchEvent(new InputEvent("input", { inputType: "historyRedo" }));
}

function blurLeavingPage(input: HTMLInputElement) {
  input.dispatchEvent(new FocusEvent("blur"));
}

function blurToAnotherElement(input: HTMLInputElement) {
  const inputs = document.querySelectorAll("input");
  for (const differentInput of inputs) {
    if (differentInput !== input) {
      differentInput.focus();
      return input.dispatchEvent(new FocusEvent("blur"));
    }
  }
}

function getFocusedElement() {
  return document.activeElement;
}
