import Debounce from "@/utils/behavior/debounce.ts";

describe("Debounce", () => {
  const fakeFunction = vi.fn();
  const proxyFunction = new Debounce(fakeFunction);

  describe("run", () => {
    it("should run after some time", () => {
      const fakeParams = [1, 2, 3];
      proxyFunction.run(...fakeParams);
      expect(fakeFunction).not.toHaveBeenCalled();

      vi.advanceTimersByTime(125);
      expect(fakeFunction).toHaveBeenCalled();
      expect(fakeFunction).toHaveBeenCalledWith(...fakeParams);
    });
  });
});
