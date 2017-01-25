<template lang="html">
  <div>
    <div class="content is-medium">
      <wysiwyg placeholder="Take some notes and remind yourself what to do. Just start typing..." focus />
    </div>
    <div class="columns">
      <div class="column is-clearfix">
        <p class="controls is-pulled-right">
          <input type="submit" class="button is-medium is-primary" value="Save note">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Wysiwyg from './forms/Wysiwyg.vue'

export default {
  components: { Wysiwyg }
}
</script>

<style lang="css">
</style>
