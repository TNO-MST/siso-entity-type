# SISO-REF-010 entity type enumerations library

**Experimental**

A JavaScript library for parsing SISO-REF-010 entity type enumerations data.

The SISO-REF-010 is a standard developed by the
[Simulation Interoperability Standards Organization (SISO)](https://www.sisostds.org/Home.aspx) and is widely used in distributed
simulations such as HLA and DIS to provide Simulation Interoperability.

An interactive picker-GUI is hosted on [https://tno-mst.github.io/siso-entity-type-picker/](https://tno-mst.github.io/siso-entity-type-picker/)

## Copyright notice

The [SISO-REF-010-2025](https://www.sisostandards.org/page/ReferenceDocuments) has a copyright © 2025 by the Simulation Interoperability
Standards Organization, Inc.

## Description

The workspace exists of three packages:

- [`lib`](packages/lib): The actual library containing the parsed SISO enumerations and their descriptions
- [`picker`](packages/picker): A GUI tool that provides an entity type picker and search functionality making use of the lib
- [`parser`](packages/parser): A helper application that parses the SISO-REF-010.xml to a smaller JSON file to be used by the lib

In most use-cases the `lib` package is all you need for generating and parsing Entity Type enumerations. Simply follow the usage
instructions of the [lib-package](packages/lib/README.md).

If you want to have a simple GUI that helps users to pick entity-types by listing all available kinds, domains, categories, etc., you can
use the [picker](packages/picker/README.md).

When you want to parse another xml document with enumerations that follows the same SISO-REF-010 xsd schema, e.g. an update or extension,
you can use the parser to generate a new `lib` package with the contents of the new enumerations. For this purpose, use the
[parser](packages/parser/README.md).

## Installation

To install the SISO-REF-010 enums library, follow these steps:

1. Install the workspace dependencies using pnpm:

   ```sh
   pnpm install
   ```

1. Install the workspace packages using pnpm:

   ```sh
   pnpm run ci
   ```

This will perform the following steps:

1. Generate types based on the `SISO-REF-010.xml` file.
2. Build the `lib` and `parser` packages of the workspace.
3. Parse the entity types and their descriptions from the xml file and write them to a JSON-file.
4. Build the `lib` again, making sure that the created JSON-file is included in the dist folder.
5. Build the `picker` application.

See the README of the respective packages for the instructions on how to use and develop them.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.
