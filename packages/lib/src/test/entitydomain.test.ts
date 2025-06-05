import { describe, it, expect } from "vitest";
import { createEntityDomainFromNumber, createEntityDomainFromString, EntityDomain } from "../index.js";

describe("EntityDomain enum", () => {
  it("is defined", () => {
    expect(EntityDomain).toBeDefined();
  });

  it("is created for valid numbers", () => {
    expect(createEntityDomainFromNumber(0)).toBe("Other");
    expect(createEntityDomainFromNumber(1)).toBe("Land");
    expect(createEntityDomainFromNumber(4)).toBe("Subsurface");
    expect(createEntityDomainFromNumber(5)).toBe("Space");
  });

  it("returns undefined for invalid numbers", () => {
    expect(createEntityDomainFromNumber(3.562)).toBeUndefined();
    expect(createEntityDomainFromNumber(10)).toBeUndefined();
    expect(createEntityDomainFromNumber(Number.MIN_SAFE_INTEGER)).toBeUndefined();
  });

  it("is created for valid names", () => {
    expect(createEntityDomainFromString("Air")).toBe(EntityDomain.Air);
    expect(createEntityDomainFromString("LAND")).toBe(EntityDomain.Land);
    expect(createEntityDomainFromString("space")).toBe(EntityDomain.Space);
  });

  it("returns undefined for invalid names", () => {
    expect(createEntityDomainFromString("Lava")).toBeUndefined();
    expect(createEntityDomainFromString("")).toBeUndefined();
  });
});
