<template>
  <div class="container">
    <span style="font-size: 35px">QnA 목록</span>
    <b-button v-if="this.loginUser && !this.isManager" variant="outline-warning" style="float: right; width: auto" to="/qna/regist">문의하기</b-button>
    <hr />
    <div class="text-right">
      <small class="mb-3 text-right">* 전체 QnA 수 : {{ qnaCnt }} </small>
    </div>
    <div v-if="qnas.length">
      <b-table-simple class="qna-list">
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
            <b-td>{{ index + 1 }}</b-td>
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
    </div>
    <div v-else>등록된 QnA가 없습니다.</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaList",
  props: {
    loginUser: null,
    isManager: null,
  },
  data() {
    return {
      qnas: {
        type: Array,
      },
    };
  },
  methods: {},
  computed: {
    qnaCnt() {
      return this.qnas.length;
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/qna/").then(({ data }) => {
      this.qnas = data;
    });
  },
};
</script>

<style scoped>
.jumbotron {
  background-image: url("@/assets/login-bg.jpg");
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
