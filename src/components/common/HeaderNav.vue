<template>
  <div>
    <div class="contents">
      <b-navbar toggleable="lg" class="px-5">
        <b-navbar-brand to="/" class="h3 ml-2">
          <img class="d-inline-block align-top" src="@/assets/img/buildings.png" style="width: 30px" />
          House.zip
        </b-navbar-brand>
        <b-nav-toggle target="nav-collapse"> </b-nav-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto" small>
            <b-nav-item to="/intro" class="mr-3">intro</b-nav-item>
            <b-nav-item to="/house/all" class="mr-3">거래조회</b-nav-item>
            <b-nav-item to="/notice" class="mr-3">공지사항</b-nav-item>
            <b-nav-item to="/qna" class="mr-3">QnA</b-nav-item>

            <template v-if="getUser">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <b-icon icon="person-circle" variant="primary" /> <span class="text-info">{{ user.name }}님</span></template
                >
                <b-nav-item :to="{ name: 'UserDetail', params: { id: user.id } }" class="mr-3 text-right"> <b-icon icon="person-lines-fill" class="mr-1" />MyPage</b-nav-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-nav-item href="#" @click="logout" id="blink" class="mr-3 text-right"> <b-icon icon="box-arrow-left" class="mr-1" />Logout</b-nav-item>
              </b-nav-item-dropdown>
            </template>
            <template v-else>
              <b-nav-item-dropdown right>
                <template #button-content> <b-icon icon="person-circle" class="mr-1" />로그인 하세요.</template>
                <b-nav-item href="/login" class="mr-3 text-right" id="blink"><b-icon icon="box-arrow-in-right" class="mr-2" />LOGIN</b-nav-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-nav-item href="/user/regist" class="mr-3 text-right" id="blink"><b-icon icon="pencil" class="mr-1" />JOIN</b-nav-item>
              </b-nav-item-dropdown>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
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
