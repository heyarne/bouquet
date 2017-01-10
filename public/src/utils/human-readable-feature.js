/**
 * Converts a feature as returned by the Mapzen API to a human
 * readable representation.
 * @param  {Feature} feature
 * @return {String}
 */
export default function (feature) {
  const { properties } = feature
  return `${properties.name ? properties.name : properties.region}, ${properties.country}`.replace(/undefined, /g, '')
}
