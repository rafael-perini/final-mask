import Logger from "@/utils/log/logger.ts";

describe("Logger", () => {
  const reference = "Unit test";
  const logger = new Logger(reference);

  describe("log", () => {
    beforeEach(() => vi.unstubAllEnvs());

    it("should log info with references", () => {
      const message = "Some info here";
      logger.log(message);
      expect(console.log).toHaveBeenCalledOnce();
      expect(console.log).toHaveBeenCalledWith(`[FINAL-MASK] ${reference}:`, message);
    });

    it("should only log outside production environments", () => {
      vi.stubEnv("PROD", true);

      const message = "New infos here";
      logger.log(message);
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
