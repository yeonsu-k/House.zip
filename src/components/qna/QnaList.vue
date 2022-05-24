<template>
  <div>
    <div id="head">
      <p class="text-center h1">Q & A</p>
    </div>
    <b-container>
      <div class="text-right mt-5">
        <b-row align-h="between" align-v="end" class="mb-2">
          <b-col class="text-left">
            <small class="mb-3 text-right">* 목록 수 : {{ total }} </small>
          </b-col>
          <b-col md="4">
            <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1"> 답변완료 글만 보기 </b-form-checkbox>
          </b-col>
          <b-button v-if="this.loginUser && !this.isManager" id="bbtn" class="btn-sm mr-4" variant="outline-light" :to="{ name: 'QnaRegist' }">문의하기</b-button>
        </b-row>
      </div>
      <div class="mb-5">
        <div v-if="qnas.length">
          <b-table-simple hover class="qna-list text-center">
            <colgroup>
              <col :style="{ width: '10%' }" />
              <col :style="{ width: '38%' }" />
              <col :style="{ width: '12%' }" />
              <col :style="{ width: '10%' }" />
              <col :style="{ width: '10%' }" />
              <col :style="{ width: '10%' }" />
            </colgroup>
            <b-thead head-variant="light">
              <b-tr>
                <b-th>#</b-th>
                <b-th>제목</b-th>
                <b-th>날짜</b-th>
                <b-th>작성자ID</b-th>
                <b-th>조회수</b-th>
                <b-th>상태</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(qna, index) in qnas" :key="index">
                <b-td>{{ no - pageLimit + index + 1 }}</b-td>
                <b-td>
                  <router-link class="qna-link" :to="{ name: 'QnaDetail', params: { no: qna.no } }">{{ qna.title }}</router-link>
                </b-td>
                <b-td>{{ qna.asktime.substring(0, 10) }}</b-td>
                <b-td>{{ qna.userid }}</b-td>
                <b-td>{{ qna.hit }}</b-td>
                <b-td v-if="qna.masterid" style="color: darkred; font-weight: bold">완료</b-td>
                <b-td v-else>대기</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <page-link @update-page="updatePage" :status="status" />
        </div>
        <div v-else>등록된 QnA가 없습니다.</div>
      </div>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import PageLink from "@/components/qna/PageLink.vue";
export default {
  name: "QnaList",
  components: {
    PageLink,
  },
  props: {
    loginId: null,
  },
  data() {
    return {
      qnas: {
        type: Array,
      },
      status: false,
      no: 10,
      pageLimit: 10,
      pageOffet: 0,
      total: 0,
      isManager: false,
    };
  },
  methods: {
    updatePage(no) {
      this.no = no;
    },
    initComponent() {
      if (this.status) {
        axios
          .get("http://localhost:8080/happyhouse/qna/ans", {
            params: { limit: this.pageLimit, offset: this.no - this.pageLimit },
          })
          .then(({ data }) => {
            this.qnas = data;
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      } else {
        axios
          .get("http://localhost:8080/happyhouse/qna/", {
            params: { limit: this.pageLimit, offset: this.no - this.pageLimit },
          })
          .then(({ data }) => {
            this.qnas = data;
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      }
    },
    initTotal() {
      if (this.status) {
        axios
          .get("http://localhost:8080/happyhouse/qna/ans/total")
          .then(({ data }) => {
            this.total = data;
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      } else {
        axios
          .get("http://localhost:8080/happyhouse/qna/total")
          .then(({ data }) => {
            this.total = data;
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      }
    },
  },

  computed: {
    qnaCnt() {
      return this.qnas.length;
    },
  },
  watch: {
    status() {
      this.no = 10;
      this.initTotal();
      this.initComponent();
    },
    no() {
      this.initComponent();
    },
  },

  created() {
    this.initTotal();
    this.initComponent();
    this.isManager = JSON.parse(localStorage.getItem("isManager"));
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
  float: right;
  color: black;
  background-color: #ece6cc;
}
</style>
