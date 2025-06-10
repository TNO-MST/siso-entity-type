<template>
  <v-container class="fill-height flex-column align-stretch">
    <v-row no-gutters class="max-header-height">
      <v-col cols="6">
        <h4 class="text-h4 font-weight-bold">SISO Entity Types</h4>
      </v-col>
    </v-row>
    <!-- <v-responsive width="100%"></v-responsive> -->
    <v-divider></v-divider>
    <v-row no-gutters>
      <div class="text-h5 font-weight-bold pt-2">🔍 Enter entity-type ID</div>
      <v-col cols="12" lg="12">
        <v-row no-gutters class="pr-4 align-center">
          <v-col cols="9">
            <v-text-field
              v-model="typeQuery"
              :rules="typeQueryRules"
              label="Input entity type"
              prepend-inner-icon="mdi-magnify"
              clearable
              hint="kind.domain.country.category.subcategory.specific.extra"
              persistent-hint
              density="comfortable"
              @keydown.enter="enterType"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="pl-4">
            <v-btn class="justify-center text-h5 font-weight-light" @click="enterType"> Enter </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <div class="text-h5 font-weight-bold pt-2">🛠️ Build</div>
      <v-col cols="12" lg="12">
        <v-row no-gutters class="pr-4 pb-2">
          <v-col cols="9">
            <v-row no-gutters class="pb-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localCountry"
                  @update:modelValue="updateCountry"
                  :items="countries"
                  label="Select country"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters class="py-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localKind"
                  @update:modelValue="updateKind"
                  :items="kinds"
                  label="Select kind"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters class="py-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localDomain"
                  @update:modelValue="updateDomain"
                  :items="domains"
                  label="Select domain"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters class="py-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localCategory"
                  @update:modelValue="updateCategory"
                  :items="categories"
                  label="Select category"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters class="py-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localSubcategory"
                  @update:modelValue="updateSubcategory"
                  :items="subcategories"
                  label="Select subcategory"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters class="py-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localSpecific"
                  @update:modelValue="updateSpecific"
                  :items="specifics"
                  label="Select specific"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters class="py-2">
              <v-col cols="12">
                <v-autocomplete
                  clearable
                  hide-details
                  v-model="localExtra"
                  @update:modelValue="updateExtra"
                  :items="extras"
                  label="Select extra"
                  outlined
                  density="comfortable"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3" class="pl-4">
            <v-row no-gutters>
              <v-col cols="10">
                <v-text-field class="justify-center text-h5 font-weight-light fill-height" disabled>
                  Output:
                  <span class="font-weight-bold pl-1">{{ selectedEntityType }}</span>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <span class="font-weight-bold pl-1">
                  <v-btn @click="copyTextToClipboard" icon="mdi-content-copy" :loading="copying">
                    <template v-slot:loader>
                      <v-progress-circular indeterminate></v-progress-circular>
                    </template> </v-btn
                ></span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-divider class="pb-2"></v-divider>
      <div class="text-h5 font-weight-bold">🔍 Search by description</div>
      <v-col cols="12" lg="12">
        <v-row no-gutters class="pr-4">
          <v-col cols="9">
            <v-text-field
              v-model="query"
              :rules="queryRules"
              label="Search description"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="pl-4">
            <v-text-field class="justify-center text-h5 font-weight-light fill-height" disabled>
              Search results:
              <span class="font-weight-bold pl-1">{{ searchResultsCount }}</span>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pt-2 pr-4 full-width">
          <v-card class="overflow-y-auto full-width" max-height="400">
            <v-card-text class="white-space-pre pa-0">
              <v-data-table-virtual
                :headers="headers"
                :items="searchResultsList"
                density="compact"
                item-key="name"
                @click:row="handleClick"
              ></v-data-table-virtual>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { size, debounce } from "lodash-es";
import type { DataTableHeader } from "vuetify";

const store = useAppStore();
const {
  countries,
  kinds,
  domains,
  categories,
  subcategories,
  specifics,
  extras,
  selectedEntityType,
  searchResults,
  selectedCountry,
  selectedKind,
  selectedDomain,
  selectedCategory,
  selectedSubcategory,
  selectedSpecific,
  selectedExtra,
} = storeToRefs(store);

