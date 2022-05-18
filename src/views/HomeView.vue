<template>
  <div class="home">
    <!-- Header-->
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>welcome to house</h4></span>
      </div>
    </b-jumbotron>
    <!-- Main Content-->
    <div class="container mb-4">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.jumbotron {
  height: 40vh;
  text-align: center;
  position: relative;
  z-index: 1;
}
.jumbotron::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/home-bg.jpg");
  background-position: center;
  background-size: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.65;
}
.jumbotron > div {
  width: 70%;
  display: inline-block;
}
</style>
