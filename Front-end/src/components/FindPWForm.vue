<template>
  <div id="main">
    <b-container>
      <b-row class="container" align-h="center" style="height: 78vh">
        <b-col md="6" class="shadow py-5 px-5" id="user_col">
          <h1>비밀번호 찾기</h1>
          <hr />
          <form>
            <div class="form-floating">
              <label for="id">ID</label>
              <b-input class="form-control mb-3" id="id" v-model="id" type="text" />
            </div>
            <div class="form-floating">
              <label for="name">이름</label>
              <b-input class="form-control mb-3" id="name" v-model="name" type="text" />
            </div>
            <div class="form-floating">
              <label for="email">이메일</label>
              <b-input class="form-control mb-3" id="email" v-model="email" type="text" />
            </div>
          </form>
          <!-- Login Button-->
          <button class="btn mb-3" style="background-color: #ece6cc; width: 100%" @click="find">비밀번호 찾기</button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      id: "",
      name: "",
      email: "",
    };
  },
  methods: {
    find() {
      axios
        .put(
          "/housezip/findpwd/",
          {
            id: this.id,
            name: this.name,
            email: this.email,
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
          let msg = "일치하는 정보가 없습니다.";
          if (data == 1) {
            msg = "비밀번호가 1234@로 초기화되었습니다.\n개인정보 보호를 위해 비밀번호를 수정해주세요! ";
          }
          alert(msg);
          this.$router.push({ name: "Home" });
        })
        .catch(({ error }) => {});
    },
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
#main::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/img/slider3.jpg");
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
#user_col {
  border-radius: 80px 40px;
  background-color: white;
  align-self: center;
}
</style>
