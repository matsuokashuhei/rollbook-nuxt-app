<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="name">
      <a-input
        v-decorator="['name', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        placeholder="Please input your name"
      />
    </a-form-item>
    <a-form-item label="email">
      <a-input
        v-decorator="['email', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        placeholder="Please input your email"
      />
    </a-form-item>
    <a-form-item label="role">
      <a-select
        v-decorator="['role', { rules: [{ required: true, message: 'Please select your role' }] }]"
        placeholder="Select a option"
      >
        <a-select-option v-for="role in roles" :key="role.id">{{ role.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading">Submit</a-button>
    </a-form-item>

    <a-alert type="success" v-if="message" showIcon>
      <template slot="message">{{ message }}</template>
    </a-alert>
    <template v-if="errors">
      <a-alert type="error" v-for="error in errors" :key="error.message" showIcon>
        <template slot="message">{{ error.message }}</template>
      </a-alert>
    </template>
  </a-form>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      roles: [],
      loading: false,
      message: '',
      errors: []
    }
  },
  async mounted() {
    this.roles = await this.$axios.$get('/api/users/roles')
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (error) {
          return
        }
        this.loading = true
        try {
          const response = await this.$axios.$post('/api/users', {
            user: {
              name: values.name,
              email: values.email
            }
          })
          console.log(`response: ${JSON.stringify(response)}`)
          this.message = `${values.name}を登録しました`
        } catch (e) {
          console.log(`response: ${JSON.stringify(e.response)}`)
          this.errors = e.response.data.errors
        } finally {
          this.loading = false
        }
      })
    }
  }
}
</script>
