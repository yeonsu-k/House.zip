<template>
  <div>
    <div class="map_wrap">
      <div id="map" style="max-width: 100vw; min-height: 91vh; relative; overflow: hidden"></div>
      <ul id="category">
        <li id="SW8" data-order="0" style="display: none">지하철역</li>
        <li id="HP8" data-order="1" style="display: none">병원</li>
        <li id="PM9" data-order="2" style="display: none">약국</li>
        <li id="MT1" data-order="3" style="display: none">마트</li>
        <li id="PS3" data-order="4" style="display: none">유치원</li>
        <li id="SC4" data-order="5" style="display: none">학교</li>
        <li id="AC5" data-order="6" style="display: none">학원</li>
        <li id="CT1" data-order="7" style="display: none">문화</li>
        <li id="FD6" data-order="8" style="display: none">식당</li>
        <li id="CE7" data-order="9" style="display: none">카페</li>
      </ul>
      <div id="detail_info" class="infoView">
        <div v-if="deals.length">
          <span style="font-size: 30px">
            {{ deals[0].aptName }}
            <span @click="interestcheck()" class="align-middle">
              <img v-if="intereststatus" src="@/assets/img/heart-fill.svg" />
              <img v-else src="@/assets/img/heart.svg" />
            </span>
          </span>
        </div>

        <hr style="border-top: 2px dashed #bcbcbc" />
        <b-img :src="getImg()" style="max-height: 250px; min-width: 100%; overflow: hidden" />
        <div>
          <b-button block v-b-toggle.accordion-1 class="mt-2">
            <div>평점 <b-icon v-if="collapseStates[0]" icon="chevron-down" /><b-icon v-else icon="chevron-up" /></div>
          </b-button>
          <b-collapse id="accordion-1" v-model="collapseStates[0]">
            <br />
            <div>전체 평균 평점</div>
            <b-form-rating id="rating-readonly" :value="totalavg" variant="warning" size="lg" readonly show-value show-value-max inline no-border></b-form-rating>
            <div>{{ reviews.length }}명의 리뷰가 있습니다.</div>
            <div v-if="!loginId" class="container my-3">
              <div class="shadow py-3 px-5" style="background: #ffe6e6">거주자 평점 및 리뷰는 회원 전용입니다! <br />로그인해주세요!</div>
            </div>
            <div v-else>
              <div class="mb-1">
                <b-button @click="showMsgBoxTwo">거주자 평점등록</b-button>
              </div>

              <div v-if="user.review">
                <div v-for="(review, index) in reviews" :key="index" class="container my-2">
                  <div class="shadow py-3 px-5">
                    {{ review.time }}년동안 거주한 {{ review.userid }}님 평점! <br />
                    <b-form-rating id="rating-readonly" :value="review.avg" variant="warning" readonly show-value show-value-max inline no-border></b-form-rating><br />
                    <div class="rounded border border-secondary py-3 px-5">
                      출퇴근길: <b-form-rating id="rating-readonly" :value="review.commute" readonly show-value show-value-max inline no-border></b-form-rating><br />
                      주차공간: <b-form-rating id="rating-readonly" :value="review.park" readonly show-value show-value-max inline no-border></b-form-rating><br />
                      방음정도: <b-form-rating id="rating-readonly" :value="review.noise" readonly show-value show-value-max inline no-border></b-form-rating><br />
                      이용시설: <b-form-rating id="rating-readonly" :value="review.facilities" readonly show-value show-value-max inline no-border></b-form-rating><br />
                      리뷰: <br />
                      {{ review.content }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="reviews.length" class="shadow py-3 px-5">
                  {{ reviews[0].time }}년동안 거주한 {{ reviews[0].userid }}님 평점! <br />
                  <b-form-rating id="rating-readonly" :value="reviews[0].avg" variant="warning" readonly show-value show-value-max inline no-border></b-form-rating><br />
                  <div class="rounded border border-secondary py-3 px-5">
                    출퇴근길: <b-form-rating id="rating-readonly" :value="reviews[0].commute" readonly show-value show-value-max inline no-border></b-form-rating><br />
                    주차공간: <b-form-rating id="rating-readonly" :value="reviews[0].park" readonly show-value show-value-max inline no-border></b-form-rating><br />
                    방음정도: <b-form-rating id="rating-readonly" :value="reviews[0].noise" readonly show-value show-value-max inline no-border></b-form-rating><br />
                    이용시설: <b-form-rating id="rating-readonly" :value="reviews[0].facilities" readonly show-value show-value-max inline no-border></b-form-rating><br />
                    리뷰: <br />
                    <pre>{{ reviews[0].content }}</pre>
                  </div>
                </div>
                <div class="container my-3" style="background: #ffe6e6">
                  <div class="shadow py-3 px-5">리뷰를 더 확인하고 싶으신가요? 실제 거주 중인 집의 거주자 평점을 작성하면 HAPPYHOUSE의 모든 회원리뷰를 읽을 수 있습니다.</div>
                </div>
              </div>

              <b-modal
                centered
                ref="my-modal"
                id="modal-prevent-closing"
                title="거주자 평점 등록"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
                v-show="showModal"
                v-on:close="showModal = false"
              >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                  <b-container fluid>
                    <div class="mb-2">
                      <label for="rating-inline" class="mr-3">거주기간 : </label>
                      <b-form-input v-model="review_time" min="1" type="number" id="rating-inline" inline></b-form-input>
                      <small>몇년동안 거주하셨나요?</small>
                    </div>

                    <div class="mb-1">
                      <label for="rating-inline" class="mr-3">출퇴근길 : </label>
                      <b-form-rating v-model="review_commute" show-value show-value-max id="rating-inline" inline></b-form-rating>
                      <br /><small>대중교통이 다양하거나, 출퇴근 시간에 도로가 덜 밀리나요?</small>
                    </div>

                    <div class="mb-1">
                      <label for="rating-inline" class="mr-3">주차공간 : </label>
                      <b-form-rating v-model="review_park" show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                      <br /><small>주차 공간이 많거나, 넓은 가요?</small>
                    </div>

                    <div class="mb-1">
                      <label for="rating-inline" class="mr-3">방음정도 : </label>
                      <b-form-rating v-model="review_noise" show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                      <br /><small>퇴근이나 주말에 소음없이 편안하게 휴식을 즐기시나요?</small>
                    </div>

                    <div class="mb-3">
                      <label for="rating-inline" class="mr-3">이용시설 : </label>
                      <b-form-rating v-model="review_facilities" show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                      <br /><small>주변에 취미를 가질 수 있는 다양한 시설이 있나요?</small>
                    </div>
                    <b-form-group label="거주하는 건물에 대한 이야기를 해주세요!(50자 이상 200자 이하)" label-for="name-input" invalid-feedback="70자이상 작성해주세요" :state="nameState">
                      <b-form-textarea rows="7" id="name-input" v-model="review_content" :state="nameState" required minlength="50" maxlength="200" size="6"></b-form-textarea>
                    </b-form-group>
                  </b-container>
                </form>
              </b-modal>
            </div>
          </b-collapse>

          <b-button block v-b-toggle.accordion-2 class="mt-2">
            <div>
              로드뷰
              <b-icon v-if="collapseStates[1]" icon="chevron-down" />
              <b-icon v-else icon="chevron-up" />
            </div>
          </b-button>
          <b-collapse id="accordion-2" v-model="collapseStates[1]">
            <div id="roadview" style="width: 100%; height: 300px"></div>
          </b-collapse>

          <b-button block v-b-toggle.accordion-3 class="mt-2">
            <div>
              실거래가 리스트
              <b-icon v-if="collapseStatesChart" icon="chevron-down" />
              <b-icon v-else icon="chevron-up" />
            </div>
          </b-button>
          <b-collapse id="accordion-3" v-model="collapseStatesChart">
            <div v-if="deals.length">
              <template v-for="item in dataSetsKey">
                <label :for="`check_${item.index}`" :key="item.label" :style="`color: ${item.color}; margin: 8px;`"
                  ><input :id="`check_${item.index}`" type="checkbox" v-model="filterItem" :value="item.index" />{{ item.label }}</label
                >
              </template>
              <bar-chart
                style="position: relative; height: 20vh"
                :chart-data="filteredDataCollection"
                :options="{
                  responsive: true,
                  maintainAspectRatio: false,
                  labeling: { display: false },
                  legend: {
                    display: false,
                  },
                }"
                v-if="collapseStatesChart"
              />

              <b-tabs card>
                <b-tab no-body title="매매">
                  <div v-if="dealsm.length">
                    <b-table-simple hover striped responsive class="text-center">
                      <b-thead>
                        <b-tr>
                          <b-th>층</b-th>
                          <b-th>면적</b-th>
                          <b-th>거래년도</b-th>
                          <b-th>거래유형</b-th>
                          <b-th>금액</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody>
                        <b-tr v-for="(deal, index) in dealsm" :key="index" class="m-2">
                          <b-td>{{ deal.floor }}</b-td>
                          <b-td>{{ deal.area }}</b-td>
                          <b-td>{{ deal.dealYear }}</b-td>
                          <b-td>{{ deal.dealType }}</b-td>
                          <b-td v-if="deal.dealType == '매매'">{{ replaceMoney(deal.dealAmount) }}</b-td>
                          <b-td v-if="deal.dealType == '전세'">{{ replaceMoney(deal.rentMoney) }}</b-td>
                          <b-td v-if="deal.dealType == '월세'">{{ replaceMoney(deal.rentMoney) }} / 월 {{ deal.dealAmount }}</b-td>
                          <b-td v-model="deal.inter"> </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </div>
                  <div v-else>
                    <b-row>
                      <b-col id="alertT"><p class="p-2">매매 실거래기록이 없습니다.</p></b-col>
                    </b-row>
                  </div>
                </b-tab>

                <b-tab no-body title="전세">
                  <div v-if="dealsj.length">
                    <b-table-simple hover striped responsive class="text-center">
                      <b-thead>
                        <b-tr>
                          <b-th>층</b-th>
                          <b-th>면적</b-th>
                          <b-th>거래년도</b-th>
                          <b-th>거래유형</b-th>
                          <b-th>금액</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody>
                        <b-tr v-for="(deal, index) in dealsj" :key="index" class="m-2">
                          <b-td>{{ deal.floor }}</b-td>
                          <b-td>{{ deal.area }}</b-td>
                          <b-td>{{ deal.dealYear }}</b-td>
                          <b-td>{{ deal.dealType }}</b-td>
                          <b-td v-if="deal.dealType == '매매'">{{ replaceMoney(deal.dealAmount) }}</b-td>
                          <b-td v-if="deal.dealType == '전세'">{{ replaceMoney(deal.rentMoney) }}</b-td>
                          <b-td v-if="deal.dealType == '월세'">{{ replaceMoney(deal.rentMoney) }} / 월 {{ deal.dealAmount }}</b-td>
                          <b-td v-model="deal.inter"> </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </div>
                  <div v-else>
                    <b-row>
                      <b-col><b-alert show>전세 실거래기록이 없습니다.</b-alert></b-col>
                    </b-row>
                  </div>
                </b-tab>

                <b-tab no-body title="월세">
                  <div v-if="dealsw.length">
                    <b-table-simple hover striped responsive class="text-center">
                      <b-thead>
                        <b-tr>
                          <b-th>층</b-th>
                          <b-th>면적</b-th>
                          <b-th>거래년도</b-th>
                          <b-th>거래유형</b-th>
                          <b-th>금액</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody>
                        <b-tr v-for="(deal, index) in dealsw" :key="index" class="m-2">
                          <b-td>{{ deal.floor }}</b-td>
                          <b-td>{{ deal.area }}</b-td>
                          <b-td>{{ deal.dealYear }}</b-td>
                          <b-td>{{ deal.dealType }}</b-td>
                          <b-td v-if="deal.dealType == '매매'">{{ replaceMoney(deal.dealAmount) }}</b-td>
                          <b-td v-if="deal.dealType == '전세'">{{ replaceMoney(deal.rentMoney) }}</b-td>
                          <b-td v-if="deal.dealType == '월세'">{{ replaceMoney(deal.rentMoney) }} / 월 {{ deal.dealAmount }}</b-td>
                          <b-td v-model="deal.inter"> </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </div>
                  <div v-else>
                    <b-row>
                      <b-col><b-alert show>월세 실거래기록이 없습니다.</b-alert></b-col>
                    </b-row>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
            <div v-else>
              <b-row>
                <b-col><b-alert show>매물이 없습니다.</b-alert></b-col>
              </b-row>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>

    <!-- <div class="mb-4" id="map" style="height: 85vh"></div> -->
    <!-- <div id="map" style="display: flex; width: 100%; height: 85vh; padding-left: 0px; padding-right: 0px"></div> -->
  </div>
