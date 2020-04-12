<template>
  <a-layout>
    <a-layout-sider collapsible>
      <SideBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            margin: '0',
            padding: '24px',
            background: '#fff',
            minHeight: '280px'
          }"
        >
          <nuxt />
        </a-layout-content>
        <a-layout-footer style="text-align: center">matsuokashuhei ©2020</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '~/components/Header'
import SideBar from '~/components/SideBar'

export default {
  components: {
    Header: Header,
    SideBar: SideBar
  },
  data() {
    return {}
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

<style>
#layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
