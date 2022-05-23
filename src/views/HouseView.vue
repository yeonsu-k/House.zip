<template>
  <div>
    <!-- <b-container> -->
    <b-row>
      <b-col cols="3">
        <b-form-radio-group class="ml-3" v-model="selected" :options="options" value-field="item" text-field="name" disabled-field="notEnabled" @change="radioChange()"></b-form-radio-group>
        <div v-if="selected == 'A'">
          <house-search-bar class="ml-3 mr-2" @search-apt="searchApt"></house-search-bar>
        </div>
        <div v-else>
          <house-search-road @search-road="searchRoad" :roadAddress="roadAddress"></house-search-road>
        </div>
      </b-col>
      <b-col cols="9"> </b-col>
    </b-row>
    <router-view @update_lv="updateLv" @search-road="searchRoad" :loginUser="this.loginUser" :isManager="this.isManager" :houses="houses" :x="x" :y="y" />
  </div>
</template>
<script>
import axios from "axios";
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseSearchRoad from "@/components/house/HouseSearchRoad.vue";
export default {
  name: "HouseView",
  components: {
    HouseSearchBar,
    HouseSearchRoad,
  },
  props: {
    user: null,
  },
  data() {
    return {
      selected: "A",
      options: [
        { item: "A", name: "시도 구군으로 검색" },
        { item: "B", name: "우편주소로 검색" },
      ],
      houses: [],
      loginUser: "",
      isManager: "",
      roadAddress: "",
      x: "",
      y: "",
      dist: 1,
    };
  },
  methods: {
    updateLv(lv) {
      // console.log("update-" + lv);
      switch (lv) {
        case 1:
          this.dist = 0.4;
          break;
        case 2:
          this.dist = 0.6;
          break;
        case 3:
          this.dist = 1;
          break;
        case 4:
          this.dist = 1.8;
          break;
        case 5:
          this.dist = 2.8;
          break;
        default:
          this.dist = 4.5;
          break;
      }
    },
    radioChange() {
      if (this.selected == "A") {
        this.x = "";
        this.y = "";
      }
    },
    searchRoad(data) {
      // console.log("update-" + data);
      this.x = data.x; //lng
      this.y = data.y;
      // this.dongCode = data.dongCode;
      // console.log(this.x + " : " + this.y);
      // this.searchDong(this.dongCode);
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
          // console.log(this.houses);
          // this.$router.push("/house");
        })
        .catch(({ error }) => {
          let msg = "조회 중 문제가 발생했습니다.";
          alert(msg);
          // this.$router.push("/house");
        });
    },
    searchDong(dongCode) {
      axios
        .post("http://localhost:8080/happyhouse/house/dong", {
          dong: dongCode,
        })
        .then(({ data }) => {
          this.houses = data;
          // console.log(this.houses);
          // this.$router.push("/house");
        })
        .catch(({ error }) => {
          let msg = "조회 중 문제가 발생했습니다.";
          alert(msg);
          // this.$router.push("/house");
        });
    },
    searchApt(gugunCode) {
      this.x = "";
      this.y = "";
      console.log("this.gugunCode " + gugunCode);
      axios
        .post("http://localhost:8080/happyhouse/house/all", {
          gugun: gugunCode,
        })
        .then(({ data }) => {
          this.houses = data;
          // console.log(this.houses);
          // this.$router.push("/house");
        })
        .catch(({ error }) => {
          let msg = "조회 중 문제가 발생했습니다.";
          alert(msg);
          // this.$router.push("/house");
        });
    },
  },
  created() {
    if (this.user) {
      this.loginUser = this.user.id;
      this.isManager = this.user.manager;
    } else {
      this.loginUser = null;
      this.isManager = null;
    }
  },
};
</script>

<style scoped></style>
