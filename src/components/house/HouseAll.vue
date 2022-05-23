<template>
  <div style="height: 85vh">
    <b-row style="display: flex; width: 100%; height: 100%">
      <b-col cols="3">
        <div v-if="houses.length">
          <b-table-simple no-border-collapse hover striped class="text-center">
            <!-- sticky-header -->
            <b-thead>
              <b-tr>
                <b-th>번호</b-th>
                <b-th>건물명</b-th>
                <b-th>건물타입</b-th>
                <b-th>건축년도</b-th>
                <b-th>매물수</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(house, index) in houses" :key="index" class="m-2">
                <b-td>{{ index + 1 }}</b-td>
                <b-td>
                  <router-link :to="{ name: 'HouseDealList', params: { house: house, aptCode: house.aptCode } }">{{ house.aptName }}</router-link>
                </b-td>
                <b-td>{{ house.infoType }}</b-td>
                <b-td>{{ house.buildYear }}</b-td>

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
      </b-col>
      <b-col cols="9">
        <!-- 지도 -->
        <p id="result"></p>
        <!-- <div id="map" style="display: flex; width: 100%; height: 85vh; padding-left: 0px; padding-right: 0px"></div> -->
        <div class="map_wrap">
          <div class="mb-4" id="map" style="height: 100%; position: relative; overflow: hidden"></div>
          <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
          <!-- <div class="custom_zoomcontrol radius_border">
            <span @click="zoomIn()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" /></span>
            <span @click="zoomOut()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" /></span>
          </div> -->
        </div>
      </b-col>
    </b-row>
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
      lv: 3,
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
    // lv() {
    //   // this.$emit("update_lv", this.lv);
    //   this.getInfo();
    // },
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
      // console.log("this.x:  " + this.x);
      this.latlng = this.x == "" ? new kakao.maps.LatLng(33.450701, 126.570667) : new kakao.maps.LatLng(this.y, this.x);
      const options = {
        center: this.latlng,
        level: this.lv,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.map.setMinLevel(1);
      this.map.setMaxLevel(3);
      kakao.maps.event.addListener(this.map, "tilesloaded", this.getInfo);
    },
    getInfo() {
      // 지도의 중심좌표를 얻어옵니다
      var latlng = this.map.getCenter();
      this.lv = this.map.getLevel();
      let data = { lv: this.map.getLevel(), x: latlng.getLng(), y: latlng.getLat() };
      // console.log(data);
      this.$emit("search-road", data);
    },
    // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    // zoomIn() {
    //   this.map.setLevel(this.map.getLevel() - 1);
    //   this.lv = this.map.getLevel();
    // },
    // // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    // zoomOut() {
    //   this.map.setLevel(this.map.getLevel() + 1);
    //   this.lv = this.map.getLevel();
    // },
    displayMarker() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      this.markers = [];

      let i = 0;
      let imageSrc_apt = "http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt";
      let imageSrc_op = "http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu";
      let imageSrc_bil = "http://drive.google.com/uc?export=view&id=1XfXxlgJua7Y3BzxI4ugGGFBfJcPMOXmT";
      // let imageSrc = "http://drive.google.com/uc?export=view&id=1XfXxlgJua7Y3BzxI4ugGGFBfJcPMOXmT";
      // let imageSrc = "http://drive.google.com/uc?export=view&id=1Sp240hE8weIJ6l4X2sBkORkn3ntWzrhs";
      // let imageSrc = "http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu";

      //민트
      //http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt
      //노랑
      //http://drive.google.com/uc?export=view&id=1XfXxlgJua7Y3BzxI4ugGGFBfJcPMOXmT
      //연두
      //http://drive.google.com/uc?export=view&id=1Sp240hE8weIJ6l4X2sBkORkn3ntWzrhs
      //보라
      //http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(40, 40);
      // 마커 이미지를 생성합니다
      var markerImage_apt = new kakao.maps.MarkerImage(imageSrc_apt, imageSize);
      var markerImage_op = new kakao.maps.MarkerImage(imageSrc_op, imageSize);
      var markerImage_bil = new kakao.maps.MarkerImage(imageSrc_bil, imageSize);
      let f_coords = new kakao.maps.LatLng(33.450701, 126.570667);
      this.houses.forEach((house) => {
        let coords = new kakao.maps.LatLng(house.lat, house.lng);

        let markerImage = house.infoType.trim() == "아파트" ? markerImage_apt : house.infoType.trim() == "오피스텔" ? markerImage_op : markerImage_bil;
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
        // console.log(this.latlng);
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
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 85vh;
}
.radius_border {
  border: 1px solid #919191;
  border-radius: 5px;
}
.custom_zoomcontrol {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
