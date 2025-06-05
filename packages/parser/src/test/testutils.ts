import { SisoEnumsFactory, SisoEnumsParser } from "../index.js";

export function loadSisoEnums(fileName = "/../data/SISO-REF-010.xml"): SisoEnumsParser {
  let enums = SisoEnumsFactory.createFromFile(fileName);
  return enums;
}
