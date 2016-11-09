<template>
  <div id="app">
    <form action="/auth/login" method="post" v-if="!user">
      <input type="email" name="user" value="" placeholder="E-Mail Adresse" />
      <input type="submit" value="Sign in">
    </form>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  name: 'app',
  data() {
      return { user: null }
  },
  components: {
    Hello
  }
}
</script>
