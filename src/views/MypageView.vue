<template>
  <div>
    <div id="head">
      <p class="text-center h1">My page</p>
    </div>
    <b-container class="my-4">
      <b-row class="row">
        <b-col cols="2" class="text-center">
          <ul class="nav flex-column">
            <li class="nav-item">
              <b-link class="nav-link" :to="{ name: 'UserDetail', params: { id: loginId } }">정보수정</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-link" :to="{ name: 'MyInterest', params: { id: loginId } }">관심매물</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-link" :to="{ name: 'MyQna', params: { id: loginId } }">나의질문</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-link" @click="deleteUser">회원탈퇴</b-link>
            </li>
          </ul>
        </b-col>
        <b-col class="shadow py-4" style="max-height: 100%; min-height: 500px">
          <router-view id="view" :loginId="loginId" @logout="logout" @update-user="updateUser" />
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
  data() {
    return {
      isManager: false,
    };
  },
  created() {
    this.isManager = JSON.parse(localStorage.getItem("isManager"));
  },
  methods: {
    deleteCheck() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("정말로 탈퇴하시겠습니까?", {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.deleteUser();
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    updateUser(user) {
      axios
        .put(
          "/happyhouse/user/" + user.id,
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
            localStorage.setItem("loginName", user.name);
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
      console.log(this.loginId);
      axios
        .delete("/happyhouse/user/" + this.loginId, {
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
#user_col {
  height: 70vh;
  border: 1px solid lightgray;
  overflow: auto;
  background-color: white;
  align-self: center;
}
#user_col::-webkit-scrollbar {
  display: none;
}
.nav-link {
  font-weight: bold;
  color: #48608a;
  margin: 1px 0;
}
a:link {
  color: #48608a;
}
a:hover {
  color: rgb(231, 118, 118);
}
</style>
