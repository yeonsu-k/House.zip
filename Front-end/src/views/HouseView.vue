<template>
  <div>
    <router-view :loginId="loginId" @logout="logout" />
  </div>
</template>
<script>
export default {
  name: "HouseView",
  props: {
    loginId: null,
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped></style>
