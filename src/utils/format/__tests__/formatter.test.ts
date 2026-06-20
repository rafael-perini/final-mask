import Formatter from "@/utils/format/formatter.ts";

describe("Formatter", () => {
  const mask = "+## (##) ####-####";
  const formatter = new Formatter(mask);

  describe("mask", () => {
    it("should format a string according to the masked value", () => {
      const maskedPhone = "+55 (11) 1224-1426";
      const unmaskedPhone = "551112241426";

      const value = formatter.mask(unmaskedPhone);
      expect(value).toBe(maskedPhone);
    });

    it("should return empty if there's no value yet", () => {
      const value = formatter.mask("");
      expect(value).toBe("");
    });

    it(" should be abble to format already formated values", () => {
      const maskedPhone = "+55 (11) 1224-1426";
      const value = formatter.mask(maskedPhone);
      expect(value).toBe(maskedPhone);

      const partiallyMaskedPhone = "+55 (11) 1224-1426";
      const partialValue = formatter.mask(partiallyMaskedPhone);
      expect(partialValue).toBe(maskedPhone);
    });

    it(" should be abble to format partial values", () => {
      const maskedPhone = "+55 (11) 1224";
      const unmaskedPhone = "55111224";

      const partialValue = formatter.mask(unmaskedPhone);
      expect(partialValue).toBe(maskedPhone);
    });

    it(" should handle masks that doesn't end with numbers", () => {
      const maskedTime = "03:45 AM";
      const unmaskedTime = "0345";

      const partialValue = new Formatter("##:## AM").mask(unmaskedTime);
      expect(partialValue).toBe(maskedTime);
    });
  });

  describe("unmask", () => {
    it("should return a string composed only by numbers from a mask", () => {
      const maskedPhone = "+55 (11) 1224-1426";
      const unmaskedPhone = "551112241426";

      const value = formatter.unmask(maskedPhone);
      expect(value).toBe(unmaskedPhone);
    });
  });
});
