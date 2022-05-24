<template>
  <div>
    <!-- <b-container> -->

    <router-view :loginUser="this.loginUser" :isManager="this.isManager" />
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HouseView",
  props: {
    user: null,
  },
  data() {
    return {
      // selected: "A",
      // options: [
      //   { item: "A", name: "시도 구군으로 검색" },
      //   { item: "B", name: "우편주소로 검색" },
      // ],
      // houses: [],
      loginUser: "",
      isManager: "",
      //   roadAddress: "",
      //   x: "",
      //   y: "",
      //   dist: 1,
    };
  },
  methods: {
    // radioChange() {
    //   if (this.selected == "A") {
    //     this.x = "";
    //     this.y = "";
    //   }
    // },

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
