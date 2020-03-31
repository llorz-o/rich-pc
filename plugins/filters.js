import Vue from 'vue'

Vue.filter('img', val => {
  if (val) {
    return process.env.baseURL + '/images/' + val
  }
  return process.env.baseURL + '/images/def.jpg'
})
