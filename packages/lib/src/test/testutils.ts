import fs from "fs";

export function getSisoEnumsJson(fileName = "/../../data/siso-enums.json") {
  let enums = fs.readFileSync(fileName).toString();
  return JSON.parse(enums);
}
