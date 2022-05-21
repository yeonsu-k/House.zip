<template>
  <div>
    <!-- Header-->
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4">Welcome</h1>
        <hr />
        <span style="font-size: 25px"><h4>login page</h4></span>
      </div>
    </b-jumbotron>
    <div class="container">
      <div class="container px-4 px-lg-5">
        <div class="justify-content-center">
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
          <div class="d-grid">
            <button class="btn" style="background-color: #ece6cc; width: 100%" id="loginBtn" @click="login">로그인</button>
          </div>
        </div>
        <div class="mt-1 text-end">
          <a href="${root}/user/findpwd">
            <h6 style="color: #ffbf00">비밀번호 찾기</h6>
          </a>
        </div>
      </div>
    </div>
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
.jumbotron {
  height: 40vh;
  text-align: center;
  position: relative;
  z-index: 1;
}
.jumbotron::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/login-bg.jpg");
  background-position: center;
  background-size: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.65;
}
.jumbotron > div {
  width: 70%;
  display: inline-block;
}
</style>
