<template>
  <div class="">
    <div>
      <small class="linkCard__label">{{getCategoryLabel(state.itemData)}}</small>
      <small class="linkCard__label linkCard__label--daily" v-if="state.itemData.daily">dagelijks {{state.itemData.dailyAt}}</small>
    </div>
    <h3 class="linkCard__title"><a :href="state.itemData.url" target="_blank">{{state.itemData.title}}</a></h3>
    <p class="linkCard__author">{{state.itemData.author}}</p>
    <p class="linkCard__description">{{state.itemData.description}}</p>
    <a class="linkCard__link" :href="state.itemData.url" target="_blank">{{state.itemData.url}}</a>
    <div class="linkCard__subs">
      <div class="linkCard__date">{{getReadableDate(state.itemData.added.toDate())}}</div>
      <div class="linkCard__date linkCard__edit" @click="editCard">edit</div>
    </div>

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
      data: Object,
      categories: Array
    },
    setup (props: any, context: any) {
      const state = reactive({
        itemData: props.data,
        subCategories: props.categories
      });

      const editCard = () => {
        context.emit('onEdit', state.itemData);
      };

      const getCategoryLabel = (linkItem: any): string => {
        const parentCategories = state.subCategories;
        const category = parentCategories.find((item: any) => item.id === linkItem.subCategory);
        return category.label;
      };

      const getReadableDate = (date: Date, longNames: boolean = false) => {
        return readableDate(date, longNames);
      };

      return {
        state,
        getCategoryLabel,
        getReadableDate,
        editCard
      };
    }
  };

</script>
