<template lang="html">
  <canvas></canvas>
</template>

<script>
export default {
  props: ['data', 'limit'],
  mounted () {
    this.$el.width = 144
    this.$el.height = 24

    // min == height
    // max == 0
    this.min = Math.min(this.limit || this.data[0], ...this.data)
    this.max = Math.max(this.limit || this.data[0], ...this.data)
    const ys = this.data.map(d => this.getY(d)).map(Math.round)

    const ctx = this.$el.getContext('2d')
    ctx.translate(1.5, 1.5)
    ctx.moveTo(0, ys[0])
    ys.slice(1).forEach((y, i) => {
      ctx.lineTo((this.$el.width - 1.5) * ((i + 1) / ys.length), y)
    })

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(0,0,0,.15)'
    ctx.stroke()

    if (this.limit) {
      ctx.strokeStyle = 'rgba(0,0,0,.2)'
      ctx.moveTo(0, this.getY(this.limit))
      ctx.strokeTo(this.$el.width, this.getY(this.limit))
    }
  },
  methods: {
    getY (d) {
      return (1 - ((d - this.min) / (this.max - this.min))) * (this.$el.height - 3)
    }
  }
}
</script>
