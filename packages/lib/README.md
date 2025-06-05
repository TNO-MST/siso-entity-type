# SISO-REF-010 entity type enumerations library

**Experimental**

A JavaScript library for providing SISO-REF-010 entity type enumerations data.

## Usage

To use SISO-REF-010 enums library in your project, follow these steps:

1. Install the library using pnpm:

   ```sh
   pnpm install @siso-entity-type/lib
   ```

2. Import and use the library in your TypeScript or JavaScript code:

   ```typescript
   // Example usage in NodeJS
   import { SisoEnum, EntityKind } from "siso-entity-type-lib";
   const enumsData = fs.readFileSync("data/siso-enums.json").toString();
   const sisoEnums = new SisoEnums(JSON.parse(enumsMap));
   let country = sisoEnums.getCountry(153); // country = "The Netherlands (NLD)"
   let searchResults = sisoEnums.searchDescription("F803"); // searchResults = {"1.3.153.6.4.2.0":"Guided Missile Frigate (FFG) / De Zeven Provincien Class / F803 Tromp"}
   let categories = sisoEnums.getAllCategoriesOf(1, 4, 153).values(); // categories = ["Semi-Submersible Boats", "SS (Conventional Attack-Torpedo, Patrol)"]
   let domains = sisoEnums.getAllDomainsOf(EntityKind.Platform).values(); // domains = ["Other", "Land", "Air", ...]
   ```

   ```typescript
   // Example usage in browser (using vite)
   import { SisoEnums, SisoEnumsFactory, type SisoEnumsDataType } from "@siso-entity-type/lib";
   import SISO_ENUMS_JSON_URL from "@siso-entity-type/lib/data/siso-enums.json?url" with { type: "json" };
   const enumsResponse = await fetch(SISO_ENUMS_JSON_URL);
   enumsMap = (await enumsResponse.json()) as SisoEnumsDataType;
   const sisoEnums = new SisoEnums(enumsMap);
   let country = sisoEnums.getCountry(153); // country = "The Netherlands (NLD)"
   // Alternatively, when you want to make the loading async:
   // const sisoEnums = new SisoEnums();
   // await sisoEnums.initialize(sisoEnums);
   ```

## Development

SISO-entity-type-lib is developed in TypeScript. To contribute or modify the library, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/rinzeb/siso-entity-type.git
   cd siso-entity-type
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Build the project:

   ```sh
   pnpm run build
   ```

4. Run tests:
   ```sh
   pnpm run test
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
