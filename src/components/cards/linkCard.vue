<template>
  <div class="linkCard">
    <div>
      <small class="linkCard__label">{{getCategoryLabel(state.itemData.subCategory)}}</small>
      <small class="linkCard__label linkCard__label--daily" v-if="state.itemData.daily">dagelijks</small>
    </div>
    <h3 class="linkCard__title">{{state.itemData.title}}</h3>
    <p class="linkCard__description">{{state.itemData.description}}</p>
    <a class="linkCard__link" :href="state.itemData.url" target="_blank">{{state.itemData.url}}</a>
    <div class="linkCard__date">{{getReadableDate(state.itemData.added.toDate())}}</div>
  </div>
</template>


<script lang="ts">
  // Core
  import { reactive } from '@vue/composition-api';

  // Helpers
  import { readableDate, readableTime } from '@/helpers/dateHelper';

  export default {
    name: 'linkCard',
    props: {
      data: Object
    },
    setup (props: any, context: any) {
      const state = reactive({
        itemData: props.data
      });

      const getCategoryLabel = (subCategoryID: string): string => {
        const parentCategories = context.root.$store.getters.getParentCategories;
        const category = parentCategories.find((item: any) => item.id === subCategoryID);
        return category.label;
      };

      const getReadableDate = (date: Date, longNames: boolean = false) => {
        console.log(date);
        return readableDate(date, longNames);
      };

      return {
        state,
        getCategoryLabel,
        getReadableDate
      };
    }
  };

</script>
