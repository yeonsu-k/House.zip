<template>
  <div>
    <b-container fluid>
      <b-row align-self="center" class="" style="background-color: #48608a">
        <b-col md="4" class="text-center">
          <b-form-radio-group class="pt-4" style="color: #fff" v-model="selected" :options="options" value-field="item" text-field="name" disabled-field="notEnabled" @change="radioChange()">
          </b-form-radio-group>
        </b-col>
        <b-col>
          <house-search-bar v-if="selected == 'A'" :loginId="loginId" @search-apt="searchApt"></house-search-bar>
          <house-search-road v-else @search-road="searchRoad" :roadAddress="roadAddress"></house-search-road>
        </b-col>
        <!-- <b-col md="1">
          <checkbox v-model="checked" label="체크박스" />
        </b-col> -->

        <!-- <b-form-group label="건물 타입" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group v-model="typeSelected" :options="typeOptions" :aria-describedby="ariaDescribedby" name="flavour-2a" stacked></b-form-checkbox-group>
        </b-form-group> -->
        <!-- {{ typeSelected }} -->

        <!-- <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted"><span class="check" :class="{ on: checked }"></span> </b-form-checkbox> -->

        <!-- <b-col>
          <b-col>카테고리</b-col>
        </b-col> -->
      </b-row>

      <b-row>
        <b-col>
          <!-- 지도 -->
          <!-- <p id="result"></p> -->
          <!-- <div id="map" style="display: flex; width: 100%; height: 85vh; padding-left: 0px; padding-right: 0px"></div> -->
          <div class="map_wrap">
            <div id="map" style="max-width: 100vw; min-height: 82vh; relative; overflow: hidden"></div>
            <div id="table">
              <div v-if="houses.length">
                <b-table-simple hover sticky-header>
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
                    <b-tr v-for="(house, index) in houses" :key="index">
                      <b-td>{{ index + 1 }}</b-td>
                      <b-td>
                        <router-link :to="{ name: 'HouseDealList', params: { aptCode: house.aptCode } }">{{ house.aptName }}</router-link>
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
                  <b-col id="alertT"><p class="p-2">주택 목록이 없습니다.</p></b-col>
                </b-row>
              </div>
            </div>
            <ul id="category">
              <li id="SW8" data-order="0" style="display: none">지하철역</li>
              <li id="HP8" data-order="1" style="display: none">병원</li>
              <li id="PM9" data-order="2" style="display: none">약국</li>
              <li id="MT1" data-order="3" style="display: none">마트</li>
              <li id="PS3" data-order="4" style="display: none">유치원</li>
              <li id="SC4" data-order="5" style="display: none">학교</li>
              <li id="AC5" data-order="6" style="display: none">학원</li>
              <li id="CT1" data-order="7" style="display: none">문화</li>
              <li id="FD6" data-order="8" style="display: none">식당</li>
              <li id="CE7" data-order="9" style="display: none">카페</li>
            </ul>
            <div v-if="show" id="custom_filter">
              <div id="maker_name">
                <checkbox v-model="checked" label="체크박스" />
                <!-- <b-row>
                  <b-col cols="3">
                    <b-img src="http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt" right style="height: 40px"></b-img>
                  </b-col>
                  <b-col cols="3"><b-img src="http://drive.google.com/uc?export=view&id=1XfXxlgJua7Y3BzxI4ugGGFBfJcPMOXmT" right style="height: 40px"></b-img></b-col>
                  <b-col cols="3"><b-img src="http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu" right style="height: 40px"></b-img></b-col>
                </b-row>
                <b-row>
                  <b-col cols="3"><b-badge variant="light">아파트</b-badge></b-col> <b-col cols="3"><b-badge variant="light">다세대</b-badge></b-col>
                  <b-col cols="3"><b-badge variant="light">오피스텔</b-badge></b-col>
                </b-row> -->
              </div>
            </div>
            <!-- <button @click="show = !show" id="custom_m">필터</button>
            <transition name="fade">
              <div v-if="show" id="custom_filter">
                <br />
                <b-form-group label="건물 타입" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox-group v-model="typeSelected" :options="typeOptions" :aria-describedby="ariaDescribedby" name="flavour-2a" stacked></b-form-checkbox-group>
                </b-form-group>
                <br />
                <b-form-group label="거래 타입" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox-group v-model="typeDealSelected" :options="typeDealOptions" :aria-describedby="ariaDescribedby" name="flavour-2a" stacked></b-form-checkbox-group>
                </b-form-group>
              </div>
            </transition> -->
            <!-- <div id="maker_name">
              <b-row>
                <b-col cols="3">
                  <b-img src="http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt" right style="height: 40px"></b-img>
                </b-col>
                <b-col cols="3"><b-img src="http://drive.google.com/uc?export=view&id=1XfXxlgJua7Y3BzxI4ugGGFBfJcPMOXmT" right style="height: 40px"></b-img></b-col>
                <b-col cols="3"><b-img src="http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu" right style="height: 40px"></b-img></b-col>
              </b-row>
              <b-row>
                <b-col cols="3"><b-badge variant="light">아파트</b-badge></b-col> <b-col cols="3"><b-badge variant="light">다세대</b-badge></b-col>
                <b-col cols="3"><b-badge variant="light">오피스텔</b-badge></b-col>
              </b-row>
            </div> -->
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseSearchRoad from "@/components/house/HouseSearchRoad.vue";
import Checkbox from "@/components/house/Checkbox.vue";

