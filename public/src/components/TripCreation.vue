<template lang="html">
  <div class="trip creation">
    <h1>Create a new trip</h1>
    <form method="post">
      <div>
        <h2>Tell me about the journey...</h2>
        I want to travel from
        <input type="text" name="from" placeholder="place of departure" v-bind:value="trip && trip.from">
        to
        <input type="text" name="to" placeholder="destination" v-bind:value="trip && trip.to">.
      </div>
      <div>
        <h2>When would be a good time?</h2>
        Sometime between
        <input type="text" name="availability-start" placeholder="earliest date" v-bind:value="trip && trip.availability.start">
        and
        <input type="text" name="availability-end" placeholder="latest date of return" v-bind:value="trip && trip.availability.end">.
      </div>
      <div>
        <h2>And for how long do you want to be there?</h2>
        <input type="text" name="duration" v-bind="trip && trip.duration">
        days.
      </div>
      <div>
        <label>
          <input type="checkbox" name="open-end" value="1">
          Don't look for flights back just yet
        </label>
      </div>
      <div>
        <br>
        <input type="submit" name="Create trip">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return { trip: null }
  },
  methods: {

  }
}
</script>
