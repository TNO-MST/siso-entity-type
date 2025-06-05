export enum EntityDomain {
  Other = 0,
  Land = 1,
  Air = 2,
  Surface = 3,
  Subsurface = 4,
  Space = 5,
}

export const EntityDomainDescriptions: Record<EntityDomain, string> = {
  [EntityDomain.Other]: "Other",
  [EntityDomain.Land]: "Land",
  [EntityDomain.Air]: "Air",
  [EntityDomain.Surface]: "Surface",
  [EntityDomain.Subsurface]: "Subsurface",
  [EntityDomain.Space]: "Space",
};

export function createEntityDomainFromNumber(val: number): EntityDomain | undefined {
  return Number.isFinite(val) && val >= 0 && val <= Object.keys(EntityDomainDescriptions).length
    ? EntityDomain[val as unknown as keyof typeof EntityDomain]
    : undefined;
}

export function getEntityDomainDescription(domain: EntityDomain): string {
  return EntityDomainDescriptions[domain];
}

export function createEntityDomainFromString(name: string): EntityDomain | undefined {
  for (const [key, value] of Object.entries(EntityDomainDescriptions)) {
    if (value.toLowerCase() === name.toLowerCase()) {
      return Number(key) as EntityDomain;
    }
  }
  return undefined;
}
