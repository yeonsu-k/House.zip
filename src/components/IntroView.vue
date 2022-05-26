<template>
  <div class="intro">
    <div id="head">
      <p class="text-center h1">이용 안내</p>
    </div>
    <!-- Main Content-->
    <b-container>
      <div>
        <b-tabs content-class="my-3 mx-5" justified>
          <b-tab title="회원가입">
            <h2>행복한 나의 집을 찾아서...</h2>
            아파트 위치, 실거래가, 거래 날짜 등 많은 매매 정보 확인 가능..!<br />
            전국에 있는 아파트 매매정보 확인 가능!! <br />
            자세한 매매 정보 검색 및 공지사항은 회원만 확인 가능!<br />
            관심지역 동네 업종 정보 추가 예정 (많관부^_^) 우리 홈페이지는 별이 다섯개~~★★★★★
          </b-tab>
          <b-tab title="거래조회">
            <p>I'm the second tab</p>
          </b-tab>
          <b-tab title="공지사항">
            <p>I'm the tab with the very, very long title</p>
          </b-tab>
          <b-tab title="기타">
            <p>I'm a disabled tab!</p>
          </b-tab>
        </b-tabs>
      </div>
      <div class="text-center"></div>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#head {
  background-color: #ece6cca1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
  color: rgb(17, 12, 7);
}
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}
a {
  color: #f2beff;
  text-decoration: none;
  background-color: transparent;
}
</style>
