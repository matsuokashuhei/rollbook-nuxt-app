<template>
  <div>
    <a-row>
      <a-col>
        <a-button type="primary" shape="circle" icon="user-add" @click="moveToAddUser"></a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-table :columns="columns" :loading="loading" :dataSource="users">
          <template slot="name" slot-scope="text, record">
            <nuxt-link :to="{ path: `${record.key}/edit` }">{{text}}</nuxt-link>
          </template>
        </a-table>
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
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: 'name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
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
          id: user.id,
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
