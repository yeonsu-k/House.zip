<template>
  <div class="ml-2">
    <b-row style="display: flex; width: 100%; height: 100%">
      <b-col cols="3">
        <div>
          <h4 v-if="deals.length">{{ deals[0].aptName }}</h4>
        </div>
        <hr style="border-top: 2px dashed #bcbcbc" />
        <div>
          <b-button block v-b-toggle.accordion-1 class="mt-2">
            <div>평점 <b-icon v-if="collapseStates[0]" icon="chevron-down" /><b-icon v-else icon="chevron-up" /></div>
          </b-button>
          <b-collapse id="accordion-1" v-model="collapseStates[0]">
            <div class="mt-3">
              Submitted Names:
              <div v-if="submittedNames.length === 0">--</div>
              <ul v-else class="mb-0 pl-3">
                <li v-for="(name, index) in submittedNames" :key="index">{{ name }}</li>
              </ul>
            </div>

            <div class="mb-1">
              <b-button @click="showMsgBoxTwo">거주자 평점등록</b-button>
            </div>

            <b-modal ref="my-modal" id="modal-prevent-closing" title="Submit Your Name" @show="resetModal" @hidden="resetModal" @ok="handleOk" v-show="showModal" v-on:close="showModal = false">
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <div>
                  <label for="rating-inline">교통: </label>
                  <b-form-rating show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                  <br /><small>이거는 이거다!</small>
                </div>

                <div>
                  <label for="rating-inline">주차: </label>
                  <b-form-rating show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                  <br /><small>이거는 이거다!</small>
                </div>

                <div>
                  <label for="rating-inline">소음: </label>
                  <b-form-rating show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                  <br /><small>이거는 이거다!</small>
                </div>

                <div>
                  <label for="rating-inline">이용시설: </label>
                  <b-form-rating show-value show-value-max id="rating-inline" inline value="3"></b-form-rating>
                  <br /><small>이거는 이거다!</small>
                </div>
                <b-form-group label="거주하는 건물에 대한 이야기를 해주세요!(70자 이상 200자 이하)" label-for="name-input" invalid-feedback="Name is required" :state="nameState">
                  <b-form-textarea id="name-input" v-model="name" :state="nameState" required minlength="70" maxlength="200" size="8"></b-form-textarea>
                </b-form-group>
              </form>
            </b-modal>
          </b-collapse>

          <hr style="border-top: 2px dashed #bcbcbc" />

          <b-button block v-b-toggle.accordion-2 class="mt-2">
            <div>로드뷰 <b-icon v-if="collapseStates[1]" icon="chevron-down" /><b-icon v-else icon="chevron-up" /></div>
          </b-button>
          <b-collapse id="accordion-2" v-model="collapseStates[1]">
            <div id="roadview" style="width: 100%; height: 300px"></div>
          </b-collapse>

          <b-button block v-b-toggle.accordion-3 class="mt-2">
            <div>실거래가 리스트 <b-icon v-if="collapseStatesChart" icon="chevron-down" /><b-icon v-else icon="chevron-up" /></div>
          </b-button>
          <b-collapse id="accordion-3" v-model="collapseStatesChart">
            <div v-if="deals.length">
              <template v-for="item in dataSetsKey">
                <label :for="`check_${item.index}`" :key="item.label" :style="`color: ${item.color}; margin: 8px;`"
                  ><input :id="`check_${item.index}`" type="checkbox" v-model="filterItem" :value="item.index" />{{ item.label }}</label
                >
              </template>
              <BarChart
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

              <b-table-simple hover striped responsive class="text-center">
                <b-thead>
                  <b-tr>
                    <b-th>층</b-th>
                    <b-th>면적</b-th>
                    <b-th>거래년도</b-th>
                    <b-th>거래유형</b-th>
                    <b-th>금액</b-th>
                    <b-th>찜하기</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(deal, index) in deals" :key="index" class="m-2">
                    <b-td>{{ deal.floor }}</b-td>
                    <b-td>{{ deal.area }}</b-td>
                    <b-td>{{ deal.dealYear }}</b-td>
                    <b-td>{{ deal.dealType }}</b-td>
                    <b-td v-if="deal.dealType == '매매'">{{ replaceMoney(deal.dealAmount) }}</b-td>
                    <b-td v-if="deal.dealType == '전세'">{{ replaceMoney(deal.rentMoney) }}</b-td>
                    <b-td v-if="deal.dealType == '월세'">{{ replaceMoney(deal.rentMoney) }} / 월 {{ deal.dealAmount }}</b-td>
                    <b-td>
                      <b-button variant="outline-danger" @click="interestCheck(deal.no)" style="border: none; outline: none">
                        <!-- <b-icon icon="heart" /> -->
                        <b-icon v-if="deal.interest" icon="heart-fill" />
                        <b-icon v-else icon="heart" />
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
            <div v-else>
              <b-row>
                <b-col><b-alert show>매물이 없습니다.</b-alert></b-col>
              </b-row>
            </div>
          </b-collapse>
        </div>
      </b-col>
      <b-col cols="9">
        <!-- 지도 -->
        <div class="mb-4" id="map" style="height: 85vh"></div>
        <!-- <div id="map" style="display: flex; width: 100%; height: 85vh; padding-left: 0px; padding-right: 0px"></div> -->
      </b-col>
    </b-row>
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
    loginUser: null,
    isManager: null,
    dongCode: null,
  },
  data() {
    return {
      status: false,
      // house: null,
      deals: [],
      interest: [],
      collapseStates: [true, true],
      collapseStatesChart: true,
      name: "",
      nameState: null,
      submittedNames: [],
      showModal: false,
      boxTwo: "",
      datacollection: {},
      filterItem: [],
    };
  },
  created() {
    // if (!this.loginUser) {
    //   alert("로그인이 필요합니다.");
    //   this.$router.push("/login");
    //   return;
    // }
    // console.log("ac: " + this.$route.params.aptCode);
    // this.house = this.$route.params.house;
    axios
      .post("http://localhost:8080/happyhouse/house/apt/", {
        aptCode: this.$route.params.aptCode,
      })
      .then(({ data }) => {
        console.log(data);
        this.deals = data;
        // if (this.loginUser) {
        //   axios
        //     .post("http://localhost:8080/happyhouse/house/interest", {
        //       userid: this.loginUser,
        //       aptCode: this.$route.params.house.aptCode,
        //     })
        //     .then(({ data }) => {
        //       console.log(data);
        //       this.interest = data;
        //       for (let i = 0; i < this.deals.length; i++) {
        //         for (let i = 0; i < this.interest.length; i++) {
        //           if (this.deals[i].no == this.interest.no) {
        //           }
        //           this.deals[i].$set(this.deal[i], "interest", "true");
        //         }
        //       }
        //     });
        // }
        if (window.kakao && window.kakao.maps) {
          this.initMap();
          this.displayMarker();
        } else {
          const script = document.createElement("script");
          /* global kakao */
          script.onload = () => kakao.maps.load(this.initMap);
          script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7f40405e29341c1fa46226d9889e981a&libraries=services";
          document.head.appendChild(script);
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
  mounted() {},
  methods: {
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
      this.boxTwo = "";
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
          this.boxTwo = value;
          if (this.boxTwo) this.$refs["my-modal"].show();
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
    interestCheck(no) {
      let check = true;
      this.interest.forEach((element) => {
        if (element.no == no) {
          alert("이미 관심 매물로 추가되어있습니다.");
          check = false;
          return;
        }
      });
      if (check) alert("관심 매물로 추가 성공!");
    },
    initMap() {
      const container = document.getElementById("map");
      const latlng = new kakao.maps.LatLng(this.deals[0].lat, this.deals[0].lng);
      const options = {
        center: latlng,
        level: 1,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);

      const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      const roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      roadviewClient.getNearestPanoId(latlng, 50, function (panoId) {
        roadview.setPanoId(panoId, latlng); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },
    displayMarker() {
      // if (this.markers.length > 0) {
      //   this.markers.forEach((marker) => marker.setMap(null));
      // }
      this.markers = [];

      let i = 0;
      // let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // let imageSrc = "http://drive.google.com/uc?export=view&id=1Th8RjUjvvMWR-zYegM2taxOYB1NlL50S";
      let imageSrc = "http://drive.google.com/uc?export=view&id=18EHzbozgdSC1fPltqqI71hKCYgGVe-cg";

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(35, 35);
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

<style></style>
