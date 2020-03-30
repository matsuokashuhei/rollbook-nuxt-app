<template>
  <div>
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1" @click="handleClick">
        <a-icon type="user" />
        <span>user</span>
      </a-menu-item>
      <a-menu-item key="2" @click="handleClick">
        <a-icon type="team" />
        <span>team</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      console.log(`e.key: ${e.key}`)
      if (e.key === '1') {
        this.$router.push('/users/')
      }
    }
  }
}
</script>
