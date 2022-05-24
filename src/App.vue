<template>
  <div id="app">
    <header-nav :loginId="loginId" :loginName="loginName" @logout="logout"></header-nav>
    <router-view :loginId="loginId" @logout="logout" @login="login"></router-view>
    <footer-view v-if="$route.name != 'house' && $route.name != 'HouseAll'"></footer-view>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
import FooterView from "@/components/common/FooterView.vue";
import axios from "axios";
export default {
  components: {
    HeaderNav,
    FooterView,
  },
  created() {
    this.loginId = localStorage.getItem("loginId");
    if (this.loginId) {
      this.loginName = localStorage.getItem("loginName");
    }
  },
  data() {
    return {
      loginId: null,
      loginName: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("loginId");
      localStorage.removeItem("loginName");
      this.$router.push({ name: "Home" });
      this.loginId = "";
      this.loginName = "";
    },
    login(user) {
      axios
        .post("http://localhost:8080/happyhouse/auth/login", { id: user.id, password: user.password })
        .then((response) => {
          console.log(response.data);
          if (!response.data.status) {
            alert("로그인 실패");
          } else {
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            // axios.defaults.headers.common["jwt-auth-token"] = response.data.auth_token;
            // accessToken을 localStorage, cookie 등에 저장하지 않는다!
            // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.auth_token}`;
            console.log(response.data.data);
            localStorage.setItem("jwt", response.data.auth_token);
            localStorage.setItem("loginId", response.data.data.id);
            localStorage.setItem("loginName", response.data.data.name);
            localStorage.setItem("isManager", response.data.data.manager);
            this.loginId = response.data.data.id;
            this.loginName = response.data.data.name;
            this.$router.push({ name: "Home" });
          }
        })
        .catch((error) => {
          alert("로그인 실패");
        });
    },
  },
};
</script>
<style>
#add {
  margin: 0;
  padding: 0;
}
</style>
