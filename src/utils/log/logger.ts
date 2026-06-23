export default class Logger {
  private _caller: string;

  constructor(caller: string) {
    this._caller = caller;
  }

  log(...message: unknown[]) {
    if (!import.meta.env.PROD) console.log(`[FINAL-MASK] ${this._caller}:`, ...message);
  }
}
