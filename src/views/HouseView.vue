<template>
  <div>
    <router-view :loginId="loginId" />
  </div>
</template>
<script>
export default {
  name: "HouseView",
  props: {
    loginId: null,
  },
};
</script>

<style scoped></style>
