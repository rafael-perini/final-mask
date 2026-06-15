import Mask from "@/utils/input/mask.ts";
import { FinalMask } from "@/index.ts";

describe("index", () => {
  it("should export mask as FinalMask", () => {
    expect(FinalMask).toBe(Mask);
  });
});
