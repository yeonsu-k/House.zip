<template>
  <div class="home">
    <!-- Header-->

    <!-- <b-jumbotron>
      <div>
        <img class="mb-4" src="@/assets/house_rogo.png" />
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>welcome to house</h4></span>
      </div>
    </b-jumbotron> -->

    <div class="text-center">
      <img class="mt-5 mb-4" src="@/assets/house_rogo.png" />
      <h1 class="font-weight-bold display-4 mb-4">Happy House</h1>
      <hr />
      <span style="font-size: 25px"><h4>welcome to house</h4></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  height: 40vh;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}
.home::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/home-bg.jpg");
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.65;
}
</style>
