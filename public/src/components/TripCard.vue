<template lang="html">
  <a class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
           From <strong>{{trip.departure | humanReadable}}</strong> to <strong>{{trip.destination | humanReadable}}</strong>.<br>
           Current estimated price: <tt>$estimated_price € (found at Date)</tt><br>
           <small>Searching since {{trip.createdAt}}.</small>
          </p>
        </div>
        <div class="level"></div>
      </div>
    </article>
  </a>
</template>

<script>
import humanReadable from '../utils/human-readable-feature'

export default {
  props: ['trip'],
  filters: { humanReadable }
}
</script>
