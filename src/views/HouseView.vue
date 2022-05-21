<template>
  <div>
    <!-- Header-->
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>welcome to house</h4></span>
      </div>
    </b-jumbotron>
    <b-form-radio-group v-model="selected" :options="options" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled" @change="radioChange()"></b-form-radio-group>

    <div v-if="selected == 'A'">
      <house-search-bar @search-apt="searchApt"></house-search-bar>
    </div>
    <div v-else>
      <house-search-road @search-road="searchRoad" :roadAddress="roadAddress"></house-search-road>
    </div>
    <router-view :loginUser="this.loginUser" :isManager="this.isManager" :houses="houses" :x="x" :y="y" :dongCode="dongCode" />
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
      dongCode: "",
    };
  },
  methods: {
    radioChange() {
      if (this.selected == "A") {
        this.x = "";
        this.y = "";
        this.dongCode = "";
      }
    },
    searchRoad(data) {
      this.x = data.x;
      this.y = data.y;
      this.dongCode = data.dongCode;
      this.searchDong(this.dongCode);
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
      console.log("this.gugunCode " + gugunCode);
      axios
        .post("http://localhost:8080/happyhouse/house/all", {
          gugun: gugunCode,
        })
        .then(({ data }) => {
          this.houses = data;
          console.log(this.houses);
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
  background: url("@/assets/mypage-bg.jpg");
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
