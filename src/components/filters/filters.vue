<template>
  <div class="filters">
    <div class="buttonWrappers">
      <div class="sortWrapper">
        <select @change="onSortSelectChanged">
          <option value="none">Sorteer</option>
          <option value="newest">Nieuwste bovenaan</option>
          <option value="category">Sorteer per categorie</option>
        </select>
      </div>
      <div class="filterTrigger">
        <div class="filterButton filterButton--trigger" @click="openOnMobile">Toon categorieën</div>
      </div>
    </div>
    <div class="filterButtonWrapper" :class="{open: state.filtersOpen}">
      <div class="filterButton" :class="isActiveFilter(item.id)" v-for="(item) in state.categories" :key="item.id" :data-id="item.id" @click="onLabelClick">{{item.label}}</div>
    </div>
  </div>
</template>

<script lang="ts">

  import { reactive, computed } from '@vue/composition-api';

  export default {
    name: 'filters',
    props: {
      data: Array
    },
    setup (props: any, context: any) {
      const state = reactive({
        categories: props.data,
        filtersOpen: false,
        activeFilters: [] as any
      });


      const onLabelClick = (e: {target: HTMLElement}) => {

        const elementID = e.target.dataset.id;
        const index = state.activeFilters.indexOf(elementID);

        if (index !== -1) {
          state.activeFilters.splice(index, 1);
        } else {
          state.activeFilters.push(elementID);
        }

        context.emit('onFilterClicked', state.activeFilters);
      };

      const isActiveFilter = (subCategoryID: string) => {
        return (state.activeFilters.indexOf(subCategoryID) === -1) ? '' : 'active';
      };

      const onSortSelectChanged = (e: {target: HTMLInputElement}) => {
        context.emit('onSortChanged', e.target.value);
      };

      const openOnMobile = () => {
        state.filtersOpen = !state.filtersOpen;
      };

      return {
        state,
        onLabelClick,
        isActiveFilter,
        onSortSelectChanged,
        openOnMobile
      };
    }
  };

</script>
