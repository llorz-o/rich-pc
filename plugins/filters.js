import Vue from 'vue'

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
