<template>
  <div>
    <b-navbar toggleable="lg" style="background-color: #ece6cc">
      <b-navbar-brand to="/" class="ml-3">Happy House</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/intro" class="mr-3">intro</b-nav-item>
          <b-nav-item-dropdown>
            <template #button-content>거래조회</template>
            <b-dropdown-item href="/house/all">전체조회</b-dropdown-item>
            <b-dropdown-item href="/house/dong">동별조회</b-dropdown-item>
            <b-dropdown-item href="/house/apt">아파트별조회</b-dropdown-item>
          </b-nav-item-dropdown>
          <div v-if="getUser">
            <b-nav-item href="#" @click="logout">로그아웃</b-nav-item>
            <b-nav-item to="/about" class="mr-3">mypage</b-nav-item>
          </div>
          <div v-else>
            <b-nav-item to="/login" class="ml-3 mr-3">login</b-nav-item>
            <b-nav-item to="/about" class="mr-3">siginup</b-nav-item>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "HeaderNav",

  props: {
    user: null,
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
  computed: {
    getUser() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
