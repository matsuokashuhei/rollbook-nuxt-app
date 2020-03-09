<template>
  <div class="container mx-auto">
    <div class="min-h-screen flex items-center justify-center">
      <button @click="signOut">サインアウト</button>
      <amplify-sign-out />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
// import { axios } from 'axios'

export default {
  data() {
    return {
      signedIn: false,
      users: []
    }
  },
  async created() {
    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.$router.push('/sign-in')
        this.signedIn = false
      }
    })
    this.users = await this.fetchUsers()
  },
  methods: {
    async signOut(e) {
      await Auth.signOut({ global: true })
      this.$router.push('/sign-in')
    },
    async fetchUsers() {
      const session = await Auth.currentSession()
      console.log(`session: ${JSON.stringify(session)}`)
      const response = await this.$axios.$get('/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken.jwtToken}`
        }
      })
      return response
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
