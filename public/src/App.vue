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
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
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
