import Vue from 'vue'

import * as QueryString from 'querystring'

const API_URL = 'http://localhost:3000'

export default {

  install (Vue, options) {
    Vue.http.interceptors.push((request, next) => {
      request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
      request.headers.set('Accept', 'application/json')
    })

    Vue.prototype.$user = Vue.user = this
  },

  getUsers (origin) {
    const data = QueryString.stringify({
      'workspaceId': origin.workspaceId
    })
    return Vue.http.post(API_URL + '/users', data)
      .then((response) => {
        return response
      })
      .catch((err) => {
        return err
      })
  }
}
