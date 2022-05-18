<template>
  <div>
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
        <div class="col-md-10 col-lg-8 col-xl-7">
          <form action="${root}/house/all" id="searchForm" method="post">
            <input type="hidden" name="currentPage" id="currentPage" />
            <div class="mb-3 row">
              <select class="col me-1 text-light s bg-secondary" id="sido" name="sido">
                <option value=""></option>
              </select>
              <select class="col me-1 text-light form-control-lg bg-secondary" id="gugun" name="gugun">
                <option value="">구군선택</option>
              </select>
            </div>
            <!-- 지도 -->
            <div class="mb-4" id="map" style="height: 500px"></div>
            <!-- apt preview-->

            <input type="hidden" name="action" value="list" /> <input type="button" class="w-100 btn mb-3" style="background-color: #eee6c4" id="listBtn" value="아파트 정보 얻기" />
          </form>
          <div class="row">
            <table class="col">
              <tr>
                <th>아파트</th>
                <th>법정동</th>
                <th>전용면적</th>
                <th>거래금액</th>
                <house-list-row var="house" items="${houses}">
                  <tr>
                    <td><a href="${root}/house/view?no=${house.no}">${house.aptName}</a></td>
                    <td>${house.dongName}</td>
                    <td>${house.area}</td>
                    <td>${house.dealAmount}</td>
                  </tr>
                </house-list-row>
              </tr>

              <tbody id="aptinfo"></tbody>
            </table>
          </div>
          <pagig></pagig>
        </div>
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
