<template>
  <div class="sidebarmenu">
    hadhadhasiuh
    <div class="sidebarmenu__topbar">
      <div class="navigation__trigger-wrapper">
        <div role="button" class="navigation__trigger" :class="{'is-open': menuOpen}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="sidebarmenu__inner">
        jddskjbfdskb
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
      error: ''
    });
  },

  computed: {
    menuOpen () {
      return this.$store.getters.menuState;
    },
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {

  }

});



</script>

<style lang="scss" src="@/styles/style.scss">

</style>