export default {
  name: "HouseAll",
  components: {
    HouseSearchBar,
    HouseSearchRoad,
    Checkbox,
  },
  data() {
    return {
      checked: false,
      show: true,
      user: null,
      markers_op: [],
      markers_apt: [],
      markers_bil: [],
      infowindow: null,
      latlng: null,
      lv: 3,
      selected: "A",
      options: [
        { item: "A", name: "시도 구군으로 검색" },
        { item: "B", name: "우편 주소로 검색" },
      ],
      // houses: [],
      roadAddress: "",
      x: "",
      y: "",
      dist: 0.55,
      houses: [],
      typeSelected: [], // Must be an array reference!
      typeOptions: [
        { text: "아파트", value: "아파트" },
        { text: "연립다세대", value: "연립다세대" },
        { text: "오피스텔", value: "오피스텔" },
      ],
      placeOverlay: null,
      contentNode: null, // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      pl_markers: [], // 마커를 담을 배열입니다
      currCategory: "", // 현재 선택된 카테고리를 가지고 있을 변수입니다
      ps: null,
    };
  },
  watch: {
    typeSelected() {
      this.typeSelected.forEach((element) => {
        console.log(element);
      });
    },
  },
  props: {
    loginId: null,
  },
  created() {
    if (this.loginId) {
      axios
        .get("/happyhouse/user/" + this.loginId, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset = utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then(({ data }) => {
          this.user = data;
          const cate = document.getElementById("category");
          if (this.user.category) {
            this.user.category.split(",").forEach((element) => {
              cate.children[parseInt(element)].style.display = "block";
            });
          }
        });
    }
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
    searchRoad(data) {
      switch (data.lv) {
        case 1:
          this.dist = 0.17;
          break;
        case 2:
          this.dist = 0.28;
          break;
        default:
          this.dist = 0.55;
          break;
      }
      // console.log("update-" + data);
      if (data.x) this.x = data.x; //lng
      if (data.y) this.y = data.y;

      this.latlng = new kakao.maps.LatLng(this.y, this.x);
      this.searchDist(this.y, this.x);
    },
    searchDist(lat, lng) {
      // console.log(this.dist);

      axios
        .post("http://localhost:8080/happyhouse/house/dist", {
          lat: lat,
          lng: lng,
          dist: this.dist,
        })
        .then(({ data }) => {
          this.houses = data;
          if (this.houses) {
            this.markerPositions = [];
            this.houses.forEach((house) => this.markerPositions.push({ title: house.aptName, latlng: new kakao.maps.LatLng(house.lat, house.lng) }));
            this.displayMarker(this.markerPositions);
          }
          // this.$router.push("/house");
        })
        .catch(({ error }) => {
          let msg = "조회 중 문제가 발생했습니다.";
          alert(msg);
          // this.$router.push("/house");
        });
    },
    searchApt(gugunCode) {
      if (!this.map) {
        this.gugunCode = gugunCode;
        return;
      }
      this.x = "";
      this.y = "";
      this.latlng = new kakao.maps.LatLng(33.450701, 126.570667);

      axios
        .post("http://localhost:8080/happyhouse/house/all", {
          gugun: gugunCode,
        })
        .then(({ data }) => {
          if (data && data.length) {
            // this.houses = data;

            this.houses = [];
            this.houses.push(data[0]);
            // this.houses = data;
            this.markerPositions = [];
            this.markerPositions.push({ title: this.houses[0].aptName, latlng: new kakao.maps.LatLng(this.houses[0].lat, this.houses[0].lng) });
            // this.houses.forEach((house) => this.markerPositions.push({ title: house.aptName, latlng: new kakao.maps.LatLng(house.lat, house.lng) }));
            this.displayMarker(this.markerPositions);
          } else {
            this.houses = [];
          }
        })
        .catch(({ error }) => {
          let msg = "조회 중 문제가 발생했습니다.";
          alert(msg);
          // this.$router.push("/house");
        });
    },
    radioChange() {
      if (this.selected == "A") {
        this.x = "";
        this.y = "";
        this.latlng = new kakao.maps.LatLng(33.450701, 126.570667);
      }
    },
    initMap() {
      const container = document.getElementById("map");
      // console.log("this.x:  " + this.x);
      this.latlng = this.x == "" ? new kakao.maps.LatLng(33.450701, 126.570667) : new kakao.maps.LatLng(this.y, this.x);
      const options = {
        center: this.latlng,
        level: this.lv,
      };

      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.contentNode = document.createElement("div"); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      this.pl_markers = []; // 마커를 담을 배열입니다
      this.currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.map.setMinLevel(1);
      this.map.setMaxLevel(3);
      kakao.maps.event.addListener(this.map, "tilesloaded", this.getInfo);

      this.ps = new kakao.maps.services.Places(this.map);

      // 지도에 idle 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);

      // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
      this.contentNode.className = "placeinfo_wrap";

      // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
      // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
      this.addEventHandle(this.contentNode, "mousedown", kakao.maps.event.preventMap);
      // 커스텀 오버레이 컨텐츠를 설정합니다
      this.placeOverlay.setContent(this.contentNode);

      // 각 카테고리에 클릭 이벤트를 등록합니다
      this.addCategoryClickEvent();
      this.addEventHandle(this.contentNode, "touchstart", kakao.maps.event.preventMap);
    },
    getInfo() {
      // 지도의 중심좌표를 얻어옵니다
      var latlng = this.map.getCenter();
      this.lv = this.map.getLevel();
      let data = { lv: this.map.getLevel(), x: latlng.getLng(), y: latlng.getLat() };

      if (this.gugunCode != "") {
        this.searchApt(this.gugunCode);
        this.gugunCode = "";
      } else {
        this.searchRoad(data);
      }
    },
    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다

    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },
    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }

      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, { useMapBounds: true });
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    addMarker(position, order) {
      var imageSrc = "http://drive.google.com/uc?export=view&id=1xwzPqdS-XrKzFhhRwSxTzfXGrcNmVeVg", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.pl_markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    removeMarker() {
      for (var i = 0; i < this.pl_markers.length; i++) {
        this.pl_markers[i].setMap(null);
      }
      this.pl_markers = [];
    },
    addCategoryClickEvent() {
      var category = document.getElementById("category"),
        children = category.children;

      for (var i = 0; i < children.length; i++) {
        children[i].onclick = this.onClickCategory;
      }
    },
    onClickCategory(event) {
      // console.log(event.currentTarget);
      var id = event.currentTarget.id,
        className = event.currentTarget.className;

      this.placeOverlay.setMap(null);

      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeMarker();
      } else {
        this.currCategory = id;
        this.changeCategoryClass(event.currentTarget);
        this.searchPlaces();
      }
    },
    changeCategoryClass(el) {
      var category = document.getElementById("category"),
        children = category.children,
        i;
      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    },
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document.getElementById(this.currCategory).getAttribute("data-order");

      console.log("검색 된 건물 수: " + places.length);
      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);
        // // 마커와 검색결과 항목을 클릭 했을 때
        // // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        // // kakao.maps.event.addListener(marker, "click", function () {
        // //   this.displayPlaceInfo(places[i]);
        // // });

        // // kakao.maps.event.addListener(marker, "click", function () {
        // //   this.displayPlaceInfo(places[i]);
        // // });
        // (function (marker, place) {
        //   kakao.maps.event.addListener(marker, "click", function () {
        //     this.displayPlaceInfo(place);
        //   });
        // })(marker, places[i]);
      }
    },

    displayMarker() {
      if (this.markers_op.length > 0) {
        this.markers_op.forEach((marker) => marker.setMap(null));
      }
      if (this.markers_apt.length > 0) {
        this.markers_apt.forEach((marker) => marker.setMap(null));
      }
      if (this.markers_bil.length > 0) {
        this.markers_bil.forEach((marker) => marker.setMap(null));
      }

      this.markers_op = [];
      this.markers_apt = [];
      this.markers_bil = [];

      let i = 0;
      let imageSrc_apt = "http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt";
      let imageSrc_op = "http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu";
      let imageSrc_bil = "http://drive.google.com/uc?export=view&id=1XfXxlgJua7Y3BzxI4ugGGFBfJcPMOXmT";

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(40, 40);
      // 마커 이미지를 생성합니다
      var markerImage_apt = new kakao.maps.MarkerImage(imageSrc_apt, imageSize);
      var markerImage_op = new kakao.maps.MarkerImage(imageSrc_op, imageSize);
      var markerImage_bil = new kakao.maps.MarkerImage(imageSrc_bil, imageSize);
      let f_coords = new kakao.maps.LatLng(33.450701, 126.570667);

      this.houses.forEach((house) => {
        let coords = new kakao.maps.LatLng(house.lat, house.lng);
        let markerImage = markerImage_op;
        if (house.infoType.trim() == "아파트") {
          markerImage = markerImage_apt;
        } else if (house.infoType.trim() == "연립다세대") {
          markerImage = markerImage_bil;
        }

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
        // kakao.maps.event.addListener(marker, "click", function () {
        //   alert(house.aptName + " " + house.aptCode);
        // });
        i++;

        if (house.infoType.trim() == "아파트") {
          this.markers_apt.push(marker);
        } else if (house.infoType.trim() == "연립다세대") {
          this.markers_bil.push(marker);
        } else {
          this.markers_op.push(marker);
        }
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
.map_wrap,
.map_wrap * {
  margin: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
}
.radius_border {
  border: 1px solid #919191;
  border-radius: 5px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
.b-table-sticky-header {
  overflow-y: auto;
  max-height: 70vh;
}
.b-table-sticky-heade::-webkit-scrollbar {
  display: none;
}
#alertT {
  background-color: lightcyan;
  border-radius: 10px;
}
#table {
  position: absolute;
  top: 50px;
  min-width: 450px;
  left: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background-color: rgb(255, 255, 255, 0.9);
  z-index: 2;
  text-align: center;
  cursor: pointer;
}

#custom_filter {
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 5px;
  /* border: 1px solid #909090; */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background-color: rgb(255, 255, 255, 0.8);
  overflow: hidden;
  z-index: 2;
  float: left;
  list-style: none;
  width: 220px;
  height: 70px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}

#custom_m {
  position: absolute;
  top: 10px;
  right: 40px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#maker_name {
  /* position: absolute; */
  /* bottom: 10px;
  right: 10px; */

  overflow: hidden;
  z-index: 2;
  float: center;
  list-style: none;
  width: 300px;
  height: 70px;
  /* padding: 6px 0; */
  text-align: center;
  cursor: pointer;
}
#category {
  padding: 0;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
