export default function ({ app }, inject) {
  const addToObj = function (obj, key, value, index) {
    const temp = {}
    let i = 0
    for (const prop in obj) {
      // eslint-disable-next-line
      if (obj.hasOwnProperty(prop)) {
        if (i === index && key && value) {
          temp[key] = value
        }
        temp[prop] = obj[prop]
        i++
      }
    }
    if (!index && key && value) {
      temp[key] = value
    }
    return temp
  }
  inject('addToObj', addToObj)
}
