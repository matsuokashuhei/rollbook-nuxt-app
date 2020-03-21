<template>
  <UserList />
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import UserList from '~/components/UserList'

export default {
  components: {
    UserList: UserList
  },
  data() {
    return {
      header: {
        title: 'TOP'
      },
      loading: true,
      discussions: []
    }
  },
  created() {},
  async mounted() {
    this.updateHeader()
    // await this.fetchDiscussions()
  },
  methods: {
    // async fetchDiscussions() {
    //   const session = await Auth.currentSession()
    //   console.log(`session: ${JSON.stringify(session)}`)
    //   const response = await this.$axios.$get('/api/discussions', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${session.accessToken.jwtToken}`
    //     }
    //   })
    //   this.loading = false
    //   this.discussions = response
    // },
    updateHeader() {
      this.$nuxt.$emit('updateHeader', this.header.title)
    }
  }
}
</script>

<style></style>
