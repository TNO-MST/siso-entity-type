# SISO-REF-010 entity type enumerations parser

**Experimental**

A JavaScript library for parsing SISO-REF-010 entity type enumerations data.

## Usage

To use SISO-REF-010 enums parser, follow these steps:

1. Build the parser using pnpm:

   ```sh
   pnpm run build-parser
   ```

2. Add a new `SISO-REF-010.xml` file to the `packages/parser/data` folder.

3. Parse the new xml file:

   ```sh
   pnpm run parse-siso-xml
   ```

4. This will generate a new output JSON file in the `packages/lib/data` folder.

## Development

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
