/**
 * Converts a feature as returned by the Mapzen API to a human
 * readable representation.
 * @param  {Feature} feature
 * @return {String}
 */
export default function humanReadableLocation (feature) {
  return feature.properties.label
}
