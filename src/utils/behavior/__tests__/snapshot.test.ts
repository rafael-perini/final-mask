import Snapshot from "@/utils/behavior/snapshot.ts";

describe("Snapshot", () => {
  const recorder = new Snapshot("");

  describe("insert", () => {
    it("should record some value", () => {
      const secondValue = "123";
      const thirdValue = "456";

      recorder.insert(secondValue);
      expect(recorder.getValue()).toBe(secondValue);

      recorder.insert(thirdValue);
      expect(recorder.getValue()).toBe(thirdValue);
    });
  });

  describe("undo", () => {
    it("should be able to undo many changes", () => {
      const secondValue = "123";
      const thirdValue = "456";
      const fourtValue = "789";
      const fifthValue = "147";

      recorder.insert(secondValue);
      recorder.insert(thirdValue);
      recorder.insert(fourtValue);

      expect(recorder.undo()).toBe(thirdValue);
      expect(recorder.undo()).toBe(secondValue);

      recorder.insert(fifthValue);

      expect(recorder.undo()).toBe(secondValue);
    });
  });

  describe("redo", () => {
    it("should be able to undo many changes", () => {
      const secondValue = "123";
      const thirdValue = "456";
      const fourtValue = "789";
      const fifthValue = "147";

      recorder.insert(secondValue);
      recorder.insert(thirdValue);
      recorder.insert(fourtValue);

      recorder.undo();
      expect(recorder.undo()).toBe(secondValue);
      expect(recorder.redo()).toBe(thirdValue);
      expect(recorder.redo()).toBe(fourtValue);

      recorder.undo();
      recorder.insert(fifthValue);
      recorder.undo();
      expect(recorder.redo()).toBe(fifthValue);
    });
  });
});
