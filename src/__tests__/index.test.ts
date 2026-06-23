import Formatter from "@/utils/format/formatter.ts";
import Mask from "@/utils/input/mask.ts";
import { FinalMask, MaskFormatter } from "@/index.ts";

describe("index", () => {
  it("should export mask as FinalMask", () => {
    expect(FinalMask).toBe(Mask);
  });
  it("should export formatter as MaskFormatter", () => {
    expect(MaskFormatter).toBe(Formatter);
  });
});
