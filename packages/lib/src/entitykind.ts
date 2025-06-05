export enum EntityKind {
  Other = 0,
  Platform = 1,
  Munition = 2,
  LifeForm = 3,
  Environmental = 4,
  CulturalFeature = 5,
  Supply = 6,
  Radio = 7,
  Expendable = 8,
  SensorEmitter = 9,
}

export const EntityKindDescriptions: Record<EntityKind, string> = {
  [EntityKind.Other]: "Other",
  [EntityKind.Platform]: "Platform",
  [EntityKind.Munition]: "Munition",
  [EntityKind.LifeForm]: "Life form",
  [EntityKind.Environmental]: "Environmental",
  [EntityKind.CulturalFeature]: "Cultural feature",
  [EntityKind.Supply]: "Supply",
  [EntityKind.Radio]: "Radio",
  [EntityKind.Expendable]: "Expendable",
  [EntityKind.SensorEmitter]: "Sensor/Emitter",
};

export function createEntityKindFromNumber(val: number): EntityKind | undefined {
  return Number.isFinite(val) && val >= 0 && val <= 9 ? EntityKind[val as unknown as keyof typeof EntityKind] : undefined;
}

export function getEntityKindDescription(kind: EntityKind): string {
  return EntityKindDescriptions[kind];
}

export function createEntityKindFromString(name: string): EntityKind | undefined {
  for (const [key, value] of Object.entries(EntityKindDescriptions)) {
    if (value.toLowerCase().replace(/[/ ]/g, "") === name.toLowerCase().replace(/[/ ]/g, "")) {
      return Number(key) as EntityKind;
    }
  }
  return undefined;
}
