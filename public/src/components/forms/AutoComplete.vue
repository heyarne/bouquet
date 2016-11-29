<template lang="html">
  <div class="autocomplete autocomplete--wrapper">
    <input type="text" class="autocomplete autocomplete--query"  @input="fetchSuggestions">
    <ul class="autocomplete autocomplete--results">
      <li v-for="suggestion in suggestions"><a :suggestion="suggestion" @click="pickSuggestion(suggestion)">{{suggestion | humanReadable}}</a></li>
    </ul>
  </div>
</template>

<script>
/* eslint-env browser */
/**
 * TODO:
 * - Fetch suggestion
 * - Handle response
 * - Configure endpoint via property
 * - Configure response parser via property
 */
export default {
  data () {
    return {
      pick: null,
      suggestions: []
    }
  },
  methods: {
    fetchSuggestions (e) {
      const query = encodeURIComponent(e.target.value)
      fetch(`https://search.mapzen.com/v1/autocomplete?api_key=${process.env.MAPZEN_API_KEY}&text=${query}`)
        .then(res => res.json())
        .then(res => this.suggestions = res.features)
        .catch(err => console.error(err))
    },
    pickSuggestion (suggestion) {
      this.pick = suggestion
      this.suggestions = []
    }
  },
  filters: {
    humanReadable (suggestion) {
      const { properties } = suggestion
      return `${properties.name}, ${properties.region}, ${properties.country}`.replace(/undefined, /g, '')
    }
  }
}
</script>

<style scoped>
  /* TODO: Styling */
  .autocomplete--wrapper {
    display: inline-block;
    position: relative;
  }

  .autocomplete--results {
      position: absolute;
      z-index: 100;
      top: 100%;
      margin-top: -1px;
      background: #fff;
  }

  .autocomplete--results li {
      white-space: nowrap;
      border: 1px solid #ccc;
      border-top: none
  }

  .autocomplete--results li:first-child {
      border-top: 1px solid #ccc;
  }

  .autocomplete--results a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: .6em;
  }

  .autocomplete--results a:hover {
    background: #eee;
  }
</style>