</template>
<script>
import axios from "axios";
import BarChart from "@/components/house/BarChart.vue";
export default {
  name: "HouseDealList",
  components: {
    BarChart,
  },
  props: {
    loginId: null,
  },
  data() {
    return {
      aptimg: [
        "http://drive.google.com/uc?export=view&id=1ZYVQv1YrtuyRcXivqkN6IVQ6_jdWJHCR",
        "http://drive.google.com/uc?export=view&id=1Bw1hoGbyv-kMGBckYgv_PwRVJCEtKcI-",
        "http://drive.google.com/uc?export=view&id=1GI8BindQv6G3BE3ONShQUjnYfE-3xLiC",
        "http://drive.google.com/uc?export=view&id=1aukR4qJZUAKXr2RUrQFQnUVBa3DbmOXv",
        "http://drive.google.com/uc?export=view&id=1GhE4xsOeI-_UceRa8A9eIxFD8pPaxj9r",
        "http://drive.google.com/uc?export=view&id=1FMYepfQDuEL78VlxuyKmvMU4EkGEk-Kk",
        "http://drive.google.com/uc?export=view&id=1APtOw7BuJxuVJRf3ANNSE0fbj5vtraL3",
        "http://drive.google.com/uc?export=view&id=1PVIp2PerohL0Hauan_kZTpO2-eaYylpo",
        "http://drive.google.com/uc?export=view&id=1ANWJOk9KEj5zKMHVa8CmYv0dhiTrT74M",
        "http://drive.google.com/uc?export=view&id=1nuWU1FdKTqmOnmim3rmMGeLGV6YX11EV",
      ],
      status: false,
      // house: null,
      checkdeals: [],
      deals: [],
      dealsj: [],
      dealsw: [],
      dealsm: [],
      interest: [],
      collapseStates: [false, false],
      collapseStatesChart: true,
      name: "",
      nameState: null,
      submittedNames: [],
      showModal: false,
      datacollection: {},
      filterItem: [],
      placeOverlay: null,
      contentNode: null, // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      pl_markers: [], // 마커를 담을 배열입니다
      currCategory: "", // 현재 선택된 카테고리를 가지고 있을 변수입니다
      ps: null,
      intereststatus: false,
      reviews: [],
      review_time: 1,
      review_commute: 1,
      review_park: 1,
      review_noise: 1,
      review_facilities: 1,
      review_content: "",
      user: [{ review: false }],
      totalavg: 0,
    };
  },

  created() {
    if (this.loginId) {
      axios
        .get("/happyhouse/user/" + this.loginId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then(({ data }) => {
          this.user = data;

          console.log(this.user);
          const cate = document.getElementById("category");
          this.user.category.split(",").forEach((element) => {
            cate.children[parseInt(element)].style.display = "block";
          });
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    }

    axios
      .get("http://localhost:8080/happyhouse/house/review/" + this.$route.params.aptCode, {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Content-Type": "application/json; charset = utf-8",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(({ data }) => {
        this.reviews = data;
        if (this.reviews) {
          for (let i = 0; i < this.reviews.length; i++) {
            this.reviews[i].avg = (this.reviews[i].commute + this.reviews[i].park + this.reviews[i].noise + this.reviews[i].facilities) / 4;
            this.totalavg = this.totalavg + this.reviews[i].avg;
          }
          this.totalavg = this.totalavg / this.reviews.length;
          // this.user = data;
          // console.log(this.user);
          // const cate = document.getElementById("category");
          // this.user.category.split(",").forEach((element) => {
          //   cate.children[parseInt(element)].style.display = "block";
          // });
        }
      })
      .catch(({ error }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";

        alert(msg);
        this.$router.push({ name: "Home" });
      });

    axios
      .post("http://localhost:8080/happyhouse/house/apt/", {
        aptCode: this.$route.params.aptCode,
      })

      .then(({ data }) => {
        this.deals = data;
        this.dealsm = [];
        this.dealsw = [];
        this.dealsj = [];

        this.deals.forEach((element) => {
          if (element.dealType.trim() == "매매") {
            this.dealsm.push(element);
          } else if (element.dealType.trim() == "월세") {
            this.dealsw.push(element);
          } else {
            this.dealsj.push(element);
          }
        });
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
        if (intedeals) {
          intedeals.forEach((intedeal) => {
            if (intedeal.aptno == this.$route.params.aptCode) {
              // this.checkdeals.push(intedeal.dealno);
              this.intereststatus = true;
              return true;
            }
          });
        }

        // for (let j = 0; j < this.checkdeals.length; j++) {
        //   for (let i = 0; i < this.deals.length; i++) {
        //     if (this.checkdeals[j] == this.deals[i].no) {
        //       this.deals[i].inter = true;
        //     }
        //   }
        // }

        if (window.kakao && window.kakao.maps) {
          this.initMap();
          // this.displayMarker();
        } else {
          const script = document.createElement("script");
          /* global kakao */
          script.onload = () => kakao.maps.load(this.initMap);
          script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7f40405e29341c1fa46226d9889e981a&libraries=services";
          document.head.appendChild(script);
          // this.displayMarker();
        }
        this.fillData();
        this.filterItem = this.datacollection.datasets.map((_s, i) => i);
      });

    // console.log(this.loginUser);
  },
  computed: {
    filteredDataCollection() {
      const collection = {
        ...this.datacollection,
        datasets: this.datacollection.datasets.filter((_s, i) => {
          return this.filterItem.includes(i);
        }),
      };
      return collection;
    },
    dataSetsKey() {
      return this.datacollection.datasets.map((s, i) => ({
        label: s.label,
        index: i,
        color: s.backgroundColor,
      }));
    },
  },

  methods: {
    getImg(aptCode) {
      return this.aptimg[parseInt(this.$route.params.aptCode) % 10];
    },
    interestcheck() {
      if (!this.loginId) {
        alert("찜하기 기능은 회원만 이용가능합니다.");
        return;
      }
      if (!this.intereststatus) {
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
        if (!intedeals) {
          intedeals = [];
        }

        let de = { aptno: this.$route.params.aptCode };
        intedeals.push({ ...de });
        sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
        alert("관심 매물로 추가했습니다!");

        this.intereststatus = true;
      } else {
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));

        for (let i = 0; i < intedeals.length; i++) {
          if (intedeals[i].aptno === this.$route.params.aptCode) {
            intedeals.splice(i, 1);

            this.intereststatus = false;
            alert("삭제 완료");

            break;
          }
        }
        sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
      }
    },
    replaceMoney(money) {
      let lm = parseInt(money / 10000) + "";
      let rm = (money % 10000) + "";

      if (lm != "0" && rm != "0") return lm + "억 " + rm + "만원";
      else if (lm != "0") return lm + "억";
      else return rm + "만원";
    },
    // filterByCategory(category) {
    //   this.filterItem = this.datacollection.datasets
    //     .map((s, i) => {
    //       if (s.dataCategory === category) return i;
    //       return -1;
    //     })
    //     .filter((s) => s >= 0);
    // },
    fillData() {
      this.datacollection = {
        labels: ["매매", "전세", "월세"],
        datasets: [
          {
            label: "전국",
            // backgroundColor: "#4cc36b",
            backgroundColor: "rgba(0, 0, 255, 0.8)",
            // dataCategory: "vegetable",
            data: [14000, 1000, 5000],
          },
          {
            label: "서울시",
            // backgroundColor: "#456dfe",
            // dataCategory: "vegetable",
            backgroundColor: "rgba(0, 255,0, 0.8)",
            data: [23000, 8000, 5000],
          },
          {
            label: "스테이 더 디자이너스",
            // backgroundColor: "#f44b81",
            // dataCategory: "fruit",
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            data: [10000, 3000, 6000],
          },
        ],
      };
    },
    showMsgBoxTwo() {
      // this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(this.deals[0].aptName + "에 거주한 경험이 있나요?", {
          title: "거주자 평점등록",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          // this.boxTwo = value;
          if (value) {
            for (let i = 0; i < this.reviews.length; i++) {
              if (this.reviews[i].userid == this.loginId) {
                alert("이미 리뷰를 작성했습니다.");
                return;
              }
            }
            this.$refs["my-modal"].show();
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);

      axios
        .post(
          "http://localhost:8080/happyhouse/house/review/" + this.$route.params.aptCode,
          {
            userid: this.loginId,
            aptCode: this.$route.params.aptCode,
            time: this.review_time,
            commute: this.review_commute,
            park: this.review_park,
            noise: this.review_noise,
            facilities: this.review_facilities,
            content: this.review_content,
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
          alert("리뷰가 등록되었습니다.");
          this.$router.go();
          // this.reviews = data;

          // for (let i = 0; i < this.reviews.length; i++) {
          //   this.reviews[i].avg = (this.reviews[i].commute + this.reviews[i].park + this.reviews[i].noise + this.reviews[i].facilities) / 4;
          //   this.totalavg = this.totalavg + this.reviews[i].avg;
          // }
          // this.totalavg = this.totalavg / this.reviews.length;
          // this.user = data;
          // console.log(this.user);
          // const cate = document.getElementById("category");
          // this.user.category.split(",").forEach((element) => {
          //   cate.children[parseInt(element)].style.display = "block";
          // });
        });

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    // expandAll() {
    //   this.collapseStates = this.collapseStates.map((x) => true);
    // },
    // collapseAll() {
    //   this.collapseStates = this.collapseStates.map((x) => false);
    // },
    interestC(deal) {
      if (deal.infer) {
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
        if (!intedeals) {
          intedeals = [];
        }

        let de = { aptno: this.$route.params.aptCode, dealno: deal.no };
        intedeals.push({ ...de });
        // deal.inter = false;
        console.log(deal);
        console.log(deal.inter);
        deal.inter = !deal.inter;
        console.log(deal.inter);

        // console.log(this.deals[index]);

        sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
        // this.$set(deal, deal.inter, true);
        deal.inter = true;
        console.log(deal);
        alert("관심 매물로 추가했습니다!");
        // console.log(this.deals);
        // this.interest.forEach((element) => {
        //   if (element.no == no) {
        //     alert("이미 관심 매물로 추가되어있습니다.");
        //     return;
        //   }
        // });
      } else {
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));

        if (intedeals == null || intedeals.length < 1) {
          intedeals = [];
        } else {
          console.log(intedeals);

          for (let i = 0; i < intedeals.length; i++) {
            if (intedeals[i].dealno === deal.no) {
              intedeals.splice(i, 1);
              // console.log(this.deals[index]);
              // this.$set(this.deals[index], "inter", false);
              // console.log(this.deals[index]);
              deal.inter = false;
              alert("삭제 완료");
              console.log(deal);

              // console.log(this.deals[index]);
              break;
            }
          }
        }
        sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
      }
    },

    interestCheck(deal) {
      if (deal.inter) {
        console.log(1111);
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));
        if (!intedeals) {
          intedeals = [];
        }

        let de = { aptno: this.$route.params.aptCode, dealno: deal.no };
        intedeals.push({ ...de });
        // deal.inter = false;
        console.log(deal);
        console.log(deal.inter);
        deal.inter = !deal.inter;
        console.log(deal.inter);

        // console.log(this.deals[index]);

        sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
        // this.$set(deal, deal.inter, true);
        deal.inter = true;
        console.log(document.getElementById("icon`${deal.no}`"));
        alert("관심 매물로 추가했습니다!");
        document.getElementById("icon`${deal.no}`").setAttribute("icon", "heart-fill");
      } else {
        let intedeals = JSON.parse(sessionStorage.getItem(this.loginId + "_intedeal"));

        for (let i = 0; i < intedeals.length; i++) {
          if (intedeals[i].dealno === deal.no) {
            intedeals.splice(i, 1);

            deal.inter = false;
            alert("삭제 완료");
            console.log(document.getElementById("icon`${deal.no}`"));
            document.getElementById("icon`${deal.no}`").setAttribute("icon", "heart");

            break;
          }
        }
        sessionStorage.setItem(this.loginId + "_intedeal", JSON.stringify(intedeals));
      }
    },
    interestCancel(deal) {},

    initMap() {
      const container = document.getElementById("map");
      const latlng = new kakao.maps.LatLng(this.deals[0].lat, this.deals[0].lng);
      const options = {
        center: latlng,
        level: 2,
      };

      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.contentNode = document.createElement("div"); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      this.pl_markers = []; // 마커를 담을 배열입니다
      this.currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.map.setMinLevel(3);
      this.map.setMaxLevel(3);

      this.ps = new kakao.maps.services.Places(this.map);

      // 지도에 idle 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);

      // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
      this.contentNode.className = "placeinfo_wrap";

      // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
      // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
      this.addEventHandle(this.contentNode, "mousedown", kakao.maps.event.preventMap);
      // 커스텀 오버레이 컨텐츠를 설정합니다
      this.placeOverlay.setContent(this.contentNode);

      // 각 카테고리에 클릭 이벤트를 등록합니다
      this.addCategoryClickEvent();
      this.addEventHandle(this.contentNode, "touchstart", kakao.maps.event.preventMap);

      const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      const roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      roadviewClient.getNearestPanoId(latlng, 150, function (panoId) {
        roadview.setPanoId(panoId, latlng); //panoId와 중심좌표를 통해 로드뷰 실행
      });
      this.displayMarker();
    },
    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },
    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }

      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, { useMapBounds: true });
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    addMarker(position, order) {
      var imageSrc = "http://drive.google.com/uc?export=view&id=1xwzPqdS-XrKzFhhRwSxTzfXGrcNmVeVg", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.pl_markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    removeMarker() {
      for (var i = 0; i < this.pl_markers.length; i++) {
        this.pl_markers[i].setMap(null);
      }
      this.pl_markers = [];
    },

    displayPlaceInfo(place) {
      var content = '<div class="placeinfo">' + '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
      }

      content += '    <span class="tel">' + place.phone + "</span>" + "</div>" + '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },
    addCategoryClickEvent() {
      var category = document.getElementById("category"),
        children = category.children;

      for (var i = 0; i < children.length; i++) {
        children[i].onclick = this.onClickCategory;
      }
    },
    onClickCategory(event) {
      // console.log(event.currentTarget);
      var id = event.currentTarget.id,
        className = event.currentTarget.className;

      this.placeOverlay.setMap(null);

      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeMarker();
      } else {
        this.currCategory = id;
        this.changeCategoryClass(event.currentTarget);
        this.searchPlaces();
      }
    },
    changeCategoryClass(el) {
      // console.log("el");
      // console.log(el);
      var category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    },
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document.getElementById(this.currCategory).getAttribute("data-order");

      console.log("검색 된 건물 수: " + places.length);
      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        // kakao.maps.event.addListener(marker, "click", function () {
        //     this.displayPlaceInfo(place);
        //   });
        ((marker, place) => {
          window.kakao.maps.event.addListener(marker, "click", () => {
            this.displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    },
    displayMarker() {
      // if (this.markers.length > 0) {
      //   this.markers.forEach((marker) => marker.setMap(null));
      // }

      this.markers = [];

      let i = 0;
      // let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // let imageSrc = "http://drive.google.com/uc?export=view&id=1Th8RjUjvvMWR-zYegM2taxOYB1NlL50S";

      let imageSrc_apt = "http://drive.google.com/uc?export=view&id=1Prms3VPLeaf9lmSjmtgx4sZaR0STdRd8";
      let imageSrc_op = "http://drive.google.com/uc?export=view&id=16BoBFDkUUhwMYsrwdjI_8IZXCJggA25W";
      let imageSrc_bil = "http://drive.google.com/uc?export=view&id=1yx1FS9P5-za82s_pYYMA6CXt0n-qcTgJ";

      let imageSrc = this.deals[0].infoType.trim() == "아파트" ? imageSrc_apt : this.deals[0].infoType.trim() == "오피스텔" ? imageSrc_op : imageSrc_bil;
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(40, 40);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      // this.houses.forEach((house) => {
      let coords = new kakao.maps.LatLng(this.deals[0].lat, this.deals[0].lng);

      let marker = new kakao.maps.Marker({
        map: this.map,
        position: coords,
        title: this.deals[0].aptName,
        image: markerImage,
        clickable: true,
      });
      let infowindow = new kakao.maps.InfoWindow({
        position: coords,
        content: '<div style="padding:10px;text-align:center;width:200px">' + this.deals[0].aptName + "</div>", // 인포윈도우에 표시할 내용
      });
      // console.log("");
      // kakao.maps.event.addListener(marker, "mouseover", this.makeOverListener(this.map, marker, infowindow));
      // kakao.maps.event.addListener(marker, "mouseout", this.makeOutListener(infowindow));
      // kakao.maps.event.addListener(marker, "click", function () {
      //   alert(house.aptName + " " + house.aptCode);
      // });
      i++;
      this.markers.push(marker);
      if (i == 1) {
        this.map.panTo(coords);
      }
      // });
    },
    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    },
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    },
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* .infoView {
  height: 75vh;
  overflow: auto;
  background-color: white;
  align-self: center;
} 
.infoView::-webkit-scrollbar {
  display: none;
}
*/
.map_wrap,
.map_wrap * {
  margin: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
}
#detail_info {
  height: 83vh;
  background-color: white;
  align-self: center;
  position: absolute;
  top: 50px;
  left: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: auto;
  z-index: 2;
  list-style: none;
  width: 450px;
  padding: 6px;
  text-align: center;
  cursor: pointer;
}
#detail_info::-webkit-scrollbar {
  display: none;
}
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  padding: 0;
  z-index: 2;
}

#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#alertT {
  background-color: lightcyan;
  border-radius: 10px;
}
label > img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
