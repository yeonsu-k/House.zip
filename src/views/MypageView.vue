<template>
  <div>
    <div id="head">
      <p class="text-center h1">My page</p>
    </div>
    <b-container>
      <b-row class="py-5">
        <b-col md="3">
          <b-button-group vertical>
            <b-button :to="{ name: 'UserDetail', params: { id: loginId } }">정보수정</b-button>
            <b-button :to="{ name: 'MyInterest', params: { id: loginId } }">관심매물</b-button>
            <b-button :to="{ name: 'MyQna', params: { id: loginId } }">나의질문</b-button>
            <b-button @click="deleteUser">회원탈퇴</b-button>
          </b-button-group>
        </b-col>
        <b-col>
          <router-view :loginId="loginId" @logout="logout" @update-user="updateUser" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MypageView",
  props: {
    loginId: null,
  },
  methods: {
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
    deleteUser() {
      axios
        .delete("http://localhost:8080/happyhouse/user/" + this.loginId, {
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

<style scoped>
#head {
  background-color: #48608a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
  color: lightcyan;
}
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}

#bbtn {
  float: right;
  color: black;
  background-color: #ece6cc;
}
</style>
