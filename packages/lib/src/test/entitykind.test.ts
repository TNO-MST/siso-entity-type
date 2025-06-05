import { describe, it, expect } from "vitest";
import { createEntityKindFromNumber, createEntityKindFromString, EntityKind } from "../index.js";

describe("EntityKind enum", () => {
  it("is defined", () => {
    expect(EntityKind).toBeDefined();
  });

  it("is created for valid numbers", () => {
    expect(createEntityKindFromNumber(0)).toBe("Other");
    expect(createEntityKindFromNumber(1)).toBe("Platform");
    expect(createEntityKindFromNumber(9)).toBe("SensorEmitter");
  });

  it("returns undefined for invalid numbers", () => {
    expect(createEntityKindFromNumber(5.562)).toBeUndefined();
    expect(createEntityKindFromNumber(10)).toBeUndefined();
    expect(createEntityKindFromNumber(Number.MIN_SAFE_INTEGER)).toBeUndefined();
  });

  it("is created for valid names", () => {
    expect(createEntityKindFromString("Other")).toBe(EntityKind.Other);
    expect(createEntityKindFromString("PLATFORM")).toBe(EntityKind.Platform);
    expect(createEntityKindFromString("life form")).toBe(EntityKind.LifeForm);
    expect(createEntityKindFromString("sensoremitter")).toBe(EntityKind.SensorEmitter);
    expect(createEntityKindFromString("sensor/EMITTER")).toBe(EntityKind.SensorEmitter);
  });

  it("returns undefined for invalid names", () => {
    expect(createEntityKindFromString("Lava")).toBeUndefined();
    expect(createEntityKindFromString("")).toBeUndefined();
  });
});
