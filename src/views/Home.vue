<template>
  <div class="main">
    <div class="links__home">
    <h1>Hi there!</h1>
    <p>Omdat we allemaal leuke tips hebben om overdag met onze kinderen bezig zijn.</p>
    <p>Omdat we allemaal leuke tips hebben als ze 's-avonds in bed liggen'.</p>
    <p>Omdat we allemaal zoveel mogelijk binnen moeten blijven...🙁</p>
    <p>En ik eindeloos door WhatsApp lijsten scroll om die ene link op te zoeken...</p>
    <p>&nbsp;</p>
    <p>Dit overzicht met leuke links voor ons, onze wat grotere kleintjes en onze wat kleinere kleintjes.</p>
    <p>Links in het menu zie je de secties. Daar kun je ook items toevoegen (graag!!!!)</p>
    <p>Heb je vragen, app me even persoonlijk!</p>
    <p>Grt! Patrick (0614479205)</p>
    </div>
  </div>
</template>

<script lang="ts">
// Core
import Vue from 'vue';

// Components
import GratitudeList from '@/components/home/GratitudeList.vue';
import HomepageHero from '@/components/hero/HomepageHero.vue';
import Clock from '@/components/clock/Clock.vue';

// Helper, Semi-components
import Location from '@/components/location/Location.vue';


export default Vue.extend({
  name: 'home',
  data: () => {
    return {
      nrGratitudes: Number,
      gratitudes: new Array()
    };
  },

  components: {
    HomepageHero,
    GratitudeList,
    Clock,
    Location
  },

  methods: {
    setGratitudes (data: string[]): void {
      this.gratitudes = Array.from(data);
    }
  }
});
</script>
