<template>
  <div class="filters">
    <div class="filterButton" :class="isActiveFilter(item.id)" v-for="(item) in state.categories" :key="item.id" :data-id="item.id" @click="onLabelClick">{{item.label}}</div>
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

        context.emit('onFilterClicked', elementID);
      };

      const isActiveFilter = (subCategoryID: string) => {
        console.log('probeer');
        return (state.activeFilters.indexOf(subCategoryID) === -1) ? '' : 'active';
      };

      return {
        state,
        onLabelClick,
        isActiveFilter
      };
    }
  };

</script>
