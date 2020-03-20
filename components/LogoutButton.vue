<template>
  <div>
    <a-button type="primary" shape="circle" icon="poweroff" :size="large" @click="showConfirm" />
    <a-modal
      title="ログアウトしますか？"
      :visible="visible"
      @ok="handleOK"
      @cancel="handleCancel"
    >ログアウトする場合は OK を、そうではない場合は Cancel を選んでください。</a-modal>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showConfirm() {
      this.visible = true
    },
    async handleOK(e) {
      await Auth.signOut({ global: true })
      this.$router.push('/sign-in')
    },
    handleCancel(e) {
      this.visible = false
    },
    signOut() {
      Auth.signOut({ global: true })
      this.$router.push('/sign-in')
    }
  }
}
</script>
