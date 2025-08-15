import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Convert, SisoEnumsParser } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class SisoEnumsFactory {
  static createFromFile(filepath: string): SisoEnumsParser {
    let data = fs.readFileSync(__dirname + filepath, { encoding: "utf-8" });
    console.log(`Creating SisoEnumsFactory from file ${__dirname + filepath}`);
    return SisoEnumsFactory.createFromString(data.toString());
  }

  static createFromString(xmlString: string): SisoEnumsParser {
    let parser = new XMLParser({
      ignoreAttributes: ["uuid", "baseuuid"],
      attributeNamePrefix: "__",
      allowBooleanAttributes: true,
    });
    let jsonObj = parser.parse(xmlString);
    const sisoXmlTypes = Convert.toSISOXMLTypes(JSON.stringify(jsonObj));
    const sisoEnums = new SisoEnumsParser(sisoXmlTypes);
    if (!sisoEnums) {
      throw new TypeError("Invalid SISO enums file");
    }
    return sisoEnums;
  }

  static writeOutput(parser: SisoEnumsParser, outputFolder: string = "output"): void {
    parser.writeOutputFiles(outputFolder);
  }
}
