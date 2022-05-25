<template>
  <div class="container">
    <h4 style="font-weight: bold">관심 매물</h4>
    <hr />
    <div v-for="(aptinfo, index) in aptinfos" :key="index">
      <div>
        <b-card
          :title="aptinfo.aptName"
          img-src="http://drive.google.com/uc?export=view&id=13FYqvOX6ONeR2Ae2Za-sSKO8SSRHcf3W"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text> {{ aptinfo.dongName }} {{ aptinfo.infoType.trim() }}</b-card-text>
          <b-card-text> {{ aptinfo.buildYear }}년 건축 </b-card-text>

          <b-button :to="{ name: 'HouseDealList', params: { aptCode: aptinfo.aptCode } }" variant="primary">매물 조회하러 가기</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserDetail",
  props: {
    loginId: null,
  },
  data() {
    return {
      intedeals: [],
      aptinfos: [],
    };
  },
  methods: {
    isManager() {
      return localStorage.getItem("isManager");
    },
  },
  created() {
    this.intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
    if (this.intedeals) {
      // intedeals = [];
      let arr = [];
      for (let i = 0; i < this.intedeals.length; i++) {
        arr[i] = this.intedeals[i].aptno;
      }
      console.log(arr);

      axios
        .post(
          "http://localhost:8080/happyhouse/house/interest",
          {
            aptCode: arr,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset = utf-8",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then(({ data }) => {
          this.aptinfos = data;
          // this.user = data;
          // this.user.category.split(",").forEach((element) => {
          //   this.options[parseInt(element)].checked = true;
          // });
          // if (this.user.interestSidoCode) {
          //   this.sidoCode = this.user.interestSidoCode;
          //   this.getGugun();
          //   this.gugunCode = this.user.interestGugunCode;
          // }
        })
        .catch(({ error }) => {
          alert("조회 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });

      // for (let i = 0; i < intedeals.length; i++) {
      //   if (intedeals[i].aptno === this.$route.params.aptCode) {
      //     intedeals.splice(i, 1);
      //     this.intereststatus = false;
      //     alert("삭제 완료");
      //     break;
      //   }
      // }
      // sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
    }
  },
};
</script>
