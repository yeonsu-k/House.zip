<template>
  <div>
    <b-row style="display: flex; width: 100%; height: 100%">
      <b-col cols="3">
        <div>
          <h4>{{ house.aptName }}</h4>
        </div>
        <div v-if="deals.length">
          <b-table-simple hover striped responsive class="text-center">
            <b-thead>
              <b-tr>
                <b-th>층</b-th>
                <b-th>면적</b-th>
                <b-th>거래년도</b-th>
                <b-th>거래유형</b-th>
                <b-th>금액(단위:만원)</b-th>
                <b-th>찜하기</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(deal, index) in deals" :key="index" class="m-2">
                <b-td>{{ deal.floor }}</b-td>
                <b-td>{{ deal.area }}</b-td>
                <b-td>{{ deal.dealYear }}</b-td>
                <b-td>{{ deal.dealType }}</b-td>
                <b-td v-if="deal.dealType == '매매'">{{ deal.dealAmount }}</b-td>
                <b-td v-if="deal.dealType == '전세'">{{ deal.rentMoney }}</b-td>
                <b-td v-if="deal.dealType == '월세'">{{ deal.rentMoney }} / 월 {{ deal.dealAmount }}</b-td>
                <b-td>
                  <b-button variant="outline-danger" @click="interestCheck(deal.no)" style="border: none; outline: none">
                    <b-icon v-if="status == deal.no" icon="heart-fill" /> <b-icon v-else icon="heart" />
                  </b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
        <div v-else>
          <b-row>
            <b-col><b-alert show>매물이 없습니다.</b-alert></b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="9">
        <!-- 지도 -->
        <div class="mb-4" id="map" style="height: 85vh"></div>
        <!-- <div id="map" style="display: flex; width: 100%; height: 85vh; padding-left: 0px; padding-right: 0px"></div> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HouseDealList",
  props: {
    loginUser: null,
    isManager: null,
    dongCode: null,
  },
  data() {
    return {
      status: false,
      house: null,
      deals: [],
    };
  },
  created() {
    // if (!this.loginUser) {
    //   alert("로그인이 필요합니다.");
    //   this.$router.push("/login");
    //   return;
    // }
    this.house = this.$route.params.house;
    axios
      .post("http://localhost:8080/happyhouse/house/apt/", {
        aptCode: this.$route.params.house.aptCode,
      })
      .then(({ data }) => {
        // console.log(data);
        this.deals = data;
      });
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      this.displayMarker();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7f40405e29341c1fa46226d9889e981a&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    interestCheck(no) {
      console.log(no);
    },
    initMap() {
      const container = document.getElementById("map");
      const latlng = new kakao.maps.LatLng(this.house.lat, this.house.lng);
      const options = {
        center: latlng,
        level: 1,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    displayMarker() {
      // if (this.markers.length > 0) {
      //   this.markers.forEach((marker) => marker.setMap(null));
      // }
      this.markers = [];

      let i = 0;
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      // this.houses.forEach((house) => {
      let coords = new kakao.maps.LatLng(this.house.lat, this.house.lng);

      let marker = new kakao.maps.Marker({
        map: this.map,
        position: coords,
        title: this.house.aptName,
        image: markerImage,
        clickable: true,
      });
      let infowindow = new kakao.maps.InfoWindow({
        position: coords,
        content: '<div style="padding:10px;text-align:center;width:200px">' + this.house.aptName + "</div>", // 인포윈도우에 표시할 내용
      });

      // kakao.maps.event.addListener(marker, "mouseover", this.makeOverListener(this.map, marker, infowindow));
      // kakao.maps.event.addListener(marker, "mouseout", this.makeOutListener(infowindow));
      // kakao.maps.event.addListener(marker, "click", function () {
      //   alert(house.aptName + " " + house.aptCode);
      // });
      i++;
      this.markers.push(marker);
      if (i == 1) {
        this.map.panTo(coords);
      }
      // });
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

<style></style>
