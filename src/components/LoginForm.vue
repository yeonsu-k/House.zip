<template>
  <div id="main">
    <b-container>
      <b-row class="container row" align-h="center" style="height: 78vh">
        <b-col md="6" class="shadow py-5 px-5" id="user_col">
          <h1>Login</h1>
          <hr />
          <form>
            <div class="form-floating">
              <label for="id">ID</label>
              <b-input class="form-control mb-3" id="id" v-model="id" type="text" />
            </div>
            <div class="form-floating">
              <label for="password">Password</label>
              <b-input class="form-control mb-3" id="password" v-model="password" name="userpwd" type="password" autocomplete="on" />
            </div>
          </form>
          <!-- Login Button-->
          <!-- 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 -->
          <button class="btn mb-3" style="background-color: #ece6cc; width: 100%" @click="login">로그인</button>
          <div class="text-right">
            <b-link to="${root}/user/findpwd">
              <h6 style="color: #ffbf00">비밀번호 찾기</h6>
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    login() {
      let user = {
        id: this.id,
        password: this.password,
      };
      this.$emit("login", user);
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
