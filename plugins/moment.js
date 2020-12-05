import moment from 'moment-timezone'

export default ({ app }, inject) => {
  const stringifyToISO = (time) => {
    return moment(time, 'MMM DD, hh:mm').format('MMM DD, hh:mm A')
  }

  const americanTime = (time) => {
    return moment(time, 'hh:mm').format('hh:mm A')
  }

  inject('moment', moment)
  inject('stringifyToISO', stringifyToISO)
  inject('americanTime', americanTime)
}
