import Debounce from "@/utils/behavior/debounce.ts";
import Snapshot from "@/utils/behavior/snapshot.ts";

export default class DebouncedSnapshot<T> extends Snapshot<T> {
  private _deboucedInsert: Debounce<Snapshot<T>["insert"]>;

  constructor(defaultValue: T, timeout?: number) {
    super(defaultValue);

    this._deboucedInsert = new Debounce(
      (...args: Parameters<typeof this.insert>) => super.insert(...args),
      timeout,
    );
  }

  insert(value: T): void {
    return this._deboucedInsert.run(value);
  }
}
