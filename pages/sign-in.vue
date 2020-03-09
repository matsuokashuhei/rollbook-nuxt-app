<template>
  <div class="container mx-auto">
    <div class="min-h-screen flex items-center justify-center">
      <amplify-authenticator :auth-config="authConfig" />
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  data() {
    return {
      authConfig: {
        signUpConfig: {
          hideAllDefaults: true,
          signUpFields: [
            {
              label: 'Username',
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
    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style></style>
