<template>
<!-- Fixed navbar -->
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand><a class="navbar-brand" href="/"><img src="../assets/images/logo.png" class="ev-appnav__logo"></a></b-navbar-brand>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-collapse is-nav id="nav_collapse">
      <!-- Logged in -->

      <template v-if="auth.isLoggedIn">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/home">Dashboard <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <ul class="navbar-nav nav-right ev-appnav__logout">
          <li class="nav-item">
            <a href="#" @click="logout()">
              <button class="btn btn-outline-primary">Logout</button>
            </a>
          </li>
        </ul>
      </template>

      <!-- Not logged in -->
      <template v-else>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="login">Login <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="signup" class="nav-link">Signup <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </template>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Auth from '../services/auth'
export default {
  data () {
    return {
      auth: this.$store.state.auth,
      searchText: '',
      searchFlag: ''
    }
  },
  methods: {
    logout () {
      this.$session.remove('vue-chatting')
      Auth.logout()
    },
    submitSearch () {
      this.$store.commit(
        'APPNAV_SEARCH',
        {
          searchText: this.searchText,
          searchTimestamp: Date.now()
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
/* 
  You can use BEM style even though you are scoped. Helps to reason about
  your styles.
*/
.ev-appnav__logo {
  width: 40px;
}
.ev-appnav__search {
  margin-right: 10px;
}
.ev-appnav__logout {
  margin-top: 1px;
}
</style>
