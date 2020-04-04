<template>
  <div class="main add">
    <h1>
    	Add
    </h1>

    <div v-if="state.dataLoaded">
      <div class="add__formWrapper">
        <div class="add__inputWrapper">
          <label>Titel</label>
          <input type="text" placeholder="Korte titel" v-model="state.title">
        </div>
        <!-- MAINCATEGORIES -->
        <div class="add__inputWrapper">
          <label>Hoofdcategorie</label>
          <select @change="onMainCategoryChange($event)">
            <option value="all">Alles</option>
            <option v-for="(item, index) in getMainCategories()" :value="item.id" :key="index">{{item.id}}</option>
          </select>
        </div>
        <!-- SUBCATEGORIES -->
        <div class="add__inputWrapper">
          <label>Subcategorie</label>
          <select @change="onSubCategoryChange($event)">
            <option v-for="(item, index) in state.subCategories" :value="item.id" :key="index">{{item.label}}</option>
          </select>
        </div>
        <div class="add__inputWrapper">
          <label>Omschrijving</label>
          <textarea name="" id="" cols="30" rows="10" placeholder="Omschrijf in min.10 woorden (beetje context is fijn), en verplicht 😉" v-model="state.description"></textarea>
        </div>
        <div class="add__inputWrapper">
          <label>Deze tip is van...</label>
          <input type="text" placeholder="Wie ben je?"  v-model="state.author">
        </div>
        <div class="add__inputWrapper">
          <label>De hyper-hyper-hyper link</label>
          <input type="text" placeholder="http://www.voorbeeld.nl" v-model="state.url">
        </div>
        <div class="btn" @click="onSubmit()">Toevoegen</div>
      </div>
      <div class="linkCards">
        <div class="linkCard" v-for="(item, index) in getLinks" :key="`link-${index}`">
          <div>
            <small class="linkCard__label">{{getCategoryLabel(item.subcategory)}}</small>
          </div>
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
          <a :href="item.url" target="_blank">{{item.url}}</a>
          <div class="linkCard__date">{{new Date()}}</div>
        </div>
      </div>
    </div>
    <div v-else>nog niet geladen</div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, onMounted } from '@vue/composition-api';

interface Lala {
  title: string;
  items: object[];
}

export default {
  setup (props: any, context: any) {
    const state = reactive({
      title: '',
      description: '',
      author: '',
      url: 'Http://www.voorbeeld.nl',
      parentLinks: context.root.$store.getters.getParentLinks,
      parentCategories: context.root.$store.getters.getParentCategories,
      subCategories: [],
      selectedSubCategory: '',
      selectedMainCategory: '',
      dataLoaded: false
    });

    const getLinks = computed(() => {
      return context.root.$store.getters.getParentLinks;
    });

    const getCategoryLabel = (subCategoryID: string): string => {
      const category = computedParentCategories().find((item: any) => item.id === subCategoryID);
      return category.label;
    };

    const computedParentCategories = (): any[] => {
      return context.root.$store.getters.getParentCategories;
    };

    const getMainCategories = (): any => {
      return context.root.$store.getters.getMainCategories;
    };

    const onMainCategoryChange = (e: {target: HTMLInputElement}) => {
      console.log('change', e.target.value);
      const mainCat = e.target.value;

      state.selectedMainCategory = mainCat;

      switch (mainCat) {
        case 'parents':
          state.subCategories = context.root.$store.getters.getParentCategories;
          // code block
          break;
        case 'prepschool':
          state.subCategories = context.root.$store.getters.getPrepSchoolCategories;
          break;
        case 'middleschool':
          state.subCategories = context.root.$store.getters.getMiddleSchoolCategories;
          break;
        default:
          // code block
      }
    };

    const onSubCategoryChange = (e: {target: HTMLInputElement}) => {
      state.selectedSubCategory = e.target.value;
      console.log(state.selectedSubCategory);
    };

    const onSubmit = () => {
      console.log(state.title);
      console.log(state.description);
      console.log(state.selectedMainCategory);
      console.log(state.selectedSubCategory);
      console.log(state.author);
      console.log(state.url);
      // Add timestamp
      const item = {
        title: state.title,
        description: state.description,
        author: state.author,
        url: state.url,
        mainCategory: state.selectedMainCategory,
        subCategory: state.selectedSubCategory,
        daily: true,
        dailyAt: '09:30',
        added: new Date()
      };

      context.root.$store.dispatch('addLink', item).then((response: any) => {
        console.log(response);
      });
    };

    onMounted (() => {
      context.root.$store.dispatch('bindMainCategories').then((responseLinks: any) => {
        context.root.$store.dispatch('bindParentCategories').then((responseParent: any) => {
          context.root.$store.dispatch('bindPrepSchoolCategories').then((responsePrep: any) => {
            context.root.$store.dispatch('bindMiddleSchoolCategories').then((responseMiddle: any) => {
              state.dataLoaded = true;
            });
          });
        });
      });
    });

    return {
      state,
      getCategoryLabel,
      getLinks,
      computedParentCategories,
      getMainCategories,
      onMainCategoryChange,
      onSubCategoryChange,
      onSubmit
    };
  }
};
</script>
