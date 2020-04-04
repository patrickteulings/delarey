<template>
  <div class="main linklist">
    <h1>
    	Linklist
    </h1>


    <div v-if="state.dataLoaded">
      <filters :data="state.subCategories" @onFilterClicked="onFilter"/>
      <div class="linkCards">
        <linkCard v-for="(item, index) in state.zomaar" :key="`linkCard-${index}`" :data="item"  />
      </div>
    </div>
    <div v-else>nog niet geladen</div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, onMounted } from '@vue/composition-api';
import linkCard from '@/components/cards/linkCard.vue';
import filters from '@/components/filters/filters.vue';

interface Lala {
  title: string;
  items: object[];
}

export default {
  components: {
    linkCard,
    filters
  },

  setup (props: any, context: any) {
    const state = reactive({
      list: [] as Lala[],
      originalParentLinks: context.root.$store.getters.getParentLinks,
      parentLinks: context.root.$store.getters.getParentLinks,
      subCategories: context.root.$store.getters.getParentCategories,
      dataLoaded: false,
      zomaar: [] as any,
      activeFilters: [] as any
    });

    const getLinks = computed(() => {
      return state.zomaar;
    });

    const onFilter = (subCategoryID: string) => {
      const index = state.activeFilters.indexOf(subCategoryID);

      if (index !== -1) {
        state.activeFilters.splice(index, 1);
      } else {
        state.activeFilters.push(subCategoryID);
      }
      console.log(state.activeFilters);
      state.zomaar = [];
      const arr = [] as any;
      for (const filter of state.activeFilters) {
        for (const item of state.originalParentLinks) {
          if (item.subCategory === filter) {
            arr.push(item);
          }
        }
      }

      setTimeout(() => {
        state.zomaar = (state.activeFilters.length) ? arr : state.originalParentLinks;
      }, 0);
    };

    onMounted (() => {
      context.root.$store.dispatch('bindParentCategories').then((response: any) => {
        context.root.$store.dispatch('bindParentLinks').then((responseLinks: any) => {
          state.subCategories = response;
          state.originalParentLinks = responseLinks;
          state.dataLoaded = true;
        });
      });
    });

    return {
      state,
      getLinks,
      onFilter
    };
  }
};
</script>
