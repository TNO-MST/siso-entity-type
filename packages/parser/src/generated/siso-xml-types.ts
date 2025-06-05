// To parse this data:
//
//   import { Convert, SISOXMLTypes } from "./file";
//
//   const sISOXMLTypes = Convert.toSISOXMLTypes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface SISOXMLTypes {
  "?xml": XML;
  "?xml-stylesheet": XMLStylesheet[];
  ebv: Ebv;
}

export interface XML {
  __version: string;
  __encoding: string;
}

export interface XMLStylesheet {
  __type: string;
  __href: string;
  __title: string;
  __alternate: string;
}

export interface Ebv {
  copyright: string;
  revisions: JammerTechnique;
  dict: Dict;
  enum: Enum[];
  cet: JammerTechnique[];
  bitfield: Bitfield[];
  record: JammerTechnique[];
  cot: JammerTechnique[];
  jammer_technique: JammerTechnique;
  __xmlns: string;
  "__xmlns:xsi": string;
  "__xsi:schemaLocation": string;
  __title: string;
  __release: string;
  __date: Date;
  __href: string;
  __description: string;
  __organisation: string;
}

export interface Bitfield {
  bitfieldrow?: BitfieldrowElement[] | PurpleBitfieldrow;
  __uid: string;
  __name: string;
  __size: string;
  cr?: CRElement[] | CRElement;
}

export interface BitfieldrowElement {
  cr: CRElement[] | CRElement;
  __name: string;
  __bit_position: string;
  __description: string;
  __xref?: string;
  __length?: string;
  __footnote?: string;
  __status?: Status;
}

export enum Status {
  New = "new",
}

export interface CRElement {
  __value: string;
}

export interface PurpleBitfieldrow {
  cr: CRElement;
  __name: string;
  __bit_position: string;
  __length?: string;
  __description: string;
  __xref?: string;
}

export interface JammerTechnique {
  cr?: CRElement;
  entity?: EntityElement[] | PurpleEntity;
  __uid: string;
  __name: string;
  object?: ObjectElement[] | PurpleObject;
  jammer_kind?: JammerKind[];
  field?: Field[];
  revision?: Revision[];
}

export interface EntityElement {
  cr?: CRElement;
  category: CategoryElement[] | JammerKind;
  __kind: string;
  __domain: string;
  __country: string;
  __uid: string;
  __status?: Status;
}

export interface SubcategoryXref {
  cr: CRElement;
  specific: JammerKind;
  __xref: string;
  __description: string;
  __uid: string;
}

export interface StickySpecific {
  cr?: CRElement[] | CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __deprecated?: string;
  __variation?: string;
  __footnote?: string;
  extra?: JammerKind[] | JammerKind;
  __status?: Status;
}

export interface FluffySpecific {
  cr?: CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __footnote?: string;
  __variation?: string;
  __status?: Status;
  __deprecated?: string;
  extra?: JammerKind[];
}

export interface PurpleSpecific {
  cr?: CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __footnote?: string;
  __status?: Status;
  extra?: JammerKind[] | JammerKind;
}

export interface PurpleSubcategory {
  cr?: CRElement[] | CRElement;
  __value: string;
  __description: string;
  __uid: string;
  specific?: PurpleSpecific[] | FluffySpecific;
  __variation?: string;
  __status?: Status;
  __deprecated?: string;
}

export interface SubcategoryElement {
  specific?: SubcategoryClass[] | CategoryElement;
  __value: string;
  __description: string;
  __uid: string;
  cr?: CRElement[] | CRElement;
  __variation?: string;
  __deprecated?: string;
  __status?: Status;
}

export interface JammerKind {
  cr?: CRElement;
  __value: string;
  __description: string;
  __uid?: string;
  __status?: Status;
  subcategory?: SubcategoryElement[] | PurpleSubcategory;
  __deprecated?: string;
  jammer_category?: JammerKind[] | JammerKind;
  jammer_subcategory?: JammerKind[] | JammerKind;
  jammer_specific?: JammerKind[] | JammerKind;
  __footnote?: string;
}

export interface CategoryElement {
  subcategory?: SubcategoryClass[] | CategoryElement;
  __value: string;
  __description: string;
  __uid: string;
  cr?: CRElement[] | CRElement;
  __deprecated?: string;
  __status?: Status;
  subcategory_xref?: SubcategoryXref;
  __variation?: string;
  specific?: TentacledSpecific[] | StickySpecific;
  extra?: JammerKind[] | JammerKind;
}

