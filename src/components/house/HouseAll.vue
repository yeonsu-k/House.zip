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
              <select class="col me-1 mr-4 text-light form-control-lg bg-secondary" id="sido" name="sido">
                <option value="">시도선택</option>
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
                <c:forEach var="house" items="${houses}">
                  <tr>
                    <td><a href="${root}/house/view?no=${house.no}">${house.aptName}</a></td>
                    <td>${house.dongName}</td>
                    <td>${house.area}</td>
                    <td>${house.dealAmount}</td>
                  </tr>
                </c:forEach>
              </tr>

              <tbody id="aptinfo"></tbody>
            </table>
          </div>
          <!-- <%@ include file="/WEB-INF/views/include/paging.jsp" %><br /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 };
      var map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({ position: map.getCenter() });
      marker.setMap(map);
    },
    addScript() {
      const script = document.createElement("script");
      /* global kakao */ script.onload = () => kakao.maps.load(this.initMap);
      script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7f40405e29341c1fa46226d9889e981a";
      document.head.appendChild(script);
    },
  },
};
</script>

<style scoped>
#map {
  @include css-size(300px, 300px);
}
</style>
