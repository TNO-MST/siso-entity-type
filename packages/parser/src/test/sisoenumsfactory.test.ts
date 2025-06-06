import { describe, it, expect, beforeAll } from "vitest";
import { loadSisoEnums } from "./testutils.js";
import { SisoEnumsParser, SisoEnumsFactory } from "../index.js";
import { Utils } from "@siso-entity-type/lib";
import Long from "long";

describe("SisoEnumsParser class", () => {
  it("is defined", () => {
    expect(SisoEnumsParser).toBeDefined();
  });

  describe("loading SISO enums from XML", () => {
    let sisoEnums: ReturnType<typeof loadSisoEnums>;
    beforeAll(() => {
      sisoEnums = loadSisoEnums();
    });

    it("is successful", () => {
      expect(sisoEnums).toBeDefined();
    });

    describe("bitshifting", () => {
      it("has correct Long key for zero", () => {
        let key = Utils.createKey(0, 0, 0, 0, 0, 0, 0);
        expect(key).toEqual(Long.fromNumber(0));
      });
      it("has correct Long key for 1.1", () => {
        let key = Utils.createKey(1, 1, 0, 0, 0, 0, 0);
        expect(key).toEqual(Long.fromValue(0x0101000000000000));
      });
      it("has correct Long key for country", () => {
        let key = Utils.createKey(0, 0, 1, 0, 0, 0, 0);
        expect(key).toEqual(Long.fromValue(4294967296));
      });
      it("has correct Long key for platform", () => {
        let key = Utils.createKey(1, 2, 3, 0, 0, 0, 0);
        expect(Long.fromValue(key).shiftRight(56).toNumber()).toBe(1);
      });
      it("has correct Long key for domain", () => {
        let key = Utils.createKey(0, 2, 0, 0, 0, 0, 0);
        expect(Long.fromValue(key).shiftRight(48).toNumber()).toBe(2);
      });
    });

    describe("has correct countries", () => {
      it("amount of 279", () => {
        expect(sisoEnums.countryCount).toBe(279);
      });
      it("returns correct country Netherlands", () => {
        let key = Utils.createKey(0, 0, 153, 0, 0, 0, 0);
        expect(sisoEnums.getCountry(key)).toBe("Netherlands (NLD)");
      });
    });

    describe("has correct kinds", () => {
      it("amount of 10", () => {
        expect(sisoEnums.kindCount).toBe(10);
      });
      it("returns correct kind Platform", () => {
        let key = Utils.createKey(1, 0, 0, 0, 0, 0, 0);
        expect(sisoEnums.getKind(key)).toBe("Platform");
      });
    });

    describe("has correct domains", () => {
      it("amount of 68", () => {
        expect(sisoEnums.domainCount).toBe(68);
      });
      it("returns correct domain Land for 1.1.*", () => {
        let key = Utils.createKey(1, 1, 0, 0, 0, 0, 0);
        let domain = sisoEnums.getDomain(key);
        expect(domain).toBe("Land");
      });
    });

    describe("has correct extras", () => {
      it("MC-12W Liberty of USA", () => {
        let key = Utils.createKey(1, 2, 225, 7, 8, 7, 1);
        let cat = sisoEnums.getCategory(key);
        expect(cat).toBeDefined();
        expect(cat).toBe("Reconnaissance / Beechcraft Super King AIR 200/B200 / MC-12W Liberty / MC-12S EMARSS-S");
      });
    });
  });
});

describe("SisoEnumsFactory class", () => {
  it("is defined", () => {
    expect(SisoEnumsFactory).toBeDefined();
  });
});
