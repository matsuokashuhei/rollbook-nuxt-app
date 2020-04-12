<template>
  <div>
    <template v-if="$route.name === 'users-id'">
      <a-form-modal :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="Name">
          <a-input v-model="form.name" disabled="true" />
        </a-form-model-item>
        <a-form-model-item label="Email">
          <a-input v-model="form.email" disabled="true" />
        </a-form-model-item>
        <a-form-model-item label="Resources">
          <a-radio-group v-model="form.status" disabled="true">
            <a-radio value="1">Sponsor</a-radio>
            <a-radio value="2">Venue</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="danger" @click="showConfirm">Delete</a-button>
          <a-modal
            title="削除しますか？"
            :visible="visible"
            @ok="handleOK"
            @cancel="handleCancel"
          >削除する場合はOKを、そうではない場合はCancelを選んでください。</a-modal>
        </a-form-model-item>
      </a-form-modal>
      <a-alert type="success" v-if="message" showIcon>
        <template slot="message">{{ message }}</template>
      </a-alert>
      <template v-if="errors">
        <a-alert type="error" v-for="error in errors" :key="error.message" showIcon>
          <template slot="message">{{ error.message }}</template>
        </a-alert>
      </template>
      <nuxt-link :to="{ path: `${this.form.id}/edit` }">Edit</nuxt-link>
    </template>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        id: '',
        name: '',
        email: '',
        role: '',
        status: ''
      },
      loading: false,
      message: '',
      errors: [],
      visible: false
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
    showConfirm() {
      this.visible = true
    },
    async handleOK(e) {
      this.visible = false
      e.preventDefault()
      this.setLoading()
      try {
        const response = await this.$axios.$delete(`/api/users/${this.form.id}`)
        this.message = `${this.form.name}を削除しました`
      } catch (e) {
        console.error(e)
        this.errors = e.response.data.errors
      } finally {
        this.loading = false
      }
    },
    handleCancel(e) {
      this.visible = false
    },
    setLoading() {
      this.message = ''
      this.errors = []
      this.loading = true
    }
  }
}
</script>