export interface TentacledSpecific {
  cr?: CRElement[] | CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __variation?: string;
  __footnote?: string;
  extra?: FluffyExtra[] | TentacledExtra;
  __status?: Status;
  __deprecated?: string;
  __transferred?: string;
  __retired?: string;
}

export interface FluffyExtra {
  cr?: CRElement[] | CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __status?: Status;
  __deprecated?: string;
}

export interface TentacledExtra {
  cr?: CRElement[] | CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __deprecated?: string;
}

export interface SubcategoryClass {
  cr?: CRElement[] | CRElement;
  specific?: SubcategoryClass[] | SubcategoryClass;
  __value: string;
  __description: string;
  __uid: string;
  __variation?: string;
  __deprecated?: string;
  __status?: Status;
  __footnote?: string;
  __retired?: string;
  extra?: PurpleExtra[] | PurpleExtra;
  __transferred?: string;
}

export interface PurpleExtra {
  cr?: CRElement[] | CRElement;
  __value: string;
  __description: string;
  __uid: string;
  __status?: Status;
  __variation?: string;
  __deprecated?: string;
}

export interface PurpleEntity {
  category: JammerKind[];
  __kind: string;
  __domain: string;
  __country: string;
  __uid: string;
}

export interface Field {
  datatype: DatatypeElement[] | PurpleDatatype;
  __name: string;
  cr?: CRElement;
}

export interface DatatypeElement {
  cr?: CRElement;
  __name: string;
  __type: Type;
}

export enum Type {
  The16BitUnsignedInteger = "16-bit unsigned integer",
  The8BitSignedInteger = "8-bit signed integer",
  The8BitSignedIntegerr = "8-bit signed integerr",
}

export interface PurpleDatatype {
  cr?: CRElement;
  __type: string;
}

export interface ObjectElement {
  cr: CRElement;
  category: JammerKind[] | JammerKind;
  __domain: string;
  __kind: string;
  __description: string;
  __uid: string;
}

export interface PurpleObject {
  cr: CRElement;
  category: JammerKind[];
  __domain: string;
  __kind: string;
  __description: string;
  __uid: string;
}

export interface Revision {
  cr?: CRElement[];
  cr_range: CRRangeElement[] | CRRangeElement;
  __title: string;
  __date: Date;
}

export interface CRRangeElement {
  __value_min: string;
  __value_max: string;
}

export interface Dict {
  cr: CRElement[];
  dictrow: Dictrow[];
  __uid: string;
  __name: string;
}

export interface Dictrow {
  __value: string;
  __description: string;
  cr?: CRElement[] | CRElement;
  __footnote?: string;
  __status?: Status;
}

export interface Enum {
  cr?: CRElement[] | CRElement;
  enumrow?: EnumrowElement[] | JammerKind;
  __uid: string;
  __name: string;
  __size: string;
  __applicability?: string;
  __footnote?: string;
  description?: Description[];
  enumrow_range?: EnumrowRangeElement[] | PurpleEnumrowRange;
  __group?: string;
  header?: Header;
  __deprecated?: string;
  __status?: Status;
}

export interface Description {
  cr: CRElement;
  "#text": string;
}

export interface EnumrowElement {
  __value: string;
  __description: string;
  cr?: CRElement[] | CRElement;
  __footnote?: string;
  __deprecated?: string;
  __xref?: string;
  __status?: Status;
  __group?: string;
  meta?: MetaElement[] | MetaElement;
}

export interface MetaElement {
  __key: Key;
  __value: string;
}

export enum Key {
  Commid = "commid",
  Email = "email",
  Natoid = "natoid",
  Org = "org",
  Poc = "poc",
  Type = "type",
}

export interface EnumrowRangeElement {
  __value_min: string;
  __value_max: string;
  __description: string;
}

export interface PurpleEnumrowRange {
  cr: CRElement;
  __value_min: string;
  __value_max: string;
  __description: string;
  __footnote: string;
}

export interface Header {
  col: Col[];
}

export interface Col {
  __key: Key;
  __name: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toSISOXMLTypes(json: string): SISOXMLTypes {
    return cast(JSON.parse(json), r("SISOXMLTypes"));
  }

