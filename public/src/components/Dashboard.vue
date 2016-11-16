<template lang="html">
  <div class="dashboard content">
    <div class="message loading" v-if="loading">
      <div class="message-header">Loading...</div>
    </div>

    <article class="message is-warning" v-if="error">
      <div class="message-body">{{ error.message }}</div>
    </article>

    <div class="user" v-if="user">
      <div>Hello {{ user.email }}!</div>
      <div v-if="!user.trips.length">
        It seems like you don't have created any trips yet. Do you want to <router-link to="/trip/new">create a new one?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  // Initial data
  data () {
    return {
      loading: false,
      user: null,
      error: null
    }
  },

  // Will be called when the component is created
  created () {
    this.loading = true
    this.$http.get('users/me')
      .then(res => res.json())
      .then(res => {
        this.loading = false
        this.user = res.user
      })
      .catch(res => {
        res.json().then(err => {
          this.loading = false
          this.error = err
        })
      })
  }
}
</script>
