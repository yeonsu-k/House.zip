<template>
  <div>
    <!-- 지도 -->
    <div class="mb-4" id="map" style="height: 500px"></div>
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
            <b-td>
              <router-link :to="{ name: 'HouseDealList', params: { house: house, aptCode: house.aptCode } }">{{ house.aptName }}</router-link>
            </b-td>
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
  </div>
</template>

<script>
export default {
  name: "HouseAll",
  data() {
    return {
      markers: [],
      infowindow: null,
      latlng: null,
    };
  },
  props: {
    houses: {
      type: Array,
    },
    x: null,
    y: null,
    dongCode: null,
    // loginUser: "",
    // isManager: "",
  },
  watch: {
    houses() {
      if (this.houses) {
        this.markerPositions = [];
        this.houses.forEach((house) => this.markerPositions.push({ title: house.aptName, latlng: new kakao.maps.LatLng(house.lat, house.lng) }));
        this.displayMarker(this.markerPositions);
      }
    },
    x() {
      this.latlng = this.x == "" ? new kakao.maps.LatLng(33.450701, 126.570667) : new kakao.maps.LatLng(this.y, this.x);
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      if (this.houses) this.displayMarker();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7f40405e29341c1fa46226d9889e981a&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      console.log("this.x:  " + this.x);
      this.latlng = this.x == "" ? new kakao.maps.LatLng(33.450701, 126.570667) : new kakao.maps.LatLng(this.y, this.x);
      const options = {
        center: this.latlng,
        level: 4,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.map.setMinLevel(1);
      this.map.setMaxLevel(7);
    },
    displayMarker() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      this.markers = [];

      let i = 0;
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let f_coords = new kakao.maps.LatLng(33.450701, 126.570667);
      this.houses.forEach((house) => {
        let coords = new kakao.maps.LatLng(house.lat, house.lng);

        let marker = new kakao.maps.Marker({
          map: this.map,
          position: coords,
          title: house.aptName,
          image: markerImage,
          clickable: true,
        });
        let infowindow = new kakao.maps.InfoWindow({
          position: coords,
          content: '<div style="padding:10px;text-align:center;width:200px">' + house.aptName + "</div>", // 인포윈도우에 표시할 내용
        });

        kakao.maps.event.addListener(marker, "mouseover", this.makeOverListener(this.map, marker, infowindow));
        kakao.maps.event.addListener(marker, "mouseout", this.makeOutListener(infowindow));
        kakao.maps.event.addListener(marker, "click", function () {
          alert(house.aptName + " " + house.aptCode);
        });
        i++;
        this.markers.push(marker);
        if (i == 1) {
          f_coords = coords;
        }
      });

      if (this.x !== "") {
        console.log(this.latlng);
        this.map.panTo(this.latlng);
      } else {
        this.map.panTo(f_coords);
      }
    },
    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    },
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
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
  background: url("@/assets/img/home-bg.jpg");
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
