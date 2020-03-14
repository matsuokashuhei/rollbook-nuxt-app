<template>
  <a-layout>
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>user</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row type="flex" justify="end" align="middle">
          <a-col>
            <a-button
              type="primary"
              shape="circle"
              icon="poweroff"
              :size="large"
              @click="showConfirm"
            ></a-button>
          </a-col>
        </a-row>
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
        <a-layout-footer style="text-align: center">
          株式会社ネームレスプロダクション ©2020
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      // size: 'large'
    }
  },
  created() {
    this.setListener()
  },
  methods: {
    showConfirm() {
      this.$confirm({
        title: 'ログアウトしますか？',
        content:
          'ログアウトする場合は OK を、そうではない場合は Cancel を選んでください。',
        onOk() {
          this.signOut()
        },
        onCancel() {}
      })
    },
    async signOut() {
      await Auth.signOut({ global: true })
      this.$router.push('/sign-in')
    },
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
