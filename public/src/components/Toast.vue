<template lang="html">
  <transition name="fade">
    <div class="toast" v-if="shown">
      <div :class="'notification is-' + type">
        <button class="delete" @click="shown = false"></button>
        {{message}}
      </div>
    </div>
  </transition>
</template>

<script>
import eventBus from '../event-bus'

export default {
  data () {
    return {
      shown: false,
      type: null,
      message: null
    }
  },
  created () {
    eventBus.$on('notification', n => {
      this.type = n.type === 'error' ? 'danger' : 'info'
      this.message = n.message
      this.shown = true
    })
  }
}
</script>

<style lang="css">
  .toast {
    position: fixed;
    z-index: 99;
    top: 1.8em;
    right: 3.2em;
  }

  .notification {
    min-width: 16em;
    max-width: 24em;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
