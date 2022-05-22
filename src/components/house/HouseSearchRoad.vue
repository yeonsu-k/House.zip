<template>
  <b-row class="ml-2 mr-2 mb-2 my-1 text-center">
    <b-col sm="8">
      <b-form-input v-model="roadAddress" placeholder="도로명 주소" readonly></b-form-input>
    </b-col>
    <b-col sm="2">
      <b-button variant="outline-info" @click="execDaum()">찾기</b-button>
    </b-col>
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  name: "HouseSearchRoad",
  data() {
    return {
      roadAddress: "",
      x: "",
      y: "",
      dongCode: "",
      result: "",
    };
  },
  methods: {
    execDaum() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // console.log(data); //법정동코드
          console.log(data.bcode); //법정동코드
          console.log(data.roadAddress); //도로명주소
          this.dongCode = data.bcode;
          this.roadAddress = data.roadAddress;
          var config = { headers: { Authorization: "KakaoAK 31e557edd0f33fd488f045aced289e23" } };
          var url = "https://dapi.kakao.com/v2/local/search/address.json?query=" + data.roadAddress;
          console.log(url);
          axios.get(url, config).then((response) => {
            let documents = JSON.parse(JSON.stringify(response.data)).documents;
            this.x = documents[0].address.x;
            this.y = documents[0].address.y;
            // console.log("this.x: " + this.x);
            // console.log("this.y: " + this.y);
            this.searchRoad();
          });
        },
      }).open();
    },
    searchRoad() {
      let data = { dongCode: this.dongCode, x: this.x, y: this.y };
      this.$emit("search-road", data);
    },
  },
};
</script>

<style></style>
