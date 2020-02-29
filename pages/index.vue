<template>
  <div class="container">
    <!-- <img class="logo" src="../assets/logo.png" alt="Nuxt Amplify Auth Starter" /> -->
    <div v-if="!signedIn">
      <amplify-authenticator :auth-config="authConfig" />
    </div>
    <div v-else>
      <amplify-sign-out />
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  data() {
    return {
      signedIn: false,
      authConfig: {
        signUpConfig: {
          header: 'My Customized Sign Up',
          hideAllDefaults: true,
          defaultCountryCode: '81',
          signUpFields: [
            {
              label: 'Email',
              key: 'username',
              required: true,
              displayOrder: 1,
              type: 'string',
              signUpWith: true
            },
            {
              label: 'Password',
              key: 'password',
              required: true,
              displayOrder: 2,
              type: 'password'
            }
          ]
        }
      }
    }
  },
  created() {
    this.findUser()

    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.findUser()
      } else {
        this.signedIn = false
      }
    })
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        this.signedIn = true
        console.log(user)
      } catch (err) {
        this.signedIn = false
      }
    }
  }
}
</script>

<style></style>
