import Vue from 'vue'

const API_URL = 'http://localhost:3000'

export default {

  install (Vue, options) {
    Vue.http.interceptors.push((request, next) => {
      request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
      request.headers.set('Accept', 'application/json')
    })

    Vue.prototype.$chat = Vue.chat = this
  },

  initMessage () {
    return Vue.http.get(API_URL + '/message')
    .then((response) => {
      return response
    })
    .catch((errorResponse) => {
      return errorResponse
    })
  }
}
