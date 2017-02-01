<template>
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" tag="strong" class="nav-item is-medium">bouquet</router-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <router-link to="/" active-class="is-active" class="nav-item is-tab" exact>
            Dashboard
          </router-link>
          <a href="#" @click="logout" class="nav-item is-tab">Logout</a>
        </div>
      </div>
    </nav>
    <toast />
    <router-view />
    <footer class="footer">
      <div class="container has-text-right">
        Made with ❤ by Arne Schlüter.<br>
        Search results powered by <a href="https://www.skyscanner.net/">SkyScanner.net</a>
      </div>
    </footer>
  </div>
</template>

<script>
import Toast from './components/Toast.vue'

export default {
  name: 'app',
  components: { Toast },
  methods: {
    logout () {
      this.$http.post('/auth/logout')
        .then(_ => {
          // redirect to landing page
          window.location.hash = ''
          window.location.href = '/'
        })
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma';
@import '../node_modules/vue-flatpickr/theme/airbnb';
@import '../node_modules/quill/dist/quill.bubble';
@import './sass/landing'
</style>
