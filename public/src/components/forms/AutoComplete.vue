<template lang="html">
    <p :class="{
      'autocomplete': true,
      'autocomplete--wrapper': true,
      'control': true,
      'is-loading': isLoading }">
      <input
        type="text"
        class="input autocomplete autocomplete--query"
        autocomplete="off"
        v-model="query"
        :placeholder="placeholder"
        @input="fetchSuggestions($event.target.value)"
        @click="isVisible = true"
        @blur="isVisible = false"
        @keydown.esc="isVisible = false"
        @keydown.down="onDownArrow"
        @keydown.up="onUpArrow"
        @keydown.enter.prevent="chooseSuggestion(highlighted)">
      <ul class="autocomplete autocomplete--results" v-show="isVisible">
        <li
          v-for="(suggestion, index) in suggestions"
          :class="{ 'highlighted': index === highlighted }"
          @mouseenter="highlighted = index"
          @click="chooseSuggestion(index)">
          <a>{{suggestion | humanReadable}}</a>
        </li>
      </ul>
    </p>
</template>

<script>
/* eslint-env browser */
function mapzenURL (term) {
  const query = encodeURIComponent(term)
  const layers = [
    'country',
    'macroregion',
    'region',
    'macrocounty',
    'county',
    'locality'
  ]
  return `https://search.mapzen.com/v1/autocomplete?api_key=${process.env.MAPZEN_API_KEY}&layers=${layers.join(',')}&text=${query}`
}

function humanReadable (suggestion) {
  const { properties } = suggestion
  return `${properties.name ? properties.name : properties.region}, ${properties.country}`.replace(/undefined, /g, '')
}

/**
 * TODO:
 * - Make this configurable like vue-flatpickr (classes etc, so it's just like an input element)
 * - Handle response
 * - Configure endpoint via property
 * - Configure response parser via property
 */
export default {
  props: [ 'placeholder' ],
  data () {
    return {
      isLoading: false,
      isVisible: false,
      highlighted: -1,
      query: '',
      suggestions: []
    }
  },
  methods: {
    fetchSuggestions (term) {
      if (!term) return // save unnecessary api requests

      this.isLoading = true
      fetch(mapzenURL(term))
        .then(res => { this.isLoading = false; return res })
        .then(res => res.json())
        .then(res => {
          this.isVisible = true
          this.suggestions = res.features
        })
        .catch(err => console.error(err))
    },
    chooseSuggestion (index) {
      const query = this.suggestions[index]
      this.isVisible = false
      this.query = query ? humanReadable(query) : ''
    },

    // handle keyboard navigation:
    onDownArrow () {
      // open menu on first keydown
      if (!this.isVisible) {
        this.isVisible = true
        return
      }
      this.highlighted = Math.min(this.highlighted + 1, this.suggestions.length)
    },
    onUpArrow () {
      // only act when menu is visible
      if (this.isVisible) {
        this.highlighted = Math.max(this.highlighted - 1, -1)
      }
    }
  },
  computed: {
    value () { return this.query }
  },
  filters: { humanReadable }
}
</script>

<style scoped>
  .autocomplete--wrapper {
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

  .autocomplete--results .highlighted a {
    background: #eee;
  }
</style>
