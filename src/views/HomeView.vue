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

    <b-container class="mt-5 mb-4">
      <b-row>
        <b-col>
          <!-- 추천매물/ 관심매물 -->
          <b-card-group deck>
            <b-card header="추천매물 / 관심매물">
              <b-row v-for="(item, index) in aptinfos" :key="index" no-gutters id="cardRow">
                <b-col md="6">
                  <img class="rounded-0 card-img img-fluid p-1" id="cardRow" src="@/assets/img/test1.jpg" alt="Image" />
                </b-col>
                <b-col md="6">
                  <b-card-body :title="item.aptName">
                    <b-card-text>
                      <p>{{ item.dongName }}에 위치한 {{ item.infoType.trim() }}입니다</p>
                      <small>{{ item.buildYear }}년도에 건축되었어요</small><br />
                      <small> 현재 {{ item.total }}개의 매물이 있는데, <br />보러 가실래요?</small>
                      <b-link :to="{ name: 'HouseDealList', params: { aptCode: item.aptCode } }">보러가기</b-link>
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-col>
        <!--공지사항-->
        <b-col class="w-100">
          <b-row>
            <b-col>
              <b-card-group deck v-if="notices">
                <b-card header="공지사항">
                  <b-list-group>
                    <!-- :to="{ name: 'NoticeDetail', params: { no: notice.no } }" -->
                    <b-list-group-item v-for="(notice, index) in notices" :key="index" href="javascript:void(0);" @click="goNoticeD(notice.no)" class="flex-column align-items-start">
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
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  props: {
    loginId: null,
  },
  data() {
    return {
      newslist: {
        type: Array,
      },
      notices: {
        type: Array,
      },
      lat: 37.541,
      lng: 126.986,
      aptinfos: [],
    };
  },
  created() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude; // 위도
        this.lng = position.coords.longitude; // 경도
        console.log(this.lat);
        console.log(this.lng);
      });
    }
    if (this.loginId) {
      this.intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
      if (this.intedeals && this.intedeals.length) {
        // intedeals = [];
        let arr = [];
        for (let i = 0; i < this.intedeals.length && i < 3; i++) {
          arr[i] = this.intedeals[i].aptno;
        }
        axios
          .post(
            "http://localhost:8080/happyhouse/house/interest",
            {
              aptCode: arr,
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json; charset = utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then(({ data }) => {
            this.aptinfos = [];
            if (data) {
              for (let i = 0; i < 3 && i < data.length; i++) {
                this.aptinfos.push(data[i]);
              }
            }

            if (this.aptinfos.length < 3) {
              this.check();
            }
            console.log(this.aptinfos);
          })
          .catch(({ error }) => {
            alert("조회 중 문제가 생겼습니다. 다시 로그인 해주세요");
            this.$emit("logout");
          });
      } else {
        this.check();
      }
    } else {
      this.check();
    }

    axios.get("http://localhost:8080/happyhouse/crawling/").then(({ data }) => {
      this.newslist = data;
    });

    axios
      .get("http://localhost:8080/happyhouse/notice/", { params: { sortCal: "regtime", sortVal: "desc", limit: 5, offset: 0 } })
      .then(({ data }) => {
        this.notices = data;
      })
      .catch(({ error }) => {
        alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
        this.$emit("logout");
      });
  },
  methods: {
    goNoticeD(no) {
      if (no) {
        this.$router.push({ name: "NoticeDetail", params: { no: no } });
      }
    },
    check() {
      axios
        .post("http://localhost:8080/happyhouse/house/dist", {
          lat: this.lat,
          lng: this.lng,
          dist: 7,
        })
        .then(({ data }) => {
          if (data) {
            for (let i = 0; i < 3 && i < data.length; i++) {
              this.aptinfos.push(data[i]);
              if (this.aptinfos.length == 3) break;
            }
          }
        })
        .catch(({ error }) => {});
    },
  },
};
</script>

<style scoped>
#cardRow {
  border-bottom: 1px solid lightgray;
  max-height: 250px;
}
.card-deck {
  display: flex;
  flex-flow: row wrap;
  margin-right: -15px;
  margin-left: -15px;
  min-height: 350px;
}
.card-body {
  flex: 1 1 auto;

  /* padding: 1.25rem; */
}
.sliders {
  width: 100%;
  height: 35vw;
}
.sliderfont {
  text-shadow: 3px 2px 2px gray;
  font-size: 4vw;
}
</style>
