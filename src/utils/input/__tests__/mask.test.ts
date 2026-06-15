import Mask from "@/utils/input/mask.ts";

describe("Mask", () => {
  const h1 = document.createElement("h1");
  h1.innerText = "Test Title";
  document.body.append(h1);

  const id = "test-input";
  const input = document.createElement("input");
  input.id = id;
  document.body.append(input);

  const finalMask = new Mask("##.###.###/####-##");

  describe("init", () => {
    it("should mask the inserted element value", () => {
      const expectedValue = "12.345.678/9012-34";

      finalMask.init(input);

      input.value = expectedValue.replace(/\D/g, "");
      input.dispatchEvent(new InputEvent("input", { inputType: "insertText" }));

      expect(input.value).toBe(expectedValue);
    });

    it.todo("should handle deletions");
    it.todo("should handle undo and redo");
    it.todo("should handle selection positioning");
    it.todo("should call previous input listeners");

    it("should warn when the provided element isn't an input type text", () => {
      expect(console.warn).not.toHaveBeenCalled();

      const selector = "not-and-input";
      finalMask.init(selector);

      expect(console.warn).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Failed to find the associated input element for: ${selector}`,
      );

      const h1Selector = "h1";
      finalMask.init(h1Selector);

      expect(console.warn).toHaveBeenCalledTimes(2);
      expect(console.warn).toHaveBeenCalledWith(
        `[final-mask]: Associated input element for "${h1Selector}" is not an input`,
      );

      const h1 = document.querySelector<HTMLHeadingElement>("h1");
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
