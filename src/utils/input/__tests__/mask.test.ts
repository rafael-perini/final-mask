import Mask from "@/utils/input/mask.ts";

describe("Mask", () => {
  const finalMask = new Mask("##.###.###/####-##");

  const input = appendInput();
  finalMask.init(input);

  describe("init", () => {
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

    it.todo("should handle undo and redo");
    it.todo("should handle selection positioning");

    it("should warn if the provided element isn't an input type text", () => {
      expect(console.warn).not.toHaveBeenCalled();

      const selector = "not-and-input";
      finalMask.init(selector);

      expect(console.warn).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Failed to find the associated input element for: ${selector}`,
      );

      const h1 = appendH1();
      const h1Selector = "h1";
      finalMask.init(h1Selector);

      expect(console.warn).toHaveBeenCalledTimes(2);
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Associated input element for "${h1Selector}" is not an input`,
      );

      finalMask.init(h1 as HTMLInputElement);

      expect(console.warn).toHaveBeenCalledTimes(3);
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Associated input element for "${h1?.outerHTML}" is not an input`,
      );
    });
  });

  describe.todo("getUnmaskedValue");
  describe.todo("getMaskedValue");
});

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
  input.value = value;
  input.dispatchEvent(new InputEvent("input", { inputType: "insertText" }));
}

function deleteBackward(input: HTMLInputElement) {
  const value = input.value;
  input.value = value.substring(0, value.length - 1);
  input.dispatchEvent(new InputEvent("input", { inputType: "deleteContentBackward" }));
}

function deleteForward(input: HTMLInputElement) {
  const value = input.value;
  input.value = value.substring(1, value.length);
  input.dispatchEvent(new InputEvent("input", { inputType: "deleteContentForward" }));
}
