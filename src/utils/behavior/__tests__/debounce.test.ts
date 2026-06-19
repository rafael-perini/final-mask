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
      expect(fakeFunction).toHaveBeenCalledOnce();
      expect(fakeFunction).toHaveBeenCalledWith(...fakeParams);
    });

    it("should run only once after timer", () => {
      proxyFunction.run();
      proxyFunction.run();

      vi.runAllTimers();
      expect(fakeFunction).toHaveBeenCalledOnce();
    });
  });

  describe("flush", () => {
    it("should run the pending callbacks immediately", () => {
      const expectedArgs = [4, 5, 6];
      proxyFunction.run();
      proxyFunction.run(expectedArgs);

      proxyFunction.flush();
      expect(fakeFunction).toHaveBeenCalledOnce();
      expect(fakeFunction).toHaveBeenCalledWith(expectedArgs);

      vi.runAllTimers();
      expect(fakeFunction).toHaveBeenCalledOnce();

      proxyFunction.flush();
      expect(fakeFunction).toHaveBeenCalledOnce();
    });
  });
});
