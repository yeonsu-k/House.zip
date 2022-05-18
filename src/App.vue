<template>
  <div id="app">
    <header-nav :user="user" @logout="logout"></header-nav>
    <router-view :user="user" @login="login"></router-view>
    <footer-view></footer-view>
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
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      this.user = null;
      this.$router.push({ name: "Home" });
    },
    login(user) {
      axios.post("http://localhost:8080/happyhouse/user/login", { id: user.id, password: user.password }).then(({ data }) => {
        this.user = data;
        if (this.user) {
          // localStorage.setItem("loginUser", this.user.id);
          this.$router.push({ name: "Home" });
        } else {
          alert("로그인 실패");
        }
      });
    },
  },
};
</script>
<style></style>
