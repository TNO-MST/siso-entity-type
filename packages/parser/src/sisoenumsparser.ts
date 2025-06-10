import { BITMAP_BYTE, BITMAP_SHORT, LongKeyMap, Utils, type SisoEnumsDataType } from "@siso-entity-type/lib";
import { XMLBuilder } from "fast-xml-parser";
import fs, { existsSync, mkdirSync } from "fs";
import Long from "long";
import debugEsm from "debug";
const debug = debugEsm("SISO:enums");

import type {
  CategoryElement,
  EntityElement,
  Enum,
  FluffySpecific,
  JammerKind,
  PurpleEntity,
  PurpleSpecific,
  PurpleSubcategory,
  SISOXMLTypes,
  StickySpecific,
  SubcategoryClass,
  SubcategoryElement,
  TentacledSpecific,
} from "./generated/siso-xml-types.js";
import { join } from "path";

type AllSpecificTypes = StickySpecific | PurpleSpecific | FluffySpecific | TentacledSpecific;

// UIDs
const UID_ENTITYKIND = 7;
const UID_OTHERKIND_DOMAIN = 8;
const UID_MUNITIONKIND_DOMAIN = 14;
const UID_SUPPLYKIND_DOMAIN = 600;
const UID_COUNTRY = 29;

// Default settings for the configuration options.
export const DEFAULT_QUALIFIED = false;
export const DEFAULT_DELIMITER = " / ";
export const DEFAULT_DEPRECATED = false;

export class SisoEnumsParser {
  private parsedXml: SISOXMLTypes;
  private mapKind: LongKeyMap<string> = new LongKeyMap();
  private mapDomain: LongKeyMap<string> = new LongKeyMap();
  private mapCountry: LongKeyMap<string> = new LongKeyMap();
  private mapCategory: LongKeyMap<string> = new LongKeyMap();
  private mapSubcategory: LongKeyMap<string> = new LongKeyMap();
  private applicabilityMap: Map<string, number[]> = new Map();

  constructor(parsedXml: SISOXMLTypes) {
    this.parsedXml = parsedXml;
    this.parse();
  }

  public get countryCount() {
    return this.mapCountry.size;
  }

  public get kindCount() {
    return this.mapKind.size;
  }

  public get domainCount() {
    return this.mapDomain.size;
  }

  public get categoryCount() {
    return this.mapCategory.size;
  }

  public get subcategoryCount() {
    return this.mapSubcategory.size;
  }

  public getCountry(key: Long) {
    return this.mapCountry.get(key);
  }

  public getCategory(key: Long) {
    return this.mapCategory.get(key);
  }

  public getSubcategory(key: Long) {
    return this.mapSubcategory.get(key);
  }

  public getKind(key: Long) {
    return this.mapKind.get(key);
  }

  public getDomain(key: Long) {
    return this.mapDomain.get(key);
  }

  private parse() {
    this.initializeEnums();
    this.initializeEntityTypes();
    debug(`Processed ${this.countryCount} countries`);
    debug(`Processed ${this.kindCount} kinds`);
    debug(`Processed ${this.domainCount} domains`);
    debug(`Processed ${this.categoryCount} categories`);
    debug(`Processed ${this.subcategoryCount} subcategories`);
  }

  private initializeEnums() {
    for (const e of this.parsedXml.ebv.enum) {
      switch (+e.__uid) {
        case UID_COUNTRY:
          this.initializeCountries(e);
          break;
        case UID_ENTITYKIND:
          this.initializeEntityKinds(e);
          break;
        case UID_MUNITIONKIND_DOMAIN:
        case UID_OTHERKIND_DOMAIN:
        case UID_SUPPLYKIND_DOMAIN:
          this.initializeDomains(e);
          break;
        default:
          continue;
      }
    }
  }

  private initializeEntityTypes() {
    debug("Parsing entities");
    for (const c of this.parsedXml.ebv.cet) {
      if (Array.isArray(c.entity)) {
        for (const e of c.entity) {
          this.initializeEntity(e);
        }
      } else if (c.entity != null) {
        this.initializeEntity(c.entity);
      } else {
        console.warn(`Unsupported entity type for ${JSON.stringify(c)}`);
      }
    }
  }

