<template></template>

<script>
export default {
  data() {
    return {
      header: {
        title: 'TOP'
      }
    }
  },
  async mounted() {
    this.updateHeader()
  },
  methods: {
    updateHeader() {
      this.$nuxt.$emit('updateHeader', this.header.title)
    }
  }
}
</script>

<style></style>
