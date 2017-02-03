<template lang="html">
  <div class="leaflet-map" v-if="geojson"></div>
</template>

<script>
import L from 'leaflet'
const interactions = ['dragging', 'touchZoom', 'doubleClickZoom', 'scrollWheelZom', 'boxZoom', 'keyboard', 'tap']

const attribution = 'Map made with <a href="https://leafletjs.org">Leaflet</a>, Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

export default {
  props: ['geojson'],
  mounted () {
    const map = L.map(this.$el, { zoomControl: false }).setView([51.505, -0.09])
      .addLayer(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution }))

    for (let i of interactions) {
      if (map[i]) {
        map[i].disable()
      }
    }

    const bbox = this.geojson.bbox
    if (bbox) {
      const [neLng, neLat, swLng, swLat] = bbox
      map.fitBounds([
        [neLat, neLng],
        [swLat, swLng]
      ])
    } else {
      map.setView(this.geojson.geometry.coordinates, 13)
    }
  }
}
</script>

<style scoped>
.leaflet-map {
  height: 50vh;
  position: relative;
  z-index: -1;
  pointer-events: none;
}
</style>
