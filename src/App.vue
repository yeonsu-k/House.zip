<template>
  <div id="app">
    <header-nav :user="user" @logout="logout"></header-nav>
    <router-view @login="login"></router-view>
    <footer-view></footer-view>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
import FooterView from "@/components/common/FooterView.vue";
export default {
  components: {
    HeaderNav,
    FooterView,
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      this.user = null;
    },
    login(user) {
      let userList = JSON.parse(localStorage.getItem("userList"));
      let matched = false;

      for (let i = 0; i < userList.length; i++) {
        if (user.id === userList[i].id && user.password === userList[i].password) {
          matched = true;
          break;
        }
      }
      if (matched) {
        this.user = user;
        localStorage.setItem("loginUser", JSON.stringify(user));
        alert("로그인 성공");
        // 메인 화면으로 이동
        // this.$router.push("/");
        this.$router.push({ name: "Home" });
      } else {
        alert("로그인 실패");
      }
    },
  },
};
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
