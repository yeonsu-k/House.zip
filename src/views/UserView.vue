<template>
  <div>
    <router-view :loginId="loginId" @create-user="createUser" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserView",
  props: {
    loginId: null,
  },
  methods: {
    createUser(user) {
      axios
        .post(
          "http://localhost:8080/happyhouse/userregist",
          {
            id: user.id,
            password: user.password,
            name: user.name,
            email: user.email,
            tel: user.tel,
            category: user.category,
            interestSidoCode: user.interestSidoCode,
            interestGugunCode: user.interestGugunCode,
          }
          // {
          //   headers: {
          //     "Access-Control-Allow-Origin": "*",
          //     "Content-Type": "application/json; charset = utf-8",
          //     Authorization: "Bearer " + localStorage.getItem("jwt"),
          //   },
          // }
        )
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data == 1) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push({ name: "Home" });
        })
        .catch(({ error }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";

          alert(msg);
          this.$router.push({ name: "Home" });
        });
    },
  },
};
</script>

<style scoped></style>
