<template>
  <div>
    <a-form-modal
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      v-if="$route.name === 'users-id-edit'"
    >
      <a-form-model-item label="Name">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="Email">
        <a-input v-model="form.email" />
      </a-form-model-item>
      <a-form-model-item label="Resources">
        <a-radio-group v-model="form.status">
          <a-radio value="1">Sponsor</a-radio>
          <a-radio value="2">Venue</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit">Update</a-button>
      </a-form-model-item>
      <a-alert type="success" v-if="message" showIcon>
        <template slot="message">{{ message }}</template>
      </a-alert>
      <template v-if="errors">
        <a-alert type="error" v-for="error in errors" :key="error.message" showIcon>
          <template slot="message">{{ error.message }}</template>
        </a-alert>
      </template>
    </a-form-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        email: '',
        role: '',
        status: ''
      },
      loading: false,
      message: '',
      errors: []
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const response = await this.$axios.$get(
        `/api/users/${this.$route.params.id}`
      )
      this.form = response
    },
    async onSubmit(e) {
      e.preventDefault()
      this.setLoading()
      try {
        const response = await this.$axios.$put(`/api/users/${this.form.id}`, {
          user: {
            name: this.form.name
          }
        })
        this.message = `${this.form.name}を更新しました`
      } catch (e) {
        console.error(e)
        this.errors = e.response.data.errors
      } finally {
        this.loading = true
      }
    },
    setLoading() {
      this.message = ''
      this.errors = []
      this.loading = true
    }
  }
}
</script>
