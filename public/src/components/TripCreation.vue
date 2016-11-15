<template lang="html">
  <div class="trip creation">
    <h1 class="title">Create a new trip</h1>
    <p>
      Use this form to give us some information about where you want to go. We will use it to continously check whether we'll find something you may like. If we do, we'll remind you with an e-mail that you had some plans.
    </p>
    <p>
      None of this is going to be shared or published, no worries.
    </p>
    <hr>
    <form method="post">
      <div class="columns">
        <div class="column is-one-third"><h2 class="subtitle">Tell us about the journey&hellip;</h2></div>
        <div class="column">
          <p class="control">
            I want to travel from
            <input type="text" name="from" placeholder="place of departure" v-bind:value="trip && trip.from">
            to
            <input type="text" name="to" placeholder="destination" v-bind:value="trip && trip.to">.
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third">
          <h2 class="subtitle">When would be a good time?</h2>
        </div>
        <div class="column">
          <p class="control">
            Sometime between
            <input type="text" name="availability-start" placeholder="earliest date" v-bind:value="trip && trip.availability.start">
            and
            <input type="text" name="availability-end" placeholder="latest date of return" v-bind:value="trip && trip.availability.end">.
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third">
          <h2 class="subtitle">How long do you want to travel?</h2>
        </div>
        <div class="column">
          <p class="control">
            <label class="radio">
              <input type="radio" name="open-end" value="0" checked>
              <input type="text" name="duration" v-bind="trip && trip.duration">
              days.
            </label>
            <label class="radio">
              <input type="radio" name="open-end" value="1">
              Don't look for flights back just yet
            </label>
          </p>
        </div>
      </div>
      <div class="columns">
        <p class="controls">
          <input type="submit" class="button" value="Create trip">

        </p>
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
