<template>
  <div class="home">
    <!-- Header-->

    <!-- <b-jumbotron>
      <div>
        <img class="mb-4" src="@/assets/house_rogo.png" />
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>welcome to house</h4></span>
      </div>
    </b-jumbotron> -->
    <div class="text-center">
      <img class="mt-5 mb-4" src="@/assets/house_rogo.png" />
      <h1 class="font-weight-bold display-4 mb-4">Happy House</h1>
      <hr />
      <span style="font-size: 25px"><h4>welcome to house</h4></span>
    </div>
    <!-- Main Content-->
    <!-- <div class="container mb-4">
      <b-card-group deck>
        <b-card header="부동산 관련 최신 뉴스">
          <b-list-group>
            <b-list-group-item v-for="(news, index) in newslist" :key="index" :href="news.url" target="_blank" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ news.title }}</h5>
                <small class="text-muted">{{ news.time }}</small>
              </div>
              <p class="mb-1 mt-2">
                {{ news.content }}
              </p>
              <small class="text-muted">뉴스 기사로 이동하기</small>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  props: {
    user: null,
  },
  data() {
    return {
      newslist: {
        type: Array,
      },
      //     loginUser: "",
      //     isManager: "",
    };
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/crawling/").then(({ data }) => {
      this.newslist = data;
    });
    // if (this.user) {
    //   this.loginUser = this.user.id;
    //   this.isManager = this.user.manager;
    // } else {
    //   this.loginUser = null;
    //   this.isManager = null;
    // }
  },
};
</script>

<style scoped>
/* .home {
  height: 40vh;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}
.home::after {
  width: 100%;
  height: 80px;
  content: "";
  background: url("@/assets/home-bg.jpg");
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.65;
} */
</style>
