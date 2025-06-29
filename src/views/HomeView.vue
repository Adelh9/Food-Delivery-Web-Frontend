<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from "vue-router";
import { storeToRefs } from 'pinia'
import { useDishStore } from '@/stores/dishes'
import router from '@/router'
import DishCard from '../components/DishCard.vue'
import Multiselect from '@vueform/multiselect';
import type { IDishRequest } from '@/api/types'
import type { LocationQueryRaw } from 'vue-router'

const route = useRoute()
let defaultParams = ref<IDishRequest>({
  page: route.query.page as string ?? 1,
})

type MultiselectRef = InstanceType<typeof Multiselect> & {
  select: (data: object | string) => void;
  clear: () => void;
  option: (o: any, g: any) => any;
}


const sortRef = ref<MultiselectRef | null>(null)
const categoriesRef = ref<MultiselectRef | null>(null)
const filterOptions: { [key: string]: string[] } = {
  categories: ['Wok', 'Pizza', 'Soup', 'Dessert', 'Drink'],
  sorting: ['NameAsc', 'NameDesc', 'PriceAsc', 'PriceDesc', 'RatingAsc', 'RatingDesc']
}

const store = useDishStore();
const { fetchDishes } = store;
const { dishes, loading } = storeToRefs(store)

async function onSubmit() {
  defaultParams.value.page = 1
  if (defaultParams.value.sorting === null) defaultParams.value.sorting = undefined
  router.push({
    path: '/', query: defaultParams.value as unknown as LocationQueryRaw
  })
}

const onChangePage = async () => {
  defaultParams.value.page = dishes.value.pagination.current
  if (defaultParams.value.sorting === null) defaultParams.value.sorting = undefined
  router.push({
    path: '/', query: defaultParams.value as unknown as LocationQueryRaw
  })
}

watch(
  () => route.query as unknown as IDishRequest,
  async (params: IDishRequest)=> {
    let paramArray: string[];
    if (params.sorting !== undefined) {
      sortRef.value!.select(`${params.sorting}`)
    } else if (sortRef.value!.modelValue !== null) {
      sortRef.value!.clear()
    }
    if (typeof (params.categories) === 'object') {
      paramArray = params.categories as string[]
      categoriesRef.value!.clear();
      paramArray.forEach((item) => categoriesRef.value!.select(`${item}`))
    } else if (typeof (params.categories) === 'string') {
      categoriesRef.value!.clear();
      categoriesRef.value!.select(`${params.categories}`)
    } else {
      categoriesRef.value!.clear();
    }
    await fetchDishes(params as unknown as IDishRequest);
  }
)

onMounted(async () => {
  await fetchDishes(defaultParams.value);
})
</script>

<template>
  <div class="container-sm shadow mb-5 pb-1">
    <div class="container-fluid my-2 p-2 border border-2">
      <form @submit.prevent="onSubmit" class="row d-flex align-items-center m-auto">
        <div class="col-sm-4">
          <Multiselect ref="categoriesRef" v-model="defaultParams.categories" mode="tags" placeholder="Categories"
            track-by="name" label="name" :close-on-select="false" :searchable="true" :options="filterOptions.categories"
            :max="4">
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div class="multiselect-tag" :class="{
                  'is-disabled': disabled
                }">
                {{ option.name }}
                <span v-if="!disabled" class="multiselect-tag-remove" @click="handleTagRemove(option, $event)">
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
          </Multiselect>
        </div>
        <div class="col-sm-3">
          <Multiselect ref="sortRef" v-model="defaultParams.sorting" placeholder="Sorting"
            :options="filterOptions.sorting" />
        </div>
        <div class="col-auto">
          <div class="form-check form-switch">
            <input v-model="defaultParams.vegetarian" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
              switch>
            <label class="form-check-label" for="flexSwitchCheckDefault">Show only vegeterian dishes</label>
          </div>
        </div>
        <div class="col-auto ms-auto">
          <button type="submit" class="btn btn-primary">Apply filters</button>
        </div>
      </form>
    </div>
    <div class="container px-0 mb-2">
      <div v-if="!loading">
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2">
          <div v-for="dish in dishes.dishes" v-bind:key="dish.id" class="col">
            <DishCard :dish="dish" />
          </div>
        </div>
        <Vue3BsPaginate class="my-2" :total="dishes.pagination.count" v-model="dishes.pagination.current" :perPage="1"
          :onChange="onChangePage" alignment="center" />
      </div>
      <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>