  private initializeEntity(ee: EntityElement | PurpleEntity) {
    if (Array.isArray(ee.category)) {
      for (const c of ee.category) {
        this.initializeCategory(+ee.__kind, +ee.__domain, +ee.__country, c);
      }
    } else {
      this.initializeCategory(+ee.__kind, +ee.__domain, +ee.__country, ee.category);
    }
  }

  private initializeCategory(kind: number, domain: number, country: number, c: CategoryElement | JammerKind) {
    this.output(this.mapCategory, kind, domain, country, +c.__value, 0, 0, 0, c.__description);
    if (c.subcategory) {
      this.initializeSubcategory(kind, domain, country, +c.__value, c.subcategory, c.__description);
    }
  }

  private initializeSubcategory(
    kind: number,
    domain: number,
    country: number,
    category: number,
    scc: SubcategoryClass[] | CategoryElement | SubcategoryElement[] | PurpleSubcategory,
    text: string,
  ) {
    if (Array.isArray(scc)) {
      for (const sc of scc) {
        this.processSubcategory(kind, domain, country, category, sc, text);
      }
    } else if (scc.__value != null && scc.__description != null) {
      this.processSubcategory(kind, domain, country, category, scc, text);
    } else {
      console.warn(`Unsupported format for Subcategory (${JSON.stringify(scc)})`);
    }
  }

  private processSubcategory(
    kind: number,
    domain: number,
    country: number,
    category: number,
    scc: SubcategoryClass | CategoryElement | PurpleSubcategory,
    text: string,
  ) {
    const description = DEFAULT_QUALIFIED ? `${text}${DEFAULT_DELIMITER}${scc.__description}` : scc.__description;
    this.output(this.mapSubcategory, kind, domain, country, category, +scc.__value, 0, 0, description);
    if (scc.specific) {
      this.initializeSpecific(kind, domain, country, category, +scc.__value, scc.specific, description);
    }
  }

  public initializeSpecific(
    kind: number,
    domain: number,
    country: number,
    category: number,
    subcategory: number,
    spec: SubcategoryClass | SubcategoryClass[] | AllSpecificTypes | AllSpecificTypes[],
    text: string,
  ) {
    if (Array.isArray(spec)) {
      for (const sp of spec) {
        this.processSpecific(kind, domain, country, category, subcategory, sp, text);
      }
    } else if (spec.__value != null && spec.__description != null) {
      this.processSpecific(kind, domain, country, category, subcategory, spec, text);
    } else {
      return debug(`SKIPPED: unsupported value for Specific (${JSON.stringify(spec)})`);
    }
  }

  private processSpecific(
    kind: number,
    domain: number,
    country: number,
    category: number,
    subcategory: number,
    spec: SubcategoryClass | CategoryElement,
    text: string,
  ) {
    const description = DEFAULT_QUALIFIED ? `${text}${DEFAULT_DELIMITER}${spec.__description}` : spec.__description;
    this.output(this.mapSubcategory, kind, domain, country, category, subcategory, +spec.__value, 0, description);
    if (spec.extra) {
      this.initializeExtra(kind, domain, country, category, subcategory, +spec.__value, spec.extra, description);
    }
  }

  public initializeExtra(
    kind: number,
    domain: number,
    country: number,
    category: number,
    subcategory: number,
    specific: number,
    extra: SubcategoryClass | SubcategoryClass[] | AllSpecificTypes | AllSpecificTypes[] | JammerKind | JammerKind[],
    text: string,
  ) {
    if (Array.isArray(extra)) {
      for (const ex of extra) {
        this.processExtra(kind, domain, country, category, subcategory, specific, ex, text);
      }
    } else if (extra.__value != null && extra.__description != null) {
      this.processExtra(kind, domain, country, category, subcategory, specific, extra, text);
    } else {
      return debug(`SKIPPED: unsupported value for extra (${JSON.stringify(extra)})`);
    }
  }

