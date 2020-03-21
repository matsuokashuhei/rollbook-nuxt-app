<template>
  <a-row>
    <LogoutButton />
  </a-row>
</template>

<script>
import LogoutButton from '~/components/LogoutButton'

export default {
  components: {
    LogoutButton: LogoutButton
  }
}
</script>
