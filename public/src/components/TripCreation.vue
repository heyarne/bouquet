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
    <form method="post" @submit.prevent="handleSubmit">
      <h2 class="subtitle">Tell us about the journey&hellip;</h2>
      <div class="columns">
        <div class="column">
          <p class="controls">
            I want to travel from
            <input type="text" name="from" placeholder="place of departure" v-model="departure" @keyup="">
            to
            <input type="text" name="to" placeholder="destination" v-model="destination">.
          </p>
        </div>
      </div>
      <h2 class="subtitle">When would be a good time?</h2>
      <div class="columns">
        <div class="column">
          <p class="controls">
            Sometime between
            <input type="text" name="availability-start" placeholder="earliest date" v-model="startDate">
            and
            <input type="text" name="availability-end" placeholder="latest date of return" v-model="endDate">.
            <!-- TODO: Add additional timeframes -->
          </p>
        </div>
      </div>
      <h2 class="subtitle">For how long do you want to travel?</h2>
      <div class="columns">
        <div class="column">
          <p class="controls">
            <label class="radio">
              <input type="radio" name="open-end" value="0" checked>
              <input type="text" name="duration" v-model="duration">
              days.
            </label>
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="controls">
            <label class="radio">
              <input type="radio" name="open-end" value="1">
              Don't look for flights back just yet.
            </label>
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-clearfix">
          <p class="controls is-pulled-right">
            <input type="submit" class="button is-medium is-primary" value="Create trip">
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import eventBus from '../event-bus'
import AutoComplete from './forms/AutoComplete.vue'

export default {
  components: { AutoComplete },
  data () { return {} },
  methods: {
    handleSubmit () {
      eventBus.$emit('notification', 'submit')
      this.$http.post('trips')
        .then(res => res.json())
        .then(_ => { /* creation successful */ })
        .catch(err => { eventBus.$emit('notification', {
          type: 'error', message: err.body.message
        })
      })
    }
  }
}
</script>
