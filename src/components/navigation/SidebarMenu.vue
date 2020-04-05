<template>
  <div class="sidebarmenu" :class="{open: menuOpen}">

    <div class="navigation__trigger-wrapper">
      <div role="button" class="navigation__trigger" :class="{'is-open': menuOpen}" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>


    <div class="sidebarmenu__inner">
      <router-link to="/linklist" @click.native="toggleMenu">Voor de Ouders</router-link>
      <router-link to="/voor-de-kleinsten" @click.native="toggleMenu">Voor de Bijen / Rupsen</router-link>
      <router-link to="/voor-de-otters" @click.native="toggleMenu">Voor de Otters</router-link>
      <router-link to="/add" class="add" @click.native="toggleMenu">Link Toevoegen</router-link>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { fb, provider } from '@/services/firebaseConfigTypeScript';

export default Vue.extend ({
  name: 'SidebarMenu',
  data: () => {
    return ({
      iets: 'iets',
      error: '',
      menuOpen: false
    });
  },

  computed: {
    menuIsOpen () {
      return this.$store.getters.menuState;
    },
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen;
    }
  }

});



</script>

<style lang="scss" src="@/styles/style.scss">

</style>
