/**
 * A very bad pluralization algorithm that probably does not handle all edge
 * cases. Might get better over time (or not).
 *
 * @param  {Number} count Positive integer
 * @param  {String} word  The string that should be pluralized
 * @return {String}       The pluralized string
 */
export default function pluralize (count, word) {
  if (count === 1) return word

  if (word.endsWith('y')) return word.replace(/y$/, 'ies')
  if (word.match(/(s|z)$/)) return `${word}es`
  return `${word}s`
}
