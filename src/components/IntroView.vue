<template>
  <div class="intro">
    <!-- Header-->
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4" style="text-shadow: 1px 1px 1px #999">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>introduce</h4></span>
      </div>
    </b-jumbotron>
    <!-- Main Content-->
    <div class="container mb-4">
      <div class="text-center">
        <h2>행복한 나의 집을 찾아서...</h2>
        <hr />
        <li class="mb-2">아파트 위치, 실거래가, 거래 날짜 등 많은 매매 정보 확인 가능..!</li>
        <li class="mb-2">전국에 있는 아파트 매매정보 확인 가능!!</li>
        <li class="mb-2">자세한 매매 정보 검색 및 공지사항은 회원만 확인 가능!</li>
        <li class="mb-2">관심지역 동네 업종 정보 추가 예정 (많관부^_^)</li>
        <li class="mb-2">우리 홈페이지는 별이 다섯개~~★★★★★</li>
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
  /* background: url("@/assets/img/home-bg.jpg"); */
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
