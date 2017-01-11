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
        @input="onInput($event.target.value)"
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
          @mouseenter="highlighted = index">
          <a @click="chooseSuggestion(index)">{{suggestion | humanReadable}}</a>
        </li>
      </ul>
    </p>
</template>

<script>
/* eslint-env browser */
import humanReadable from '../../utils/human-readable-feature'

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
      choice: null,
      suggestions: []
    }
  },
  methods: {
    chooseSuggestion (index) {
      this.choice = this.suggestions[index]
      this.isVisible = false
      this.query = this.choice ? humanReadable(this.choice) : ''
      this.$emit('select', this.choice)
    },

    // handle search term input:
    onInput (term) {
      // reset the choice
      this.choice = undefined
      this.$emit('select', undefined)

      if (!term) return // save unnecessary api requests

      // get new suggestions
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
