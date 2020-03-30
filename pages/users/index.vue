<template>
  <div>
    <a-row>
      <a-col>
        <a-button type="primary" shape="circle" icon="user-add" @click="moveToAddUser"></a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-table :columns="columns" :loading="loading" :dataSource="users"></a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      loading: true,
      columns: [
        {
          title: 'name',
          dataIndex: 'name'
        },
        {
          title: 'email',
          dataIndex: 'email'
        },
        {
          title: 'role',
          dataIndex: 'role'
        },
        {
          title: 'status',
          dataIndex: 'status'
        }
      ],
      users: []
    }
  },
  async mounted() {
    await this.fetch()
  },
  methods: {
    async fetch() {
      const response = await this.$axios.$get('/api/users')
      this.loading = false
      this.users = response.map((user) => {
        return {
          key: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        }
      })
    },
    moveToAddUser() {
      this.$router.push('/users/new')
    }
  }
}
</script>
