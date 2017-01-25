<template lang="html">
  <div>
    <div class="tabs is-boxed">
      <ul>
        <router-link tag="li" :to="{name: 'tripNotes', params: {tripId: id} }" active-class="is-active">
          <a>Notes</a>
        </router-link>
        <router-link tag="li" :to="{name: 'tripEdit', params: {tripId: id} }" active-class="is-active">
          <a>Edit</a>
        </router-link>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  props: ['tripId'],
  data () {
    return {
      id: this.$route.params.tripId
    }
  }
}
</script>

<style lang="css">
</style>
