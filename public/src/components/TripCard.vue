<template lang="html">
  <div class="box">
    <a class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
           From <strong>{{trip.departure}}</strong> to <strong>{{trip.destination}}</strong>.<br>
           Current estimated price: <tt>$estimated_price € (found at Date)</tt><br>
           <small>Searching since {{trip.createdAt}}.</small>
          </p>
        </div>
        <div class="level"></div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ['trip']
}
</script>

<style type="text/css" scoped>
a.media {
  border-bottom: none
}
</style>
