<template>
  <div id="app">
    <ul class="navbar">
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/test">Test</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
