import { describe, it, expect, beforeAll } from "vitest";
import {
  createEntityDomainFromNumber,
  createEntityKindFromNumber,
  EntityDomain,
  EntityKind,
  SisoEnum,
  SisoEnums,
  Utils,
} from "../index.js";
import fs from "fs";
import Long from "long";

describe("SisoEnums class", () => {
  it("is defined", () => {
    expect(SisoEnums).toBeDefined();
  });

  describe("loading SISO enums from XML", () => {
    let sisoEnums: SisoEnums;
    beforeAll(async () => {
      sisoEnums = new SisoEnums();
      const enumsData = fs.readFileSync("data/siso-enums.json").toString();
      await sisoEnums.initialize(JSON.parse(enumsData));
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
        expect(sisoEnums.getAllCountries().size).toBe(279);
      });
      it("returns correct country Afghanistan", () => {
        let country = sisoEnums.getCountryName(1);
        expect(country).toBe("Afghanistan (AFG)");
      });
      it("returns correct country Netherlands", () => {
        let country = sisoEnums.getCountryName(153);
        expect(country).toBe("Netherlands (NLD)");
      });
    });

    describe("has correct kinds", () => {
      it("amount of 10", () => {
        expect(sisoEnums.getAllKinds().size).toBe(10);
      });
      it("returns correct kind Platform", () => {
        let kind = sisoEnums.getAllKinds().get(1);
        expect(kind).toBe("Platform");
      });
      it("returns correct kind Platform for 1.1.*", () => {
        let key = Utils.createKey(1, 1, 0, 0, 0, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.getKind()).toBe(createEntityKindFromNumber(EntityKind.Platform));
        expect(sisoEnums.getKindName(entity)).toBe("Platform");
      });
      it("returns correct kind Other", () => {
        let kind = sisoEnums.getAllKinds().get(0);
        expect(kind).toBe("Other");
      });
    });

    describe("has correct domains", () => {
      it("amount of 68", () => {
        expect(sisoEnums.getAllDomains().size).toBe(68);
      });
      it("returns correct domain Land for 1", () => {
        let domain = sisoEnums.getAllDomainsOf(1).get(1);
        expect(domain).toBe(createEntityDomainFromNumber(EntityDomain.Land));
      });
      it("returns correct domain Land for 1.1.*", () => {
        let key = Utils.createKey(1, 1, 0, 0, 0, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.getDomain()).toBe(createEntityDomainFromNumber(EntityDomain.Land));
        expect(sisoEnums.getDomainName(entity)).toBe("Land");
      });
      it("domains for Platform", () => {
        expect(sisoEnums.getAllDomainsOf(1).size).toBe(6);
        expect(sisoEnums.getAllDomainsOf(EntityKind.Platform).values()).toContain("Land");
        expect(sisoEnums.getAllDomainsOf(1).values()).toContain("Air");
        expect(sisoEnums.getAllDomainsOf(1).values()).toContain("Surface");
        expect(sisoEnums.getAllDomainsOf(1).values()).toContain("Subsurface");
        expect(sisoEnums.getAllDomainsOf(1).values()).toContain("Space");
        expect(sisoEnums.getAllDomainsOf(1).values()).toContain("Other");
      });
    });

    describe("has correct categories", () => {
      it("subsurface platforms for Netherlands", () => {
        expect(sisoEnums.getAllCategoriesOf(1, 4, 153).size).toBe(2);
        expect(sisoEnums.getAllCategoriesOf(EntityKind.Platform, EntityDomain.Subsurface, 153).values()).toContain(
          "Semi-Submersible Boats",
        );
        expect(sisoEnums.getAllCategoriesOf(1, 4, 153).values()).toContain("SS (Conventional Attack-Torpedo, Patrol)");
      });
      it("surface environmental for Other", () => {
        expect(sisoEnums.getAllCategoriesOf(4, 3, 0).size).toBe(10);
        expect(sisoEnums.getAllCategoriesOf(EntityKind.Environmental, 3, 0).values()).toContain("Island");
        expect(sisoEnums.getAllCategoriesOf(4, 3, 0).values()).toContain("Sea State");
      });
      it("returns correct category Building for 5.1.0.2.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 0, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.category).toBe(2);
        expect(sisoEnums.getCategoryName(entity)).toBe("Building");
      });

      it("returns correct category Building for 5.1.0.2.1.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 1, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.category).toBe(2);
        expect(sisoEnums.getCategoryName(entity)).toBe("Building");
      });
    });

    describe("has correct subcategories", () => {
      it("SS subcategories for Netherlands", () => {
        let subcats = Array.from(sisoEnums.getAllSubcategoriesOf(1, 4, 153, 5).values());
        expect(subcats.length).toBe(2);
        expect(subcats.some((v) => v.includes("Hai Lung Class"))).toBeTruthy();
        expect(subcats.some((v) => v.includes("Walrus Class"))).toBeTruthy();
      });
      it("types of Aircraft Wreckage", () => {
        let subcats = Array.from(sisoEnums.getAllSubcategoriesOf(5, 1, 0, 31).values());
        expect(subcats.length).toBe(2);
        expect(subcats.some((v) => v.includes("Fixed Wing"))).toBeTruthy();
        expect(subcats.some((v) => v.includes("Rotary Wing"))).toBeTruthy();
      });
      it("returns correct Subcategory Building, Other for 5.1.0.2.0.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 0, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.subcategory).toBe(0);
        expect(sisoEnums.getSubcategoryName(entity)).toBe("Building, Other");
      });
      it("returns correct Subcategory One-story for 5.1.0.2.1.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 1, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.subcategory).toBe(1);
        expect(sisoEnums.getSubcategoryName(entity)).toBe("One-story");
      });
      it("returns correct Subcategory One-story for 5.1.0.2.1.1.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 1, 1, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.subcategory).toBe(1);
        expect(sisoEnums.getSubcategoryName(entity)).toBe("One-story");
      });
    });

    describe("has correct specifics", () => {
      it("Agusta Westland AW129 Mangusta of Italia", () => {
        let specifics = Array.from(sisoEnums.getAllSpecificsOf(1, 2, 106, 20, 2).values());
        expect(specifics.length).toBe(4);
        expect(specifics.some((v) => v.includes("AH-129A Mangusta"))).toBeTruthy();
        expect(specifics.some((v) => v.includes("AH-129C Mangusta"))).toBeTruthy();
        expect(specifics.some((v) => v.includes("AH-129D Mangusta"))).toBeTruthy();
      });
      it("returns correct Specific Building, Other for 5.1.0.2.0.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 0, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.specific).toBe(0);
        expect(sisoEnums.getSpecificName(entity)).toBe("Building, Other");
      });
      it("returns correct Specific One-story for 5.1.0.2.1.0.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 1, 0, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.specific).toBe(0);
        expect(sisoEnums.getSpecificName(entity)).toBe("One-story");
      });
      it("returns correct Specific One-story for 5.1.0.2.1.1.*", () => {
        let key = Utils.createKey(5, 1, 0, 2, 1, 1, 0);
        const entity = SisoEnum.fromKey(key);
        expect(entity.specific).toBe(1);
        expect(sisoEnums.getSpecificName(entity)).toBe("Trapezoidal Aircraft Shelter (Trihangar)");
      });
    });

    describe("has correct extras", () => {
      it("MC-12W Liberty of USA", () => {
        let extras = Array.from(sisoEnums.getAllExtrasOf(1, 2, 225, 7, 8, 7).values());
        expect(extras.length).toBe(5);
        expect(extras.some((v) => v.includes("MC-12S EMARSS-S"))).toBeTruthy();
        expect(extras.some((v) => v.includes("MC-12S-1 EMARSS-G"))).toBeTruthy();
        expect(extras.some((v) => v.includes("MC-12S-2 EMARSS-M"))).toBeTruthy();
        expect(extras.some((v) => v.includes("MC-12S-3 EMARSS-V"))).toBeTruthy();
      });
      it("returns correct Extra Impact Fuse for 2.9.225.2.75.2.1", () => {
        let key = Utils.createKey(2, 9, 225, 2, 75, 2, 1);
        const entity = SisoEnum.fromKey(key);
        expect(entity.extra).toBe(1);
        expect(sisoEnums.getExtraName(entity)).toBe("Impact fuse");
      });
    });

    describe("is searchable", () => {
      it("finds MC-12S-1 EMARSS-G of USA", () => {
        let results = sisoEnums.searchDescription("MC-12S-1 EMARSS-G");
        expect(Object.keys(results).length).toBe(1);
        expect(Object.values(results).some((v) => v.includes("MC-12S-1 EMARSS-G"))).toBeTruthy();
      });
      it("finds F803 Tromp", () => {
        let results = sisoEnums.searchDescription("F803 Tromp");
        expect(Object.keys(results).length).toBe(1);
        expect(Object.values(results).some((v) => v.includes("F803 Tromp"))).toBeTruthy();
        expect(Object.keys(results).pop()).toBe("1.3.153.6.4.2.0");
      });
    });

    describe("provides correct descriptions", () => {
      it("for 2.9.225.2.75.2.1", () => {
        let key = Utils.createKey(2, 9, 225, 2, 75, 2, 1);
        const entity = SisoEnum.fromKey(key);
        expect(sisoEnums.getDescriptionOf(entity, true)).toEqual("Ballistic / Mk-84 / MK-84 Low Drag General Purpose / Impact fuse");
        expect(sisoEnums.getDescriptionOf(entity, false)).toEqual("Impact fuse");
      });
      it("for 2.9.225.2.75.2.0", () => {
        let key = Utils.createKey(2, 9, 225, 2, 75, 2, 0);
        const entity = SisoEnum.fromKey(key);
        expect(sisoEnums.getDescriptionOf(entity, true)).toEqual("Ballistic / Mk-84 / MK-84 Low Drag General Purpose");
        expect(sisoEnums.getDescriptionOf(entity, false)).toEqual("MK-84 Low Drag General Purpose");
      });
      it("except when not defined 2.9.225.2.75.88.0", () => {
        let key = Utils.createKey(2, 9, 225, 2, 75, 88, 0);
        const entity = SisoEnum.fromKey(key);
        expect(sisoEnums.getDescriptionOf(entity, true)).toEqual("Ballistic / Mk-84 / Invalid specific 88 / Invalid extra 0");
        expect(sisoEnums.getDescriptionOf(entity, false)).toEqual("Mk-84");
      });
    });

    describe("SisoEnum", () => {
      it("construct from string", () => {
        let enum1 = SisoEnum.fromString("1.2.13.1.1.2.0");
        expect(enum1).toBeDefined();
        expect(enum1.domain).toBe(EntityDomain.Air);
        expect(enum1.kind).toBe(EntityKind.Platform);
        expect(enum1.country).toEqual(13);
        expect(enum1.category).toEqual(1);
        expect(enum1.subcategory).toEqual(1);
        expect(enum1.specific).toEqual(2);
        expect(enum1.extra).toEqual(0);
        expect(sisoEnums.getDescriptionOf(enum1)).toEqual("F/A-18B");
        expect(sisoEnums.getDescriptionOf(enum1, true)).toEqual("Fighter/Air Defense / McDonnell-Douglas F/A-18 Hornet / F/A-18B");
      });
    });
  });
});
