<template>
  <a-form-modal :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
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
  </a-form-modal>
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
      }
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
    }
  }
}
</script>
