`<template>
  <div id="app">
    <!-- <div v-else-if="user">
      <header>
        <Navigation @onLogout="logout()"/>
      </header>
      <SidebarMenu></SidebarMenu>
      <main>
        <transition name="slide">
          <router-view />
        </transition>
      </main>
    </div>-->
    <div>
      <SidebarMenu />
      <!-- <LoginForm></LoginForm> -->
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';

// our custom composition functions for firebase auth check
// and for logging in and logging out of firebase
import useAuth from '@/components/auth/useAuth';
import useLogin from '@/components/auth/useLogin';
import LoginForm from '@/components/login/LoginForm.vue';
import Navigation from '@/components/navigation/Navigation.vue';
import SidebarMenu from '@/components/navigation/SidebarMenu.vue';
import Splash from '@/views/Splash.vue';
import FrontPage from '@/views/FrontPage.vue';

export default {
  name: 'app',
  components: {
    LoginForm,
    Splash,
    FrontPage,
    Navigation,
    SidebarMenu
  },
  setup () {
    // load in the authentication properties


    return {

    };
  }
};
</script>
<style lang="scss" src="@/styles/style.scss">

body, html {
  padding: 0;
  margin: 0;
  font-size: 18px;
  box-sizing: border-box;
}
</style>

