<template>
  <div class="container">
    <p class="text-center" style="font-size: 35px">QnA 목록</p>
    <b-button v-if="this.loginUser && !this.isManager" variant="outline-warning" style="float: right; width: auto" to="/qna/regist">문의하기</b-button>
    <hr />
    <div class="text-right">
      <b-row>
        <!-- <b-col cols="2"> </b-col>
        <b-col cols="4">
          <b-form-input placeholder="검색어 입력"></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-button variant="outline-info" @click="execDaum()">검색</b-button>
        </b-col> -->
        <b-col cols="7"></b-col>
        <b-col cols="3"><b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1"> 답변완료 글만 보기 </b-form-checkbox> </b-col>
        <b-col align-self="end" cols="2">
          <small class="mb-3 text-right">* 목록 수 : {{ total }} </small>
        </b-col>
      </b-row>
    </div>
    <div v-if="qnas.length">
      <b-table-simple class="qna-list">
        <colgroup>
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '40%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '10%' }" />
        </colgroup>
        <b-thead>
          <b-tr>
            <b-th>번호</b-th>
            <b-th>제목</b-th>
            <b-th>날짜</b-th>
            <b-th>아이디</b-th>
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
            <b-td v-if="qna.masterid">완료</b-td>
            <b-td style="color: brown; font-weight: bold" v-else>대기</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <page-link @update-page="updatePage" :status="status" />
    </div>
    <div v-else>등록된 QnA가 없습니다.</div>
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
    loginUser: null,
    isManager: null,
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
  },
};
</script>

<style scoped>
.jumbotron {
  /* background-image: url("@/assets/img/login-bg.jpg"); */
  background-position: center;
  background-size: fill;
  height: 40vh;
  text-align: center;
}
.jumbotron > div {
  width: 70%;
  height: 40vh;
  display: inline-block;
}
</style>
