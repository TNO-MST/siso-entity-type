// readfile.mjs

import fs from "fs/promises";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import { fileURLToPath } from "url";
import process from "process";

// Needed to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs() {
  const args = process.argv.slice(2);
  let input = "";
  let output = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-i" && args[i + 1]) {
      input = args[i + 1];
      i++;
    } else if (args[i] === "-o" && args[i + 1]) {
      output = args[i + 1];
      i++;
    }
  }

  if (!input || !output) {
    console.error("Usage: node readfile.mjs -i input.xml -o output.json");
    process.exit(1);
  }

  return { input, output };
}

async function main() {
  const { input, output } = parseArgs();

  const inputPath = path.resolve(__dirname, input);
  const outputPath = path.resolve(__dirname, output);

  try {
    console.log(`Reading ${inputPath}`);
    const content = await fs.readFile(inputPath, "utf-8");
    const parser = new XMLParser({
      ignoreAttributes: ["uuid", "baseuuid"],
      attributeNamePrefix: "__",
      allowBooleanAttributes: true,
    });
    let jsonObj = parser.parse(content);
    await fs.writeFile(outputPath, JSON.stringify(jsonObj, null, 2), "utf-8");
    console.log(`Wrote from xml ${inputPath} to json ${outputPath}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
