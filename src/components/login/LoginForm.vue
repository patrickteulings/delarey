<template>

  <div class="splash">
    <div>
      <input type="text" placeholder="username" v-model="username" />
      <input type="password" placeholder="password" v-model="password" />
      <button @click="login" :disabled="!isValid">LOGIN</button>
      <button @click="loginWithGoogle">Google</button>
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script>


import useLogin from '@/components/auth/useLogin';

export default {
  setup () {
    const state = useLogin();
    return {
        ...state
    };
  }
};
</script>
