<template>
  <div id="app">
    <hello />
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  name: 'app',
  data() {
      return { user: null }
  },
  components: {
    Hello
  }
}
</script>
