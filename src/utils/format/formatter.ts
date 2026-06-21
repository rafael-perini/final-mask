export default class Formatter {
  private _mask: string;

  /**
   * @param mask A masked string like "+ ## (##) #####-####"
   */
  constructor(mask: string) {
    this._mask = mask;
  }

  mask(value: string) {
    const unmaskedValue = this.unmask(value);
    if (!unmaskedValue) return "";

    let maskedValue = this._mask;
    for (const number of unmaskedValue) {
      maskedValue = maskedValue.replace(/#/, number);
    }

    if (maskedValue.includes("#")) maskedValue = maskedValue.replace(/(\d)\D+$/, "$1");

    return maskedValue;
  }

  unmask(value: string) {
    return value.replace(/[\D]/g, "");
  }
}
