# SISO-REF-010 entity type enumerations library

**Experimental**

A JavaScript library for parsing SISO-REF-010 entity type enumerations data.

The SISO-REF-010 is a standard developed by the [Simulation Interoperability Standards
Organization (SISO)](https://www.sisostds.org/Home.aspx) and is widely used in distributed simulations such as HLA and DIS to provide Simulation Interoperability.

## Copyright notice

The [SISO-REF-010-2024](https://www.sisostandards.org/page/ReferenceDocuments) has a copyright © 2024 by the Simulation Interoperability Standards Organization, Inc.

## Usage

The workspace exists of three packages:

 - `lib`: The actual library containing the SISO enumerations and their descriptions
 - `parser`: A helper application that parses the SISO-REF-010.xml to a smaller JSON file to be used by the lib
 - `picker`: A GUI tool that provides an entity type picker and search functionality making use of the lib

To use SISO-REF-010 enums library in your project, follow these steps:

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

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
