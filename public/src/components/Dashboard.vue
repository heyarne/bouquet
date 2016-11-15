<template lang="html">
  <div class="dashboard">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="error" v-if="error">
      {{ error.message }}
    </div>

    <div class="user" v-if="user">
      Hello {{ user.email }}!
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
        console.log(res)
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
