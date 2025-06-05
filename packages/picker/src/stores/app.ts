import { defineStore } from "pinia";
import { size } from "lodash-es";
import { SisoEnums, SisoEnumsDataType } from "@siso-entity-type/lib";
import SISO_ENUMS_JSON_URL from "@siso-entity-type/lib/dist/siso-enums.json?url";

export const useAppStore = defineStore("app", {
  state: () => ({
    sisoEnums: {} as SisoEnums,
    searchResults: {} as Record<string, string>,
    allKinds: new Map<number, string>(),
    allDomains: new Map<number, string>(),
    allCountries: new Map<number, string>(),
    allCategories: new Map<number, string>(),
    allSubcategories: new Map<number, string>(),
    allSpecifics: new Map<number, string>(),
    allExtras: new Map<number, string>(),
    selectedKind: null as number | null,
    selectedDomain: null as number | null,
    selectedCountry: null as number | null,
    selectedCategory: null as number | null,
    selectedSubcategory: null as number | null,
    selectedSpecific: null as number | null,
    selectedExtra: null as number | null,
  }),
  getters: {
    kinds: (state) => [...state.allKinds.entries()].map(([value, title]) => ({ title, value })),
    domains: (state) => [...state.allDomains.entries()].map(([value, title]) => ({ title, value })),
    countries: (state) => [...state.allCountries.entries()].map(([value, title]) => ({ title, value })),
    categories: (state) => [...state.allCategories.entries()].map(([value, title]) => ({ title, value })),
    subcategories: (state) => [...state.allSubcategories.entries()].map(([value, title]) => ({ title, value })),
    specifics: (state) => [...state.allSpecifics.entries()].map(([value, title]) => ({ title, value })),
    extras: (state) => [...state.allExtras.entries()].map(([value, title]) => ({ title, value })),
    selectedEntityType: (state) =>
      `${state.selectedKind || 0}.${state.selectedDomain || 0}.${state.selectedCountry || 0}.${
        state.selectedCategory || 0
      }.${state.selectedSubcategory || 0}.${state.selectedSpecific || 0}.${state.selectedExtra || 0}`,
  },
  actions: {
    async init() {
      await this.parseSisoEnums();
      this.getCountries();
      this.getKinds();
    },
    async parseSisoEnums() {
      try {
        this.sisoEnums = new SisoEnums();
        const enumsResponse = await fetch(SISO_ENUMS_JSON_URL);
        const enumsMap = (await enumsResponse.json()) as SisoEnumsDataType;
        await this.sisoEnums.initialize(enumsMap);
        console.log(`Parsed SISO enums`);
      } catch (error) {
        console.error("Failed to parse SISO enums:", error);
      }
    },
    async search(query: string) {
      if (!query || query.length <= 2) {
        this.searchResults = {};
        return;
      }
      this.searchResults = this.sisoEnums.searchDescription(query);
      console.log(`${size(this.searchResults)} results for ${query}`);
    },
    async getKinds() {
      this.allKinds = this.sisoEnums.getAllKinds();
    },
    async getCountries() {
      this.allCountries = this.sisoEnums.getAllCountries();
    },
    resetCategories() {
      this.allCategories.clear();
      this.allSubcategories.clear();
      this.allSpecifics.clear();
      this.allExtras.clear();
      this.selectedCategory = 0;
      this.selectedSubcategory = 0;
      this.selectedSpecific = 0;
      this.selectedExtra = 0;
    },
    async selectCountry(country: number | null, keepKindAndDomain: boolean = true) {
      if (this.selectedCountry === country) return;
      this.selectedCountry = country;
      this.resetCategories();
      if (keepKindAndDomain && this.selectedKind != null && this.selectedKind > 0) {
        if ((this.selectedDomain ?? 0) > 0) {
          const domain = this.selectedDomain;
          await this.selectKind(this.selectedKind);
          await this.selectDomain(domain);
        } else {
          await this.selectKind(this.selectedKind);
        }
      } else {
        this.selectedKind = 0;
        this.selectedDomain = 0;
      }
    },
    async selectKind(kind: number | null) {
      if (this.selectedKind === kind && size(this.allDomains) > 0) return;
      this.selectedKind = kind;
      this.allDomains = this.sisoEnums.getAllDomainsOf(this.selectedKind ?? 0);
      this.resetCategories();
      this.selectedDomain = 0;
    },
    async selectDomain(domain: number | null) {
      if (this.selectedDomain === domain && size(this.allCategories) > 0) return;
      this.selectedDomain = domain;
      this.resetCategories();
      this.allCategories = this.sisoEnums.getAllCategoriesOf(this.selectedKind ?? 0, this.selectedDomain ?? 0, this.selectedCountry ?? 0);
      this.selectedCategory = 0;
    },
    async selectCategory(category: number | null) {
      if (this.selectedCategory === category && size(this.allSubcategories) > 0) return;
      this.selectedCategory = category;
      this.allSubcategories = this.sisoEnums.getAllSubcategoriesOf(
        this.selectedKind ?? 0,
        this.selectedDomain ?? 0,
        this.selectedCountry ?? 0,
        this.selectedCategory ?? 0,
      );
      this.selectedSubcategory = 0;
    },
    async selectSubcategory(subcategory: number | null) {
      if (this.selectedSubcategory === subcategory && size(this.allSpecifics) > 0) return;
      this.selectedSubcategory = subcategory;
      this.allSpecifics = this.sisoEnums.getAllSpecificsOf(
        this.selectedKind ?? 0,
        this.selectedDomain ?? 0,
        this.selectedCountry ?? 0,
        this.selectedCategory ?? 0,
        this.selectedSubcategory ?? 0,
      );
      this.selectedSpecific = 0;
    },
    async selectSpecific(specific: number | null) {
      if (this.selectedSpecific === specific && size(this.allExtras) > 0) return;
      this.selectedSpecific = specific;
      this.allExtras = this.sisoEnums.getAllExtrasOf(
        this.selectedKind ?? 0,
        this.selectedDomain ?? 0,
        this.selectedCountry ?? 0,
        this.selectedCategory ?? 0,
        this.selectedSubcategory ?? 0,
        this.selectedSpecific ?? 0,
      );
      this.selectedExtra = 0;
    },
    async selectExtra(extra: number | null) {
      if (this.selectedExtra === extra) return;
      this.selectedExtra = extra;
    },
  },
});
