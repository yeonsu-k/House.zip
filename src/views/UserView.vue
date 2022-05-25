<template>
  <div>
    <router-view :loginId="loginId" @logout="logout" @create-user="createUser" @update-user="updateUser" @delete-user="deleteUser" />
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
        .post("http://localhost:8080/happyhouse/userregist", {
          id: user.id,
          password: user.password,
          name: user.name,
          email: user.email,
          tel: user.tel,
          category: user.category,
          interestSidoCode: user.interestSidoCode,
          interestGugunCode: user.interestGugunCode,
        })
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
    updateUser(user) {
      axios
        .put(
          "http://localhost:8080/happyhouse/user/" + user.id,
          {
            id: user.id,
            password: user.password,
            name: user.name,
            email: user.email,
            tel: user.tel,
            category: user.category,
            interestSidoCode: user.interestSidoCode,
            interestGugunCode: user.interestGugunCode,
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
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data == 1) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push({ name: "Home" });
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
    deleteUser(user) {
      axios
        .delete("http://localhost:8080/happyhouse/user/" + user.id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset = utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data == 1) {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          this.$emit("logout");
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped></style>
