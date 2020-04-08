<template>
  <div class="main add">
    <h1>
    	Add
    </h1>

    <div class="inside">
      <div class="btn btn--close" @click="onDone()">
        <div class="btn__inner">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </div>
      </div>
      <div class="add__formWrapper">
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Titel</label>
          <input type="text" placeholder="Korte titel" v-model="state.itemData.title">
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Is het dagelijks op een bepaalde tijd?</label>
          <div class="radioItemWrap">
            <input type="radio" name="time" id="one" :value="true" v-model="state.itemData.daily">
            <label for="one">Ja</label>
          </div>
          <div class="radioItemWrap">
            <input type="radio" name="time" id="one" :value="false" v-model="state.itemData.daily">
            <label for="one">Nee</label>
          </div>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }" v-if="state.itemData.daily">
          <label>Hoe laat ongeveer?</label>
          <select @change="onTimeChange($event)" v-model="state.itemData.dailyAt">
            <option v-for="(item, index) in state.timeBlocks" :value="item" :key="`time${index}`">{{item}}</option>
          </select>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Omschrijving</label>
          <textarea name="" id="" cols="30" rows="10" placeholder="Omschrijf in min.10 woorden (beetje context is fijn), en verplicht 😉" v-model="state.itemData.description"></textarea>
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>Deze tip is van...</label>
          <input type="text" placeholder="Wie ben je?"  v-model="state.itemData.author">
        </div>
        <div class="add__inputWrapper" :class="{lessVisible: state.addSub }">
          <label>De hyper-hyper-hyper link</label>
          <input type="text" placeholder="http://www.voorbeeld.nl" v-model="state.itemData.url">
        </div>
        <div class="btn btn--add" @click="onSubmit()">{{state.addtext}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, onMounted, watch } from '@vue/composition-api';

interface Lala {
  title: string;
  items: object[];
}

export default {
  props: {
    data: Object
  },
  setup (props: any, context: any) {
    const state = reactive({
      itemData: props.data,
      dataLoaded: false,
      addtext: 'Bijwerken',
      timeBlocks: ['07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
    });

    const getLinks = computed(() => {
      return context.root.$store.getters.getParentLinks;
    });

    const onSubmit = () => {
      context.root.$store.dispatch('updateLink', state.itemData).then(() => {
        console.log('whoepie');
        onDone();
      });
    };

    const onDone = () => {
      console.log('done');
      setTimeout(() => {
        context.emit('onDone');
      }, 600);
    };

    const onTimeChange = (e: {target: HTMLInputElement}) => {
      state.itemData.dailyAt = e.target.value;
    };

    watch(() => props.data, (newValue: any) => {
      state.itemData = newValue;
    });

    return {
      state,
      getLinks,
      onTimeChange,
      onSubmit,
      onDone
    };
  }
};
</script>
