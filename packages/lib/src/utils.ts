import { BITMAP_BYTE, BITMAP_SHORT } from "./index.js";

export class Utils {
  static createKey(kind: number, domain: number, country: number, cat: number, subcat: number, specific: number, extra: number): bigint {
    const key =
      ((BigInt(kind) & BITMAP_BYTE) << 56n) |
      ((BigInt(domain) & BITMAP_BYTE) << 48n) |
      ((BigInt(country) & BITMAP_SHORT) << 32n) |
      ((BigInt(cat) & BITMAP_BYTE) << 24n) |
      ((BigInt(subcat) & BITMAP_BYTE) << 16n) |
      ((BigInt(specific) & BITMAP_BYTE) << 8n) |
      (BigInt(extra) & BITMAP_BYTE);
    return key;
  }
}
