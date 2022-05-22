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
    <div>
      <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators img-width="1024" img-height="480">
        <b-carousel-slide caption="First Slide" img-src="@/assets/home-bg"></b-carousel-slide>
        <b-carousel-slide caption="Second Slide" img-src="https://picsum.photos/1024/480/?image=12"></b-carousel-slide>
        <b-carousel-slide caption="Third Slide" img-src="https://picsum.photos/1024/480/?image=22"></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="text-center">
      <img class="mt-5 mb-4" src="@/assets/img/house_rogo.png" />
      <h1 class="font-weight-bold display-4 mb-4">Happy House</h1>
      <hr />
      <span style="font-size: 25px"><h4>welcome to house</h4></span>
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
