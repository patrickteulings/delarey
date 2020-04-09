<template>
  <div class="main add">
    <h1>
    	Add
    </h1>

    <div v-if="state.dataLoaded">
      <div class="add__formWrapper">
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Titel</label>
          <input type="text" placeholder="Korte titel" v-model="state.title">
        </div>
        <!-- MAINCATEGORIES -->
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Hoofdcategorie</label>
          <select @change="onMainCategoryChange($event)">
            <option value="all">Selecteer</option>
            <option v-for="(item, index) in getMainCategories()" :value="item.id" :key="index">{{getReadableMainCat(item.id)}}</option>
          </select>
        </div>
        <!-- SUBCATEGORIES -->
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }" v-if="state.selectedMainCategory.length">
          <label>Subcategorie</label>
          <select @change="onSubCategoryChange($event)" v-model="state.subModel">
            <option value="all">Selecteer</option>
            <option v-for="(item, index) in state.subCategories" :value="item.id" :key="index">{{item.label}}</option>
            <option value="">----------------</option>
            <option value="add">SubCategorie toevoegen</option>
          </select>
        </div>
        <div v-if="state.addSub">
          <input type="text" v-model="state.newSubcategory" placeholder="Gebruik 1 of 2 woorden">
          <div class="btn btn--add" @click="onSubmitNewCategory()">{{state.addSubText}}</div>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Is het dagelijks op een bepaalde tijd?</label>
          <div class="radioItemWrap">
            <input type="radio" name="time" id="one" :value="true" v-model="state.isDaily">
            <label for="one">Ja</label>
          </div>
          <div class="radioItemWrap">
            <input type="radio" name="time" id="one" :value="false" v-model="state.isDaily">
            <label for="one">Nee</label>
          </div>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }" v-if="state.isDaily">
          <label>Hoe laat ongeveer?</label>
          <select @change="onTimeChange($event)">
            <option v-for="(item, index) in state.timeBlocks" :value="item" :key="`time${index}`">{{item}}</option>
          </select>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Omschrijving</label>
          <textarea name="" id="" cols="30" rows="10" placeholder="Omschrijf in min.10 woorden (beetje context is fijn), en verplicht 😉" v-model="state.description"></textarea>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Deze tip is van...</label>
          <input type="text" placeholder="Wie ben je?"  v-model="state.author">
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>De hyper-hyper-hyper link</label>
          <input type="text" placeholder="http://www.voorbeeld.nl" v-model="state.url">
        </div>
        <div class="btn btn--add" @click="onSubmit()">{{state.addtext}}</div>
      </div>
    </div>
    <div v-else>
      <div class="spinnerWrapper" v-if="!state.dataLoaded">
        <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    </div>
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
      url: '',
      isDaily: false,
      dailyTime: '',
      parentLinks: context.root.$store.getters.getParentLinks,
      parentCategories: context.root.$store.getters.getParentCategories,
      subCategories: [],
      selectedSubCategory: '',
      selectedMainCategory: '',
      selectedSubCategoryTest: '',
      subModel: 'all',
      dataLoaded: false,
      newSubcategory: '',
      addSub: false,
      addtext: 'Toevoegen',
      addSubText: 'Subcategorie Toevoegen',
      timeBlocks: ['07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
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
      const mainCat = e.target.value;

      state.selectedMainCategory = mainCat;
      state.selectedSubCategory = '';
      state.subModel = 'all';

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

    const getReadableMainCat = (str: string) => {
      let readable = '';

      if (str === 'parents') readable = 'Voor Ouders';
      if (str === 'prepschool') readable = 'Voor groep 1/2/3';
      if (str === 'middleschool') readable = 'Voor groep 3/4/+';

      return readable;
    };

    const onSubCategoryChange = (e: {target: HTMLInputElement}) => {
      if (e.target.value.toLowerCase() === 'add') {
        state.addSub = true;
      }
      state.selectedSubCategory = e.target.value;

    };

    const onSubmitNewCategory = () => {
      state.addSubText = 'Bezig...';

      const item = {item: {label: state.newSubcategory}, mainCategory: state.selectedMainCategory};

      context.root.$store.dispatch('addSubCategory', item).then((response: any) => {

        setTimeout(() => {
          state.subModel = response.id;
          state.addSubText = 'Toevoegen';
          state.addSub = false;
        }, 600);
      });

    };

    const onSubmit = () => {
      state.addtext = 'bezig met opslaan';
      console.log(state.title);
      console.log(state.description);
      console.log(state.selectedMainCategory);
      console.log(state.selectedSubCategory);
      console.log(state.author);
      console.log(state.url);
      console.log('daily', state.isDaily);
      console.log(state.dailyTime);

      if (state.subModel === 'all' || state.subModel === 'add') {
        alert('Kies een subcategorie');
        return;
      }

      if (state.title === '' || state.description === '' || state.author === '' || state.url === '') {
        alert('Vul je all velden in? Dank je!');
        return;
      }

      // Add timestamp
      const item = {
        title: state.title,
        description: state.description,
        author: state.author,
        url: state.url,
        daily: state.isDaily,
        dailyTime: state.dailyTime,
        mainCategory: state.selectedMainCategory,
        subCategory: state.selectedSubCategory,
        dailyAt: '09:30',
        added: new Date()
      };

      context.root.$store.dispatch('addLink', item).then((response: any) => {
        state.addtext = 'gelukt!';
        setTimeout(() => {
           state.addtext = 'toevoegen';
        }, 1000);
      }).catch ((e: any) => {
        state.addtext = 'er ging iets mis, App Patrick';
      });
    };

    const onTimeChange = (e: {target: HTMLInputElement}) => {
      state.dailyTime = e.target.value;
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
      onTimeChange,
      onSubmit,
      onSubmitNewCategory,
      getReadableMainCat
    };
  }
};
</script>
