<template>
  <div class="home">
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px">welcome to house</span>
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

<style>
.jumbotron {
  background-image: url("@/assets/home-bg.jpg");
  background-size: fill;
  height: 40vh;
  text-align: center;
}
.jumbotron > div {
  width: 80%;
  height: 40vh;
  display: inline-block;
}
</style>
