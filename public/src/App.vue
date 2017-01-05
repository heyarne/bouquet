<template>
  <div>
    <header class="hero is-primary">
      <nav class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <h1 href="/" class="nav-item title">bouquet</h1>
          </div>
          <div class="nav-right">
            <span class="nav-item"><router-link to="/">Dashboard</router-link></span>
            <span class="nav-item"><router-link to="/profile">Profile</router-link></span>
            <span class="nav-item"><router-link to="/info">Vue.js Info</router-link></span>
            <span class="nav-item"><a href="#" @click="logout">Logout</a></span>
          </div>
        </div>
      </nav>
    </header>
    <toast />
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
    <footer class="footer">
      <div class="container has-text-right">
        Made with ❤ and 💦
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

<style lang="sass">
@import '../node_modules/bulma/bulma';
@import '../node_modules/vue-flatpickr/theme/airbnb';
</style>
