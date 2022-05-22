<template>
  <div class="home">
    <div>
      <b-overlay show opacity="0.2">
        <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators :interval="3800">
          <b-carousel-slide>
            <img slot="img" class="sliders" src="@/assets/img/slider1.jpg" />
          </b-carousel-slide>
          <b-carousel-slide>
            <img slot="img" class="sliders" src="@/assets/img/slider2.jpg" />
          </b-carousel-slide>
          <b-carousel-slide>
            <img slot="img" class="sliders" src="@/assets/img/slider3.jpg" />
          </b-carousel-slide>
        </b-carousel>
        <template #overlay>
          <h1 class="sliderfont font-weight-bold text-center text-light">HAPPY HOUSE</h1>
        </template>
      </b-overlay>
    </div>
    <!-- <header-nav :user="user" @logout="logout"></header-nav> -->
    <div class="mt-5 mb-4 text-center">
      <b-button size="lg" style="background-color: antiquewhite">추천 매물 및 부동산 뉴스 보기</b-button>
      <!-- <img class="mt-5 mb-4" src="@/assets/img/house_rogo.png" />
      <h1 class="font-weight-bold display-4 mb-4">Happy House</h1>
      <hr />
      <span style="font-size: 25px"><h4>welcome to house</h4></span> -->
    </div>

    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row class="text-center">
        <b-col cols="5" class="p-3 mb-2 bg-info text-white">1 of 3</b-col>
        <b-col cols="3">
          <b-row class="text-center">
            <b-col class="p-3 mb-2 bg-info text-white">1 of 2</b-col>
          </b-row>
          <b-row class="text-center">
            <b-col class="p-3 mb-2 bg-warning text-white">2 of 2 </b-col>
          </b-row>
        </b-col>
        <b-col cols="4" class="p-3 mb-2 bg-warning text-dark">
          <div class="container mb-4">
            <b-card-group deck>
              <b-card header="부동산 관련 최신 뉴스">
                <b-list-group>
                  <b-list-group-item v-for="(news, index) in newslist" :key="index" :href="news.url" target="_blank" class="flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                      <div class="mb-1 font-weight-bold">{{ news.title }}</div>
                      <small class="text-muted">{{ news.time }}</small>
                    </div>
                    <div class="mb-1 mt-2">
                      {{ news.content }}
                    </div>
                    <small class="text-muted">뉴스 기사로 이동하기</small>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </b-card-group>
          </div></b-col
        >
      </b-row>
    </b-container>
    <!-- Main Content-->
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
.sliders {
  width: 100%;
  height: 35vw;
}
.sliderfont {
  text-shadow: 3px 2px 2px gray;
  font-size: 4vw;
}
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
