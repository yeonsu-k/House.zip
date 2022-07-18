<template>
  <div id="head">
    <p class="text-center h1">Q & A</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#head p {
  font-weight: bold;
}
#head {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
  text-align: center;
  position: relative;
  z-index: 1;
}
#head ::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/img/head.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
</style>
