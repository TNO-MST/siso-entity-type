import { SisoEnumsFactory } from "../index.js";
import { existsSync, mkdirSync } from "fs";

export class Parser {
  constructor() {}

  parse(fileName = "/../data/SISO-REF-010.xml") {
    let enums = SisoEnumsFactory.createFromFile(fileName);
    let folder = "../lib/data";
    this.assertFolder(folder);
    SisoEnumsFactory.writeOutput(enums, folder);
  }

  assertFolder(folder) {
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
  }
}

new Parser().parse();
