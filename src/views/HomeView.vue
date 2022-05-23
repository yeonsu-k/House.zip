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
    <!-- <div class="mt-5 mb-4 text-center">
      <h4 class="font-weight-bold text-center">happyhouse</h4>
      <img class="mb-2" src="@/assets/img/house_rogo.png" />
    </div> -->

    <div class="mt-5 mb-4">
      <b-row style="width: 90vw; margin: 0 auto">
        <b-col>
          <div class="px-2">
            <h4>추천매물 / 관심매물</h4>
            <b-card-group deck>
              <b-card>
                <!-- <img class="card-img img-fluid mb-5" src="@/assets/img/test1.jpg" /> -->
                <img class="card-img img-fluid mb-5" style="height: 18vw" src="@/assets/img/test1.jpg" />
                <h4>연립다세대</h4>
                <b-card-text
                  ><br />
                  <p>주변 매물보다 2%저렴한 편!</p>
                  <br /><small> 가까운 지하철역이 5분거리 내에 있어요!</small>
                </b-card-text>
                <template #footer>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </template>
              </b-card>

              <b-card>
                <img class="card-img img-fluid mb-5" style="height: 18vw" src="@/assets/img/test3.jpg" />
                <b-card-text>
                  <h4>아파트</h4>
                  <br />
                  <p>신호부부가 많이 살은 곳!</p>
                  <br /><small
                    ><br />
                    주변 마트 3분거리!</small
                  >
                </b-card-text>
                <template #footer>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </template>
              </b-card>

              <b-card>
                <img class="card-img img-fluid mb-5" style="height: 18vw" src="@/assets/img/test2.jpg" />

                <h4>오피스텔</h4>
                <b-card-text
                  ><br />
                  <p>신축 건물이예요!</p>
                  <br /><small
                    ><br />
                    역세권 11분! 강남역까지 차로 30분 거리</small
                  >
                </b-card-text>

                <template #footer>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </template>
              </b-card>
              <!-- <b-card title="Title" img-src="https://placekitten.com/g/300/460" img-alt="Image" img-top>
                <b-card-text> This card has supporting text below as a natural lead-in to additional content. </b-card-text>
                <template #footer>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </template>
              </b-card> -->

              <!-- <b-card title="Title" img-src="https://placekitten.com/g/300/440" img-alt="Image" img-top>
                <b-card-text>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
                </b-card-text>
                <template #footer>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </template>
              </b-card> -->
            </b-card-group>
          </div>
          <!--고양이 끝-->
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <b-card-group deck>
                <b-card header="공지사항">
                  <b-list-group>
                    <b-list-group-item v-for="(notice, index) in notices" :key="index" :to="{ name: 'NoticeDetail', params: { no: notice.no } }" target="_blank" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1 font-weight-bold"><b-icon icon="caret-right-fill" class="mr-1"></b-icon>{{ notice.title }}</div>
                        <small class="text-muted ml-auto px-1">{{ notice.regtime }}</small>
                      </div>
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
              </b-card-group>
              <hr />

              <b-card-group deck>
                <b-card header="부동산 관련 최신 뉴스">
                  <b-list-group>
                    <b-list-group-item v-for="(news, index) in newslist" :key="index" :href="news.url" target="_blank" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <div class="font-weight-bold">{{ news.title }}</div>
                        <small class="text-muted">{{ news.time }}</small>
                      </div>
                      <!-- <div class="mb-1 mt-2">
                        {{ news.content }}
                      </div>
                      <small class="text-muted">뉴스 기사로 이동하기</small> -->
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
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
      notices: {
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
    axios
      .get("http://localhost:8080/happyhouse/notice/", { params: { sortCal: "regtime", sortVal: "desc", limit: 5, offset: 0 } })
      .then(({ data }) => {
        this.notices = data;
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
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
</style>
