<template>
  <div>
    <div>
      <div id="container" style="margin: 0px auto">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div style="float: left">
            <b-link to="/" class="ml-3 h3" id="blink">Happy House</b-link>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="nav navbar-collapse ml-auto">
            <ul class="navbar-nav ml-auto">
              <b-link to="/intro" class="mr-3" id="blink">intro</b-link
              >|&nbsp;&nbsp;
              <b-link to="/house/all" class="mr-3" id="blink">거래조회</b-link
              >|&nbsp;&nbsp;
              <b-link to="/notice" class="mr-3" id="blink">공지사항</b-link
              >|&nbsp;&nbsp;
              <b-link to="/qna" id="blink" class="mr-3">QnA</b-link
              >|&nbsp;&nbsp;
            </ul>
          </div>
          <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent" style="float: right">
            <ul class="nav mr-2 ml-auto" id="link">
              <template v-if="getUser">
                <b-link :to="{ name: 'UserDetail', params: { id: user.id } }" id="blink" class="mr-2"> <b-icon icon="person-circle" class="mr-1" />{{ user.name }}님</b-link>|&nbsp;&nbsp;
                <b-link href="#" @click="logout" id="blink" class="align-self-center"> logout</b-link>
              </template>
              <template v-else>
                <b-link href="/login" class="mr-3" id="blink">LOGIN</b-link>
                <b-link href="/user/regist" class="mr-3" id="blink">JOIN</b-link>
              </template>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <hr />
    <!--#f7f0c8   style="background-color: #ece6cc"-->
    <div>
      <div id="container">
        <ul class="nav justify-content-end mr-2" id="link">
          <template v-if="getUser">
            <b-link :to="{ name: 'UserDetail', params: { id: user.id } }" id="blink" class="mr-2"> <b-icon icon="person-circle" class="mr-1" />{{ user.name }}님</b-link>|&nbsp;&nbsp;
            <b-link href="#" @click="logout" id="blink" class="align-self-center"> logout</b-link>
          </template>
          <template v-else>
            <b-link href="/login" class="mr-3" id="blink">LOGIN</b-link>
            <b-link href="/user/regist" class="mr-3" id="blink">JOIN</b-link>
          </template>
        </ul>
      </div>
      <div id="container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <b-link to="/" class="ml-3 h3" id="blink">Happy House</b-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <b-link to="/intro" class="mr-3" id="blink">intro</b-link>
              <b-link to="/house/all" class="mr-3" id="blink">거래조회</b-link>
              <b-link to="/notice" class="mr-3" id="blink">공지사항</b-link>
              <b-link to="/qna" id="blink">QnA</b-link>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <hr />
    <!--#f7f0c8   style="background-color: #ece6cc"-->

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
