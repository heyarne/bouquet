import moment from 'moment'

export default function dateFormat (date, format = 'MMMM Do Y') {
  return moment(date).format(format)
}
