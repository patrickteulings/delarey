<template>
  <div class="main linklist">
    <h1>
    	Linklist
    </h1>

    <div class="spinnerWrapper" v-if="!state.dataLoaded">
      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>

    <div v-if="state.dataLoaded">
      <filters :data="state.subCategories" @onFilterClicked="onFilter" @onSortChanged="onHandleSort"/>

      <div class="linkCards">
        <linkCard @onEdit="editCard" @onDone="doneEditing" class="linkCard" v-for="(item, index) in state.activeLinks" :key="`linkCard-${index}`" :data="item" :categories="state.subCategories" />
      </div>
    </div>
    <div class="editPop" :class="{isVisible: state.isEditing}">
      <Edit class="editPop__inner" :data="getSelectedItem" @onDone="doneEditing"/>
    </div>

  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, onMounted } from '@vue/composition-api';
import linkCard from '@/components/cards/linkCard.vue';
import filters from '@/components/filters/filters.vue';
import Edit from '@/views/Edit.vue';

interface Lala {
  title: string;
  items: object[];
}

export default {
  components: {
    linkCard,
    filters,
    Edit
  },

  setup (props: any, context: any) {
    const state = reactive({
      list: [] as Lala[],
      originalParentLinks: context.root.$store.getters.getParentLinks,
      parentLinks: context.root.$store.getters.getParentLinks,
      subCategories: context.root.$store.getters.getParentCategories,
      dataLoaded: false,
      zomaar: [] as any,
      activeLinks: [] as any,
      activeFilters: [] as any,
      selectedItem: {},
      isEditing: false
    });

    const editCard = (arg: any) => {
      state.isEditing = true;
      state.selectedItem = arg;
    };

    const getSelectedItem = computed(() => {
      return state.selectedItem;
    });

    const doneEditing = () => {
      state.isEditing = false;
    };

    const getLinks = computed(() => {
      return state.zomaar;
    });

    const onFilter = (activeFilters: string[]) => {

      state.activeFilters = activeFilters;

      if (activeFilters.length === 0) {
        state.activeLinks = state.originalParentLinks;
        return;
      }
      state.activeLinks = [];

      const temp: any = [];

      for (const filter of state.activeFilters) {
        for (const item of state.originalParentLinks) {
          if (item.subCategory === filter) {
            temp.push(item);
          }
        }
      }

      setTimeout(() => {
        state.activeLinks = temp;
      }, 0);
    };

    const onHandleSort = (sortType: string) => {

      switch (sortType) {
        case 'newest' :
          const temp = state.activeLinks.sort((a: any, b: any) => b.added.toDate() - a.added.toDate());
          state.activeLinks = [];
          setTimeout(() => {
            state.activeLinks = temp;
          }, 200);
          break;
        case 'category' :
          const collection = [] as any;
          state.activeLinks = [];

          for (const sub of state.subCategories) {
            const test = [];
            for (const item of state.originalParentLinks) {
              if (item.subCategory === sub.id) test.push(item);
            }
            collection.push(test);
          }

          setTimeout(() => {
            state.activeLinks = collection.flat();
          }, 0);

          break;
        default:
      }
    };

    onMounted (() => {
      context.root.$store.dispatch('bindPrepSchoolCategories').then((response: any) => {
        context.root.$store.dispatch('bindPrepSchoolLinks').then((responseLinks: any) => {
          state.subCategories = response;
          state.originalParentLinks = responseLinks;
          state.activeLinks = responseLinks;
          setTimeout(() => {
            state.dataLoaded = true;
          }, 200);

        });
      });
    });

    return {
      state,
      getLinks,
      onFilter,
      onHandleSort,
      getSelectedItem,
      doneEditing,
      editCard
    };
  }
};
</script>
