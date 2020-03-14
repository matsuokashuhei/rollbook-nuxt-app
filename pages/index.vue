<template>
  <div />
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
// import { axios } from 'axios'

export default {
  data() {
    return {
      header: {
        title: 'TOP'
      },
      signedIn: false,
      discussions: []
    }
  },
  created() {
    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.$router.push('/sign-in')
        this.signedIn = false
      }
    })
    // this.discussions = await this.fetchDiscussions()
  },
  mounted() {
    this.updateHeader()
  },
  methods: {
    async fetchDiscussions() {
      const session = await Auth.currentSession()
      console.log(`session: ${JSON.stringify(session)}`)
      const response = await this.$axios.$get('/api/discussions', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken.jwtToken}`
        }
      })
      return response
    },
    updateHeader() {
      this.$nuxt.$emit('updateHeader', this.header.title)
    }
    // async findUser() {
    //   try {
    //     const user = await Auth.currentAuthenticatedUser()
    //     this.signedIn = true
    //     console.log(user)
    //   } catch (err) {
    //     this.signedIn = false
    //   }
    // }
  }
}
</script>

<style></style>
