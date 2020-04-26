import Vue from 'vue'
import moment from 'moment'
const URL_PREFIX = /^ *(http|https).*/
const URL_BEGIN = /^\/.*/
const RELATIVELY = /^\.\/.*/

Vue.filter('img', val => {
  if (URL_PREFIX.test(val)) {
    return val
  }
  if (val) {
    return process.env.baseURL + '/images/' + val
  }
  return process.env.baseURL + '/images/def.jpg'
})

Vue.filter('dateYmd', function (v) {
  let date = new Date(v)
  if (date instanceof Date) {
    return moment(date).format('YYYY[年]MM[月]DD[日]')
  }
})
