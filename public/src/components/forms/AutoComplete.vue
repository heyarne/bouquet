<template lang="html">
  <div class="autocomplete autocomplete--wrapper">
    <input type="text" class="autocomplete autocomplete--query" @input="fetchSuggestions">
    <ul class="autocomplete autocomplete--results">
      <li v-for="suggestion in suggestions"><a @click="pickSuggestion">{{suggestion}}</a></li>
    </ul>
  </div>
</template>

<script>
/* eslint-env browser */
import debounce from 'debounce' // eslint-disable-line
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
      value: null,
      suggestions: []
    }
  },
  methods: {
    fetchSuggestions: debounce(function fetchSuggestions (e) {
      const query = encodeURIComponent(e.target.value)
      fetch(`https://search.mapzen.com/v1/autocomplete?api_key=${process.env.MAPZEN_API_KEY}&text=${query}`)
        .then(res => res.json())
        .then(res => this.suggestions = res.features
            .map(({ properties }) => `${properties.name}, ${properties.region}, ${properties.country}`)
        )
        .catch(err => console.error(err))
    }, 200),
    pickSuggestion () {
      // TODO
      debugger
    }
  }
}
</script>

<style scoped>
  .autocomplete--wrapper {
    display: inline-block;
    position: relative;
  }

  .autocomplete--results {
      position: absolute;
      z-index: 100;
      top: 100%;
  }

  .autocomplete--results li {
      white-space: nowrap;
  }

  .autocomplete--results li:hover {
    cursor: pointer;
  }
</style>