const localCountry: Ref<number | null> = ref(null);
const localKind: Ref<number | null> = ref(null);
const localDomain: Ref<number | null> = ref(null);
const localCategory: Ref<number | null> = ref(null);
const localSubcategory: Ref<number | null> = ref(null);
const localSpecific: Ref<number | null> = ref(null);
const localExtra: Ref<number | null> = ref(null);

const copying = ref(false);
const query = ref("");
const typeQuery = ref("");
const headers: DataTableHeader[] = [
  { title: "Entity type", align: "start", sortable: false, key: "entType" },
  { title: "Description", align: "start", sortable: false, key: "descr" },
];

const searchResultsList = computed(() => Object.entries(searchResults.value).map((entr) => ({ entType: entr[0], descr: entr[1] })));
const searchResultsCount = computed(() => size(searchResults.value));

watch(selectedCountry, (newVal: number | null) => (localCountry.value = localCountry.value !== newVal ? newVal : localCountry.value));
watch(selectedKind, (newVal: number | null) => (localKind.value = localKind.value !== newVal ? newVal : localKind.value));
watch(selectedDomain, (newVal: number | null) => (localDomain.value = localDomain.value !== newVal ? newVal : localDomain.value));
watch(selectedCategory, (newVal: number | null) => (localCategory.value = localCategory.value !== newVal ? newVal : localCategory.value));
watch(
  selectedSubcategory,
  (newVal: number | null) => (localSubcategory.value = localSubcategory.value !== newVal ? newVal : localSubcategory.value),
);
watch(selectedSpecific, (newVal: number | null) => (localSpecific.value = localSpecific.value !== newVal ? newVal : localSpecific.value));
watch(selectedExtra, (newVal: number | null) => (localExtra.value = localExtra.value !== newVal ? newVal : localExtra.value));
watch(query, (newVal: string) => queryUpdated());

const updateCountry = async () => store.selectCountry(localCountry.value);
const updateKind = async () => store.selectKind(localKind.value);
const updateDomain = async () => {
  store.selectDomain(localDomain.value);
  localCategory.value = null;
  updateCategory();
};
const updateCategory = async () => {
  store.selectCategory(localCategory.value);
  localSubcategory.value = null;
  updateSubcategory();
};
const updateSubcategory = async () => {
  store.selectSubcategory(localSubcategory.value);
  localSpecific.value = null;
  updateSpecific();
};
const updateSpecific = async () => {
  store.selectSpecific(localSpecific.value);
  localExtra.value = null;
  updateExtra();
};
const updateExtra = async () => {
  store.selectExtra(localExtra.value);
};

const handleClick = async (evt: any, row: any) => {
  const { entType, descr } = row.item;
  console.log(`${entType}  ${descr} `);
  store.resetCategories();
  await populateBuilder(entType);
};

const populateBuilder = async (entType: string) => {
  const parts = entType.split(".").map((s) => +s);
  if (parts.length < 7) return console.warn(`Could not populate entitytype: ${entType}`);
  await store.selectCountry(parts[2]!, false);
  await store.selectKind(parts[0]!);
  await store.selectDomain(parts[1]!);
  await store.selectCategory(parts[3]!);
  await store.selectSubcategory(parts[4]!);
  await store.selectSpecific(parts[5]!);
  await store.selectExtra(parts[6]!);
};

const enterType = async (evt: any) => {
  console.log(`Enter ${typeQuery.value}`);
  store.resetCategories();
  await populateBuilder(typeQuery.value);
};

const copyTextToClipboard = () => {
  copying.value = true;
  const text = selectedEntityType.value;
  navigator.clipboard.writeText(text).then(() => {
    console.log(`Copied ${text} to clipboard`);
    setTimeout(() => {
      copying.value = false;
    }, 300);
  });
};

const _queryUpdated = () => {
  store.search(query.value);
};

const queryUpdated = debounce(_queryUpdated, 400);

const queryRules = [
  (val: any) => {
    if (val?.length > 2) return true;
    return "Query must be at least 3 characters.";
  },
];

const typeQueryRules = [
  (val: any) => {
    if (val?.length > 2 && val?.includes(".")) return true;
    return "Query must be at least 3 characters, seperated by a dot `.`";
  },
];

onMounted(() => {
  console.log(`Mounted MainPage`);
  store.init();
});
</script>

<style>
.builder-width {
  max-width: 580px;
}

.white-space-pre {
  white-space: pre;
}

.full-width {
  width: 100%;
}

.max-header-height {
  max-height: 80px;
}
</style>
