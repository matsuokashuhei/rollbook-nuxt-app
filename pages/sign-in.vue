<template>
  <a-row>
    <a-col align="middle">
      <amplify-authenticator />
    </a-col>
  </a-row>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  layout: 'before-auth',
  async mounted() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.$router.push('/')
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
