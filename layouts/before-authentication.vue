<template>
  <a-layout>
    <a-layout-content>
      <nuxt />
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    }
  },
  created() {
    this.setListener()
  },
  methods: {
    setListener() {
      this.$nuxt.$on('updateHeader', this.setHeader)
    },
    setHeader(title) {
      this.title = title
    }
  }
}
</script>

<style></style>
