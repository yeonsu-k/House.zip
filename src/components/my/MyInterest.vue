<template>
  <div class="container">
    <h4 style="font-weight: bold">관심 매물</h4>
    <hr />
    <b-card-group deck id="cardGroup">
      <div id="inCard" v-for="(aptinfo, index) in aptinfos" :key="index">
        <div>
          <b-card :title="aptinfo.aptName" :img-src="getImg(aptinfo.aptCode)" img-alt="Image" img-top tag="article" class="mb-2">
            <b-card-text> {{ aptinfo.dongName }} {{ aptinfo.infoType.trim() }}</b-card-text>
            <b-card-text> {{ aptinfo.buildYear }}년 건축 </b-card-text>
            <b-button :to="{ name: 'HouseDealList', params: { aptCode: aptinfo.aptCode } }" variant="primary">매물 조회하러 가기</b-button>
            <!-- <b-button @click="interestCheck(aptinfo.aptCode)" variant="primary">관심매물 해제</b-button> -->
          </b-card>
        </div>
      </div>
    </b-card-group>
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
      aptimg: [
        "http://drive.google.com/uc?export=view&id=1ZYVQv1YrtuyRcXivqkN6IVQ6_jdWJHCR",
        "http://drive.google.com/uc?export=view&id=1Bw1hoGbyv-kMGBckYgv_PwRVJCEtKcI-",
        "http://drive.google.com/uc?export=view&id=1GI8BindQv6G3BE3ONShQUjnYfE-3xLiC",
        "http://drive.google.com/uc?export=view&id=1aukR4qJZUAKXr2RUrQFQnUVBa3DbmOXv",
        "http://drive.google.com/uc?export=view&id=1GhE4xsOeI-_UceRa8A9eIxFD8pPaxj9r",
        "http://drive.google.com/uc?export=view&id=1FMYepfQDuEL78VlxuyKmvMU4EkGEk-Kk",
        "http://drive.google.com/uc?export=view&id=1APtOw7BuJxuVJRf3ANNSE0fbj5vtraL3",
        "http://drive.google.com/uc?export=view&id=1PVIp2PerohL0Hauan_kZTpO2-eaYylpo",
        "http://drive.google.com/uc?export=view&id=1ANWJOk9KEj5zKMHVa8CmYv0dhiTrT74M",
        "http://drive.google.com/uc?export=view&id=1nuWU1FdKTqmOnmim3rmMGeLGV6YX11EV",
      ],
    };
  },
  methods: {
    getImg(aptCode) {
      console.log(parseInt(aptCode));
      return this.aptimg[parseInt(aptCode) % 10];
    },
    isManager() {
      return localStorage.getItem("isManager");
    },
    interestCheck(no) {
      let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));

      for (let i = 0; i < intedeals.length; i++) {
        if (intedeals[i].dealno === no) {
          intedeals.splice(i, 1);
          // console.log(this.deals[index]);
          // this.$set(this.deals[index], "inter", false);
          // console.log(this.deals[index]);

          alert("삭제 완료");

          // console.log(this.deals[index]);
          break;
        }
      }
      sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));

      // this.interest.forEach((element) => {
      //   if (element.no == no) {
      //     alert("이미 관심 매물로 추가되어있습니다.");
      //     return;
      //   }
      // });
      // }
    },
  },
  created() {
    this.intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
    if (this.intedeals && this.intedeals.length) {
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

<style>
#cardGroup {
  text-align: center;
  height: 35rem;
  overflow: auto;
  background-color: white;
  align-self: center;
}
#cardGroup::-webkit-scrollbar {
  display: none;
}
#inCard {
  width: 19rem;

  flex-shrink: 0;
  display: inline-block;
}
</style>
