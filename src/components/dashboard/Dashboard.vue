<template>
  <div class="message-template">
    <b-container class="message-container">
      <b-row class="message-display">
        <b-col class="user-list" cols="3">
          <b-list-group>
            <b-list-group-item>USERS</b-list-group-item>
            <b-list-group-item v-for="user in users" :key="user._id">
              {{user.name}}<span v-bind:class="user.isTyping ? isTyping : noneTyping">  typing...</span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col id="messagelist" class="messages-list" cols="9">
          <b-row>
            <b-list-group class="message-list">
              <b-list-group-item>General Platform</b-list-group-item>
              <b-list-group-item v-for="message in messages" :key="message._id">
                <b-row>
                  <span>{{message.user}}</span>
                  <b-col>{{message.date}}</b-col>
                </b-row>
                <b-row>
                  <b-col>{{message.message}}</b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-row>
        </b-col> 
      </b-row>
      <b-row class="message-send">
        <b-input-group prepend="Message">
          <b-form-input id="send-button" v-model="message" @keydown.native="onKey"></b-form-input>
          <b-input-group-append>
            <b-btn variant="info" v-on:click="sendMessage">Send</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-row>
      
      <!--<address-modal 
        v-if="addressModalVisible"
        :visible="true"
        @saved="addressInfo = arguments[0]"
        @closed="addressModalVisible = false"
      >
      </address-modal>-->
    </b-container>
  </div>

</template>

<script>
import Vue from 'vue'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io';
import { autoscroll } from 'vue-autoscroll'
import AddressModal from './AddressModal.vue'
import Spinner from '@/components/common/Spinner'

Vue.use(VueSocketio, socketio('http://localhost:3000'));

export default {
  name: 'dashboard',
  components: { AddressModal, Spinner },

  data () {
    return {
      message: '',
      error: '',
      isConnected: false,
      socketMessage: '',
      messages: [],
      users: [],
      isTyping: 'userTyping',
      noneTyping: 'notTyping',
      waitTyping: false
    }
  },
  sockets: {
    connect() {
      console.log('socket io is connected')
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    }
  },
  created: function() {
    const user_data = {
      'workspaceId': 'jinyan'
    }
    this.$user.getUsers(user_data).then((response) => {
      this.users = response.body
    }, (err) => {
      console.log(err)
    })

    this.$chat.initMessage().then((response) => {
      this.messages = response.body
    }, (err) => {
      console.log(err);
    })
    var vm = this
    var socket = socketio.connect('http://localhost:3000')
    socket.on('RECEIVE_MESSAGE', function (data) {
      vm.messages.push({
        'user': data.user,
        'message': data.message,
        'date': data.date
      })
      setTimeout(function() {
        var element = document.getElementById("messagelist")
        element.scrollTop = element.scrollHeight - element.clientHeight
      }, 300)
    })
    socket.on('RECEIVE_SIGNAL', function (data) {
      var user = vm.users.find(function (ele) {
        return ele.email === data.email
      })
      user.isTyping = true
      if (!vm.waitTyping) {
        vm.waitTyping = setTimeout(function() {
          user.isTyping = false
        }, 2000)
      }
      // setTimeout(function() {
      //   for (var i = 0; i < vm.users.length; i++) {
      //     if (vm.users[i].isTyping) {
      //       !vm.users[i].isTyping
      //     }
      //   }
      // }, 2000)
    })
  },
  computed: {
    reversedSearchText: function () {
      return this.$store.state.appnav.searchText.split('').reverse().join('')
    }
  },

  mounted () {
    this.$store.watch((state) => {
      return state.appnav
    }, (appnav) => {
      alert('Now you need to make a component to display search results!')
    }, {
      deep: true
    })
  },

  methods: {
    sendMessage: function () {
      if (this.message === '') return
      const msg = {
        'user': this.$session.get('vue-chatting')._id,
        'message': this.message 
      }
      this.$socket.emit('SEND_MESSAGE', msg)
      this.message = ''
    },
    onKey: function (event) {
      var vm = this
      this.$socket.emit('SEND_SIGNAL', {
        email: vm.$session.get('vue-chatting').email,
        workspaceId: vm.$session.get('vue-chatting').workspace
      })
    }
  }
}
</script>

<style lang="scss">
.message-template {
  width: 100%;
  padding-top: 70%;
  
  .message-container {
    position: absolute;
    top: 90px;
    bottom: 90px;
    width: 100%;
    background-color: lightgrey;

    .message-display {
      height: 95%;

      .user-list {
        background-color: #fff;
        overflow: auto;

        .list-group {
          cursor: pointer;
        }

        .notTyping {
          display: none;
        }

        .userTyping {
          display: inline-block;
          font-size: 11px;
          background-color: darkgrey;
          text-align: center;
          margin: 0 5px;
        }
      }

      .messages-list {
        background-color: #d4d4d4;
        overflow: auto;
      }
    }

    .message-send {
      height: 5%;
    }
  }
}

.message-list {
  width: 100%;
}

</style>
