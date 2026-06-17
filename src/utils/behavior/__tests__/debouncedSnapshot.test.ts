import DebouncedSnapshot from "@/utils/behavior/debouncedSnapshot.ts";

describe("DebouncedSnapshot", () => {
  const recorder = new DebouncedSnapshot("");

  describe("insert", () => {
    it("should wait before insert", () => {
      const firstValue = "123";
      const secondValue = "456";
      const thirdValue = "789";

      recorder.insert(firstValue);
      expect(recorder.getValue()).toBe("");

      vi.runAllTimers();
      expect(recorder.getValue()).toBe(firstValue);

      recorder.insert(secondValue);
      recorder.insert(thirdValue);
      expect(recorder.getValue()).toBe(firstValue);

      vi.runAllTimers();
      expect(recorder.getValue()).toBe(thirdValue);
    });
  });
});
