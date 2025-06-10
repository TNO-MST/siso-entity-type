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

## API

The library uses [long.js](https://github.com/dcodeIO/long.js) to generate a 64-bit key for each entitytype, in the format of
`kind-domain-country-category-subcategory-specific-extra`, where all fields are 8-bit except for country which is 16-bit. This provides an
efficient way of storing the enum data. For general usage of the library the keys are not needed, however.

### SisoEnum class

The `SisoEnum` class represents an EntityType, with all parts like kind, domain, country, etc. represented as a number. Additionally, helper
functions to convert it to and from String and Long key.

```typescript
kind: number; // High-level classification (e.g., Platform, Munition)
domain: number; // Operational domain (e.g., Land, Air, Sea)
country: number; // Country code
category: number; // Specific category within the domain
subcategory: number; // Subcategory
specific: number; // Specific type
extra: number; // Extra detail
getKind(): EntityKind | undefined;
getDomain(): EntityDomain | undefined;
toString(): string; // To enum string '#.#.#.#.#.#.#'
toKey(): Long; // To 64-bit key
static fromString(enumString: string, separator: string = "."): SisoEnum;
static fromKey(key: Long): SisoEnum;
```

### SisoEnums class

The `SisoEnums` class is the main entrypoint for the most commonly-used entity-type operations. It needs to be initialized with an object of
type `SisoEnumsDataType`. Typically, the `@siso-entity-type/lib/data/siso-enums.json` file that is provided with the library is used.

```typescript
    initialize(enumsMap: SisoEnumsDataType): Promise<void>;
    // Collections
    getAllCountries(): Map<number, string>;
    getAllDomains(): Map<number, string>;
    getAllKinds(): Map<number, string>;
    getAllDomainsOf(kind: number): Map<number, string>;
    // Descriptions
    getDescriptionOf(sisoEnum: SisoEnum, fullyQualified: boolean = false): string
    getCountryName(countryOrEntity: SisoEnum | number): string;
    getKindName(kindOrEntity: SisoEnum | number): string;
    getDomainName(ent: SisoEnum): string;
    getCategoryName(ent: SisoEnum): string;
    getSubcategoryName(ent: SisoEnum): string;
    getSpecificName(ent: SisoEnum): string;
    getExtraName(ent: SisoEnum): string;
    // Partial collections
    getAllCategoriesOf(kind: number, domain: number, country: number): Map<number, string>;
    getAllSubcategoriesOf(kind: number, domain: number, country: number, category: number): Map<number, string>;
    getAllSpecificsOf(kind: number, domain: number, country: number, category: number, subcategory: number): Map<number, string>;
    getAllExtrasOf(kind: number, domain: number, country: number, cat: number, subcat: number, specific: number): Map<number, string>;
    searchDescription(query: string): Record<string, string>;
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

## FAQ

#### The SISO enums json file is quite large, how can I reduce its size?

The JSON file that is bundled with the library is ~2MB large. When using `vite` and a modern webserver for hosting your production code,
compression can be used to reduce this size to ~370kB. This can be achieved as follows:

1. Compress the JSON-file when building your application for production:

```typescript
// vite.config.mts
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
export default defineConfig({
  assetsInclude: ["**/*.json"],
  plugins: [
    compression({
      include: "**/*.json",
      algorithms: ["gzip", "brotliCompress"],
    }),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  ...
});
// OUTPUT: dist/assets/siso-enums-CuTbCo3s.json                    2,069.73 kB │ gzip: 369.52 kB
```

This will generate a _.json, _.json.gz and \*.json.br in your assets folder.

1. Server the `dist` folder using any modern webserver with the option to enable compression, e.g.
   [http-server](https://www.npmjs.com/package/http-server).

```sh
npx http-server ./packages/picker/dist/ --brotli
```

In this way, only 370kB will be transferred from the server to the client application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
