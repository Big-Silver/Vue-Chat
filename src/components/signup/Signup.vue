<template>
  <div class="ev-login col-sm-4 offset-sm-4">
    <spinner v-show="loggingIn" message="Logging in..."></spinner>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input 
        type="text"
        data-id="login.email" 
        class="form-control js-login__username"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control js-login__password "
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button 
      data-id="login.submit"
      class="btn btn-primary solid blank js-login__submit" 
      @click="submit()"
    >
      Sign up &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
    </button>
    <br><br><br>
    If you already have any account &nbsp;<a href="/login">Sign in here.</a>

  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner'

export default {
  name: 'signup',
  components: { Spinner },

  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      loggingIn: false,
      error: ''
    }
  },
  methods: {
    submit () {
      this.loggingIn = true
      const credentials = {
        workspaceId: 'jinyan',
        email: this.credentials.email,
        password: this.credentials.password
      }
      this.$auth.login(credentials, 'dashboard').then((response) => {
        this.loggingIn = false
        this.error = utils.getError(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ev-login {
  margin-top: 100px;
}

</style>