  private processExtra(
    kind: number,
    domain: number,
    country: number,
    category: number,
    subcategory: number,
    specific: number,
    extra: SubcategoryClass | CategoryElement | AllSpecificTypes | JammerKind,
    text: string,
  ) {
    const description = DEFAULT_QUALIFIED ? `${text}${DEFAULT_DELIMITER}${extra.__description}` : extra.__description;
    this.output(this.mapSubcategory, kind, domain, country, category, subcategory, specific, +extra.__value, description);
  }

  private initializeCountries(e: Enum) {
    debug("Parsing countries");
    if (!e.enumrow || !Array.isArray(e.enumrow)) return;
    for (const r of e.enumrow) {
      this.output(this.mapCountry, 0, 0, +r.__value, 0, 0, 0, 0, r.__description);
    }
    debug(JSON.stringify(Object.fromEntries(this.mapCountry.entries())));
  }

  private initializeEntityKinds(e: Enum) {
    debug("Parsing kinds");
    if (!e.enumrow || !Array.isArray(e.enumrow)) return;
    for (const r of e.enumrow) {
      this.output(this.mapKind, +r.__value, 0, 0, 0, 0, 0, 0, r.__description);
    }
    debug(JSON.stringify(Object.fromEntries(this.mapKind.entries())));
  }

  private initializeDomains(e: Enum) {
    debug("Parsing domains");
    if (!e.enumrow || !Array.isArray(e.enumrow)) return;
    for (const r of e.enumrow) {
      for (const kind of this.getKinds(e.__applicability)) {
        this.output(this.mapDomain, kind, +r.__value, 0, 0, 0, 0, 0, r.__description);
      }
    }
    debug(JSON.stringify(Object.fromEntries(this.mapDomain.entries())));
  }

  private getKinds(applicability?: string): number[] {
    if (!applicability) {
      return [];
    }

    let kinds = this.applicabilityMap.get(applicability);
    if (!kinds) {
      kinds = [];
      const parts = applicability.split(",");
      for (const part of parts) {
        const range = part.split("-").map((r) => +r || 0);
        if (range.length === 1) {
          kinds.push(range[0]!);
        } else if (range.length > 1) {
          const min = range[0]!;
          const max = range[1]!;
          for (let kind = min; kind < max; kind++) {
            kinds.push(kind);
          }
          kinds.push(max);
        }
      }
      this.applicabilityMap.set(applicability, kinds);
    }

    return kinds;
  }

  private output(
    map: LongKeyMap<string>,
    kind: number,
    domain: number,
    country: number,
    cat: number,
    subcat: number,
    spec: number,
    extra: number,
    txt: string,
  ) {
    const key = Utils.createKey(kind, domain, country, cat, subcat, spec, extra);
    map.set(key, txt);
  }

  toString() {
    if (!this.parsedXml) return "";
    const builder = new XMLBuilder();
    return builder.build(this.parsedXml);
  }

  writeOutputFiles(folder: string) {
    const obj = {} as SisoEnumsDataType;
    obj.subcategories = this.getRecordFromMap(this.mapSubcategory);
    obj.categories = this.getRecordFromMap(this.mapCategory);
    obj.countries = this.getRecordFromMap(this.mapCountry);
    obj.domains = this.getRecordFromMap(this.mapDomain);
    this.assertFolder(folder);
    const outputFile = join(folder, "siso-enums.json");
    fs.writeFileSync(outputFile, JSON.stringify(obj));
    console.log(
      `Wrote ${Object.keys(obj.domains).length} domains, ${Object.keys(obj.categories).length} categories, `,
      `${Object.keys(obj.categories).length} categories`,
      `and ${Object.keys(obj.countries).length} countries to ${join(outputFile)}`,
    );
  }

  private getRecordFromMap(map: LongKeyMap<string>) {
    const obj: Record<string, string> = {};
    for (const [key, value] of map.entries()) {
      obj[key.toString()] = value;
    }
    return obj;
  }

  private assertFolder(folder: string) {
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
  }
}
