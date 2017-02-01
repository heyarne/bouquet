<template lang="html">
  <div class="section">
    <div class="container">
      <h1 class="title">Plan a new trip</h1>
      <p>
        Use this form to give us some information about where you want to go. We will use it to continously check whether we'll find something you may like. If we do, we'll remind you that you had some plans.
      </p>
      <!-- <p>
        None of this is going to be shared or published, no worries.
      </p> -->
      <hr>
      <trip-form />
    </div>
  </div>
</template>

<script>
import TripForm from './TripForm.vue'

export default {
  components: { TripForm }
}
</script>

<style lang="css">
</style>
