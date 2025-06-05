import { createEntityDomainFromNumber, type EntityDomain } from "./entitydomain.js";
import { createEntityKindFromNumber, type EntityKind } from "./entitykind.js";
import debugEsm from "debug";
import { BITMAP_BYTE, BITMAP_SHORT } from "./sisoenums.js";
const debug = debugEsm("SISO:enum");

export interface SisoEnumsDataType {
  categories: Record<string, string>;
  countries: Record<string, string>;
  domains: Record<string, string>;
}

export interface SisoEnumType {
  kind: number; // High-level classification (e.g., Platform, Munition)
  domain: number; // Operational domain (e.g., Land, Air, Sea)
  country: number; // Country code
  category: number; // Specific category within the domain
  subcategory: number; // Subcategory
  specific: number; // Specific type
  extra: number; // Extra detail
  getKind(): EntityKind | undefined;
  getDomain(): EntityDomain | undefined;
  toString(): string;
}

export class SisoEnum implements SisoEnumType {
  constructor(
    public kind: number,
    public domain: number,
    public country: number,
    public category: number,
    public subcategory: number,
    public specific: number,
    public extra: number,
  ) {
    this.kind = kind;
    this.domain = domain;
    this.country = country;
    this.category = category;
    this.subcategory = subcategory;
    this.specific = specific;
    this.extra = extra;
  }

  getKind(): EntityKind | undefined {
    return createEntityKindFromNumber(this.kind);
  }

  getDomain(): EntityDomain | undefined {
    return createEntityDomainFromNumber(this.domain);
  }

  toString(): string {
    return `${this.kind}.${this.domain}.${this.country}.${this.category}.${this.subcategory}.${this.specific}.${this.extra}`;
  }

  static fromString(enumString: string, separator: string = "."): SisoEnum {
    if (!enumString || !enumString.includes(separator)) throw new Error(`No valid enum string: ${enumString}`);
    const parts = enumString.split(separator).map((str) => +str);
    if (parts.length != 7) throw new Error(`No valid enum string: ${enumString}`);
    const [kind, domain, country, category, subcategory, specific, extra] = parts;
    return new SisoEnum(kind!, domain!, country!, category!, subcategory!, specific!, extra!);
  }

  static fromKey(key: bigint): SisoEnum {
    if (key == null) throw new Error(`No valid enum string: ${key}`);
    return new SisoEnum(
      Number((key >> 56n) & BITMAP_BYTE),
      Number((key >> 48n) & BITMAP_BYTE),
      Number((key >> 32n) & BITMAP_SHORT),
      Number((key >> 24n) & BITMAP_BYTE),
      Number((key >> 16n) & BITMAP_BYTE),
      Number((key >> 8n) & BITMAP_BYTE),
      Number(key & BITMAP_BYTE),
    );
  }
}
