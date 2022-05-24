<template>
  <div>
    <router-view :loginUser="this.loginUser" :isManager="this.isManager" />
  </div>
</template>
<script>
export default {
  name: "HouseView",
  props: {
    user: null,
  },
  data() {
    return {
      loginUser: "",
      isManager: "",
    };
  },
  methods: {
    // searchDong(dongCode) {
    //   axios
    //     .post("http://localhost:8080/happyhouse/house/dong", {
    //       dong: dongCode,
    //     })
    //     .then(({ data }) => {
    //       this.houses = data;
    //       // console.log(this.houses);
    //       // this.$router.push("/house");
    //     })
    //     .catch(({ error }) => {
    //       let msg = "조회 중 문제가 발생했습니다.";
    //       alert(msg);
    //       // this.$router.push("/house");
    //     });
    // },
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