  public static sISOXMLTypesToJson(value: SISOXMLTypes): string {
    return JSON.stringify(uncast(value, r("SISOXMLTypes")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = "", parent: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props")
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  SISOXMLTypes: o(
    [
      { json: "?xml", js: "?xml", typ: r("XML") },
      { json: "?xml-stylesheet", js: "?xml-stylesheet", typ: a(r("XMLStylesheet")) },
      { json: "ebv", js: "ebv", typ: r("Ebv") },
    ],
    false,
  ),
  XML: o(
    [
      { json: "__version", js: "__version", typ: "" },
      { json: "__encoding", js: "__encoding", typ: "" },
    ],
    false,
  ),
  XMLStylesheet: o(
    [
      { json: "__type", js: "__type", typ: "" },
      { json: "__href", js: "__href", typ: "" },
      { json: "__title", js: "__title", typ: "" },
      { json: "__alternate", js: "__alternate", typ: "" },
    ],
    false,
  ),
  Ebv: o(
    [
      { json: "copyright", js: "copyright", typ: "" },
      { json: "revisions", js: "revisions", typ: r("JammerTechnique") },
      { json: "dict", js: "dict", typ: r("Dict") },
      { json: "enum", js: "enum", typ: a(r("Enum")) },
      { json: "cet", js: "cet", typ: a(r("JammerTechnique")) },
      { json: "bitfield", js: "bitfield", typ: a(r("Bitfield")) },
      { json: "record", js: "record", typ: a(r("JammerTechnique")) },
      { json: "cot", js: "cot", typ: a(r("JammerTechnique")) },
      { json: "jammer_technique", js: "jammer_technique", typ: r("JammerTechnique") },
      { json: "__xmlns", js: "__xmlns", typ: "" },
      { json: "__xmlns:xsi", js: "__xmlns:xsi", typ: "" },
      { json: "__xsi:schemaLocation", js: "__xsi:schemaLocation", typ: "" },
      { json: "__title", js: "__title", typ: "" },
      { json: "__release", js: "__release", typ: "" },
      { json: "__date", js: "__date", typ: Date },
      { json: "__href", js: "__href", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__organisation", js: "__organisation", typ: "" },
    ],
    false,
  ),
  Bitfield: o(
    [
      { json: "bitfieldrow", js: "bitfieldrow", typ: u(undefined, u(a(r("BitfieldrowElement")), r("PurpleBitfieldrow"))) },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__name", js: "__name", typ: "" },
      { json: "__size", js: "__size", typ: "" },
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
    ],
    false,
  ),
  BitfieldrowElement: o(
    [
      { json: "cr", js: "cr", typ: u(a(r("CRElement")), r("CRElement")) },
      { json: "__name", js: "__name", typ: "" },
      { json: "__bit_position", js: "__bit_position", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__xref", js: "__xref", typ: u(undefined, "") },
      { json: "__length", js: "__length", typ: u(undefined, "") },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
    ],
    false,
  ),
  CRElement: o([{ json: "__value", js: "__value", typ: "" }], false),
  PurpleBitfieldrow: o(
    [
      { json: "cr", js: "cr", typ: r("CRElement") },
      { json: "__name", js: "__name", typ: "" },
      { json: "__bit_position", js: "__bit_position", typ: "" },
      { json: "__length", js: "__length", typ: u(undefined, "") },
      { json: "__description", js: "__description", typ: "" },
      { json: "__xref", js: "__xref", typ: u(undefined, "") },
    ],
    false,
  ),
  JammerTechnique: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "entity", js: "entity", typ: u(undefined, u(a(r("EntityElement")), r("PurpleEntity"))) },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__name", js: "__name", typ: "" },
      { json: "object", js: "object", typ: u(undefined, u(a(r("ObjectElement")), r("PurpleObject"))) },
      { json: "jammer_kind", js: "jammer_kind", typ: u(undefined, a(r("JammerKind"))) },
      { json: "field", js: "field", typ: u(undefined, a(r("Field"))) },
      { json: "revision", js: "revision", typ: u(undefined, a(r("Revision"))) },
    ],
    false,
  ),
  EntityElement: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "category", js: "category", typ: u(a(r("CategoryElement")), r("JammerKind")) },
      { json: "__kind", js: "__kind", typ: "" },
      { json: "__domain", js: "__domain", typ: "" },
      { json: "__country", js: "__country", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
    ],
    false,
  ),
  SubcategoryXref: o(
    [
      { json: "cr", js: "cr", typ: r("CRElement") },
      { json: "specific", js: "specific", typ: r("JammerKind") },
      { json: "__xref", js: "__xref", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
    ],
    false,
  ),
  StickySpecific: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "extra", js: "extra", typ: u(undefined, u(a(r("JammerKind")), r("JammerKind"))) },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
    ],
    false,
  ),
  FluffySpecific: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "extra", js: "extra", typ: u(undefined, a(r("JammerKind"))) },
    ],
    false,
  ),
  PurpleSpecific: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "extra", js: "extra", typ: u(undefined, u(a(r("JammerKind")), r("JammerKind"))) },
    ],
    false,
  ),
  PurpleSubcategory: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "specific", js: "specific", typ: u(undefined, u(a(r("PurpleSpecific")), r("FluffySpecific"))) },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
    ],
    false,
  ),
  SubcategoryElement: o(
    [
      { json: "specific", js: "specific", typ: u(undefined, u(a(r("SubcategoryClass")), r("CategoryElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
    ],
    false,
  ),
  JammerKind: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "subcategory", js: "subcategory", typ: u(undefined, u(a(r("SubcategoryElement")), r("PurpleSubcategory"))) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "jammer_category", js: "jammer_category", typ: u(undefined, u(a(r("JammerKind")), r("JammerKind"))) },
      { json: "jammer_subcategory", js: "jammer_subcategory", typ: u(undefined, u(a(r("JammerKind")), r("JammerKind"))) },
      { json: "jammer_specific", js: "jammer_specific", typ: u(undefined, u(a(r("JammerKind")), r("JammerKind"))) },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
    ],
    false,
  ),
  CategoryElement: o(
    [
      { json: "subcategory", js: "subcategory", typ: u(undefined, u(a(r("SubcategoryClass")), r("CategoryElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "subcategory_xref", js: "subcategory_xref", typ: u(undefined, r("SubcategoryXref")) },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "specific", js: "specific", typ: u(undefined, u(a(r("TentacledSpecific")), r("StickySpecific"))) },
      { json: "extra", js: "extra", typ: u(undefined, u(a(r("JammerKind")), r("JammerKind"))) },
    ],
    false,
  ),
  TentacledSpecific: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "extra", js: "extra", typ: u(undefined, u(a(r("FluffyExtra")), r("TentacledExtra"))) },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__transferred", js: "__transferred", typ: u(undefined, "") },
      { json: "__retired", js: "__retired", typ: u(undefined, "") },
    ],
    false,
  ),
  FluffyExtra: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
    ],
    false,
  ),
  TentacledExtra: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
    ],
    false,
  ),
  SubcategoryClass: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "specific", js: "specific", typ: u(undefined, u(a(r("SubcategoryClass")), r("SubcategoryClass"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "__retired", js: "__retired", typ: u(undefined, "") },
      { json: "extra", js: "extra", typ: u(undefined, u(a(r("PurpleExtra")), r("PurpleExtra"))) },
      { json: "__transferred", js: "__transferred", typ: u(undefined, "") },
    ],
    false,
  ),
  PurpleExtra: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__variation", js: "__variation", typ: u(undefined, "") },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
    ],
    false,
  ),
  PurpleEntity: o(
    [
      { json: "category", js: "category", typ: a(r("JammerKind")) },
      { json: "__kind", js: "__kind", typ: "" },
      { json: "__domain", js: "__domain", typ: "" },
      { json: "__country", js: "__country", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
    ],
    false,
  ),
  Field: o(
    [
      { json: "datatype", js: "datatype", typ: u(a(r("DatatypeElement")), r("PurpleDatatype")) },
      { json: "__name", js: "__name", typ: "" },
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
    ],
    false,
  ),
  DatatypeElement: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "__name", js: "__name", typ: "" },
      { json: "__type", js: "__type", typ: r("Type") },
    ],
    false,
  ),
  PurpleDatatype: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, r("CRElement")) },
      { json: "__type", js: "__type", typ: "" },
    ],
    false,
  ),
  ObjectElement: o(
    [
      { json: "cr", js: "cr", typ: r("CRElement") },
      { json: "category", js: "category", typ: u(a(r("JammerKind")), r("JammerKind")) },
      { json: "__domain", js: "__domain", typ: "" },
      { json: "__kind", js: "__kind", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
    ],
    false,
  ),
  PurpleObject: o(
    [
      { json: "cr", js: "cr", typ: r("CRElement") },
      { json: "category", js: "category", typ: a(r("JammerKind")) },
      { json: "__domain", js: "__domain", typ: "" },
      { json: "__kind", js: "__kind", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__uid", js: "__uid", typ: "" },
    ],
    false,
  ),
  Revision: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, a(r("CRElement"))) },
      { json: "cr_range", js: "cr_range", typ: u(a(r("CRRangeElement")), r("CRRangeElement")) },
      { json: "__title", js: "__title", typ: "" },
      { json: "__date", js: "__date", typ: Date },
    ],
    false,
  ),
  CRRangeElement: o(
    [
      { json: "__value_min", js: "__value_min", typ: "" },
      { json: "__value_max", js: "__value_max", typ: "" },
    ],
    false,
  ),
  Dict: o(
    [
      { json: "cr", js: "cr", typ: a(r("CRElement")) },
      { json: "dictrow", js: "dictrow", typ: a(r("Dictrow")) },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__name", js: "__name", typ: "" },
    ],
    false,
  ),
  Dictrow: o(
    [
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
    ],
    false,
  ),
  Enum: o(
    [
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "enumrow", js: "enumrow", typ: u(undefined, u(a(r("EnumrowElement")), r("JammerKind"))) },
      { json: "__uid", js: "__uid", typ: "" },
      { json: "__name", js: "__name", typ: "" },
      { json: "__size", js: "__size", typ: "" },
      { json: "__applicability", js: "__applicability", typ: u(undefined, "") },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "description", js: "description", typ: u(undefined, a(r("Description"))) },
      { json: "enumrow_range", js: "enumrow_range", typ: u(undefined, u(a(r("EnumrowRangeElement")), r("PurpleEnumrowRange"))) },
      { json: "__group", js: "__group", typ: u(undefined, "") },
      { json: "header", js: "header", typ: u(undefined, r("Header")) },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
    ],
    false,
  ),
  Description: o(
    [
      { json: "cr", js: "cr", typ: r("CRElement") },
      { json: "#text", js: "#text", typ: "" },
    ],
    false,
  ),
  EnumrowElement: o(
    [
      { json: "__value", js: "__value", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "cr", js: "cr", typ: u(undefined, u(a(r("CRElement")), r("CRElement"))) },
      { json: "__footnote", js: "__footnote", typ: u(undefined, "") },
      { json: "__deprecated", js: "__deprecated", typ: u(undefined, "") },
      { json: "__xref", js: "__xref", typ: u(undefined, "") },
      { json: "__status", js: "__status", typ: u(undefined, r("Status")) },
      { json: "__group", js: "__group", typ: u(undefined, "") },
      { json: "meta", js: "meta", typ: u(undefined, u(a(r("MetaElement")), r("MetaElement"))) },
    ],
    false,
  ),
  MetaElement: o(
    [
      { json: "__key", js: "__key", typ: r("Key") },
      { json: "__value", js: "__value", typ: "" },
    ],
    false,
  ),
  EnumrowRangeElement: o(
    [
      { json: "__value_min", js: "__value_min", typ: "" },
      { json: "__value_max", js: "__value_max", typ: "" },
      { json: "__description", js: "__description", typ: "" },
    ],
    false,
  ),
  PurpleEnumrowRange: o(
    [
      { json: "cr", js: "cr", typ: r("CRElement") },
      { json: "__value_min", js: "__value_min", typ: "" },
      { json: "__value_max", js: "__value_max", typ: "" },
      { json: "__description", js: "__description", typ: "" },
      { json: "__footnote", js: "__footnote", typ: "" },
    ],
    false,
  ),
  Header: o([{ json: "col", js: "col", typ: a(r("Col")) }], false),
  Col: o(
    [
      { json: "__key", js: "__key", typ: r("Key") },
      { json: "__name", js: "__name", typ: "" },
    ],
    false,
  ),
  Status: ["new"],
  Type: ["16-bit unsigned integer", "8-bit signed integer", "8-bit signed integerr"],
  Key: ["commid", "email", "natoid", "org", "poc", "type"],
};
