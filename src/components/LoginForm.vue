<template>
  <div>
    <b-container>
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

<style scoped></style>
