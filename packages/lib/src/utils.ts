import Long from "long";
import { BITMAP_BYTE, BITMAP_SHORT } from "./index.js";

export class Utils {
  static createKey(kind: number, domain: number, country: number, cat: number, subcat: number, specific: number, extra: number): Long {
    const key = Long.fromInt(kind)
      .and(BITMAP_BYTE)
      .shiftLeft(56)
      .or(Long.fromInt(domain).and(BITMAP_BYTE).shiftLeft(48))
      .or(Long.fromInt(country).and(BITMAP_SHORT).shiftLeft(32))
      .or(Long.fromInt(cat).and(BITMAP_BYTE).shiftLeft(24))
      .or(Long.fromInt(subcat).and(BITMAP_BYTE).shiftLeft(16))
      .or(Long.fromInt(specific).and(BITMAP_BYTE).shiftLeft(8))
      .or(Long.fromInt(extra).and(BITMAP_BYTE));
    return key;
  }
}

export class LongKeyMap<V> {
  private map = new Map<string, V>();

  set(key: Long, value: V): void {
    this.map.set(key.toString(), value);
  }

  get(key: Long): V | undefined {
    return this.map.get(key.toString());
  }

  has(key: Long): boolean {
    return this.map.has(key.toString());
  }

  delete(key: Long): boolean {
    return this.map.delete(key.toString());
  }

  clear(): void {
    this.map.clear();
  }

  keys(): Long[] {
    return Array.from(this.map.keys()).map((k) => Long.fromString(k));
  }

  values(): V[] {
    return Array.from(this.map.values());
  }

  entries(): [Long, V][] {
    return Array.from(this.map.entries()).map(([k, v]) => [Long.fromString(k), v]);
  }

  forEach(callback: (value: V, key: Long, map: this) => void): void {
    for (const [k, v] of this.map.entries()) {
      callback(v, Long.fromString(k), this);
    }
  }

  get size(): number {
    return this.map.size;
  }
}
