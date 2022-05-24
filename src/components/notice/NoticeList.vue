<template>
  <div>
    <div id="head">
      <p class="text-center h1">Notice</p>
    </div>
    <b-container>
      <div class="text-right mt-5">
        <b-row align-h="between" align-v="end" class="mb-2">
          <b-col class="text-left">
            <small>* 전체 공지사항 수 : {{ total }} </small>
          </b-col>
          <b-col md="2">
            <b-form-select v-model="selected" :options="options" size="sm" class="mt-3" @change="sort"> </b-form-select>
          </b-col>
          <button v-if="isManager" class="btn mr-4" style="float: right; background-color: #ece6cc" to="/notice/regist">글쓰기</button>
        </b-row>
      </div>
      <div class="mb-5">
        <div v-if="notices.length">
          <b-table-simple hover class="text-center">
            <colgroup>
              <col :style="{ width: '10%' }" />
              <col :style="{ width: '50%' }" />
              <col :style="{ width: '15%' }" />
              <!-- <col :style="{ width: '15%' }" /> -->
              <col :style="{ width: '10%' }" />
            </colgroup>
            <b-thead head-variant="light">
              <b-tr>
                <b-th>#</b-th>
                <b-th>Title</b-th>
                <b-th>Date</b-th>
                <!-- <b-th>작성자</b-th> -->
                <b-th>View</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(notice, index) in notices" :key="index">
                <b-td>{{ no - pageLimit + index + 1 }}</b-td>
                <b-td>
                  <router-link class="notice-link" :to="{ name: 'NoticeDetail', params: { no: notice.no } }">{{ notice.title }}</router-link>
                </b-td>
                <b-td>{{ notice.regtime.substring(0, 10) }}</b-td>
                <!-- <b-td>{{ notice.userid }}</b-td> -->
                <b-td>{{ notice.hit }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <page-link @update-page="updatePage" />
        </div>
        <div v-else>등록된 공지사항이 없습니다.</div>
      </div>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import PageLink from "@/components/notice/PageLink.vue";
export default {
  name: "NoticeList",
  components: {
    PageLink,
  },
  props: {
    loginUser: null,
    isManager: null,
  },
  data() {
    return {
      selected: "최신순",
      options: [
        { value: "최신순", text: "최신순" },
        { value: "오래된순", text: "오래된순" },
        { value: "제목순", text: "제목순" },
        { value: "조회수순", text: "조회수순" },
      ],
      notices: {
        type: Array,
      },
      pageLimit: 10,
      pageOffet: 0,
      sortCal: "regtime",
      sortVal: "desc",
      no: 10,
      total: 0,
    };
  },
  watch: {
    no: function () {
      this.initComponent();
    },
  },
  created() {
    axios
      .get("http://localhost:8080/happyhouse/notice/", { params: { sortCal: "regtime", sortVal: "desc", limit: this.pageLimit, offset: this.no - this.pageLimit } })
      .then(({ data }) => {
        this.notices = data;
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
      });

    axios.get("http://localhost:8080/happyhouse/notice/total").then(({ data }) => {
      this.total = data;
    });
  },
  methods: {
    updatePage(no) {
      this.no = no;
    },
    initComponent() {
      axios
        .get("http://localhost:8080/happyhouse/notice/", {
          params: { sortCal: this.sortCal, sortVal: this.sortVal, limit: this.pageLimit, offset: this.no - this.pageLimit },
        })
        .then(({ data }) => {
          this.notices = data;
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    sort() {
      switch (this.selected) {
        case "오래된순":
          this.sortCal = "regtime";
          this.sortVal = "asc";
          break;
        case "제목순":
          this.sortCal = "title";
          this.sortVal = "asc";
          break;
        case "조회수순":
          this.sortCal = "hit";
          this.sortVal = "desc";
          break;
        default:
          this.sortCal = "regtime";
          this.sortVal = "desc";
          break;
      }
      this.initComponent();
    },
  },
};
</script>

<style scoped>
#head {
  background-color: #48608a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
  color: lightcyan;
}
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}

#bbtn {
  color: white;
}
</style>
