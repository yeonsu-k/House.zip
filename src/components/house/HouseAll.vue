<template>
  <div>
    <!-- Main Content-->

    <!-- <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
      <b-row v-for="(house, index) in houses" :key="index" class="m-2" @click="selectHouse" @mouseover="colorChange(true)" @mouseout="colorChange(false)" :class="{ 'mouse-over-bgcolor': isColor }">
        <b-col cols="2" class="text-center align-self-center">
          <b-img thumbnail src="https://picsum.photos/250/250/?image=58" alt="Image 1"></b-img>
        </b-col>
        <b-col cols="5" class="align-self-center"> [{{ index + 1 }}] {{ house.aptName }} </b-col>
        <b-col cols="5" class="align-self-center"> 정보: {{ house.no }} | {{ house.buildYear }} | {{ house.aptcode }} | {{ house.type }} </b-col>
      </b-row>
    </b-container>
    <b-container v-else class="bv-example-row mt-3">
      <b-row>
        <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
      </b-row>
    </b-container> -->

    <div v-if="houses.length">
      <b-table-simple hover striped responsive class="text-center">
        <b-thead>
          <b-tr>
            <b-th>번호</b-th>
            <b-th>아파트명</b-th>
            <b-th>건축년도</b-th>
            <b-th>아파트코드</b-th>
            <b-th>매물수</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(house, index) in houses" :key="index" class="m-2">
            <b-td>{{ index + 1 }}</b-td>
            <b-td>{{ house.aptName }}</b-td>
            <!--  <b-td>
              <router-link :to="{ name: 'HouseDetail', params: { no: house.no } }">{{ house.aptName }}</router-link> 
            </b-td>-->
            <b-td>{{ house.buildYear }}</b-td>
            <b-td>{{ house.aptCode }}</b-td>
            <b-td>{{ house.total }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div v-else>
      <b-row>
        <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
      </b-row>
    </div>

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
            <!-- <table class="col">
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
            </table> -->
          </div>
          <!-- <%@ include file="/WEB-INF/views/include/paging.jsp" %><br /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseAll",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    houses: {
      type: Array,
    },
    // loginUser: "",
    // isManager: "",
  },
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    selectHouse() {
      // console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      console.log(this.house.no);
      this.detailHouse(this.house);
    },
    colorChange(flag) {
      this.isColor = flag;
    },

    initMap() {
      var container = document.getElementById("map");
      var options = { center: new kakao.maps.LatLng(37.5742806, 126.970598), level: 4 };
      var map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다.
      // house 데이터 받아야함 ******************
      /*
      var positions = [
        <c:forEach items="${houses}" var="house">
          title: '${house.aptName}', latlng: new kakao.maps.LatLng(${house.lat},${house.lng})
        </c:forEach>,
      ];
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      var bounds = new kakao.maps.LatLngBounds();
      for (var i = 0; i < positions.length; i++) {
        var imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지를 생성
        // 마커를 생성
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });

        // 마커에 표시할 인포윈도우를 생성
        var infowindow = new kakao.maps.InfoWindow({
          content: positions[i].title, // 인포윈도우에 표시할 내용
        });
        bounds.extend(positions[i].latlng);

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
      }

      //LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
      // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
      <c:if test="${!empty houses}">map.setBounds(bounds);</c:if>;

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
    },
    */
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
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
