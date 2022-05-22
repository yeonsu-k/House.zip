<template>
  <div>
    <div>
      <div id="container">
        <b-navbar toggleable="lg">
          <b-navbar-brand to="/" class="ml-3"><h3>Happy House</h3></b-navbar-brand>
          <b-nav-toggle target="nav-collapse"></b-nav-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/intro" class="mr-3">intro</b-nav-item>
              <b-nav-item-dropdown text="거래조회" class="mr-3">
                <b-dropdown-item to="/house/all">전체조회</b-dropdown-item>
                <b-dropdown-item to="/house/dong">동별조회</b-dropdown-item>
                <b-dropdown-item to="/house/apt">아파트별조회</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item to="/notice" class="mr-3">공지사항</b-nav-item>
              <b-nav-item to="/qna" class="mr-3">QnA</b-nav-item>
              <template v-if="getUser">
                <b-nav-item :to="{ name: 'UserDetail', params: { id: user.id } }"> <b-icon icon="person-circle" class="mr-1" />{{ user.name }}</b-nav-item>
                <b-link href="#" @click="logout" id="blink" class="align-self-center"> <b-icon icon="box-arrow-right" class="mr-1" /></b-link>
              </template>
              <template v-else>
                <b-nav-item href="/login" class="mr-3" id="blink">LOGIN</b-nav-item>
                <b-nav-item href="/user/regist" class="mr-3" id="blink">JOIN</b-nav-item>
              </template>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
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

<style scoped>
#blink {
  color: black;
}
</style>
