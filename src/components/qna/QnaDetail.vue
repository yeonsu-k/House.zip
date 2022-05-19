<template>
  <div class="container">
    <span style="font-size: 35px">질문 상세</span>
    <hr />
    <b-table-simple class="mt-2 table-bordered text-center" style="min-height: 400px">
      <b-thead class="table-secondary">
        <b-tr>
          <b-th width="auto">제목</b-th>
          <b-th style="width: 50ch">{{ qna.title }}</b-th>
          <b-th width="auto">작성시간</b-th>
          <b-th>{{ qna.asktime }}</b-th>
          <b-th width="auto">작성자</b-th>
          <b-th>{{ qna.userid }}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td colspan="6" style="text-align: left">{{ qna.content }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <hr style="border-top: 2px dashed #bbb" />
    <div v-if="qna.masterid">
      <span style="font-size: 35px" class="mb-3">QnA 답변</span>
      <b-table-simple class="mt-2 table-bordered text-center" style="min-height: 400px">
        <b-thead class="table-secondary">
          <b-tr>
            <b-th width="auto">관리자</b-th>
            <b-th style="width: 50wh">{{ qna.masterid }}</b-th>
            <b-th width="auto">답변시간</b-th>
            <b-th>{{ qna.anstime }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-td colspan="6" style="text-align: left">{{ qna.anscontent }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <b-button v-if="this.isManager" variant="outline-warning" style="width: 99%" class="btn" :to="{ name: 'QnaModifyAns', params: { no: qna.no } }">답변수정</b-button>
    </div>
    <div v-else>
      <b-button v-if="this.loginUser == qna.userid" style="width: 99%" variant="outline-success" class="btn" :to="{ name: 'QnaModify', params: { no: qna.no } }">질문수정</b-button>
      <hr />
      <h6 align="center">아직 답변이 달리지 않았습니다.</h6>
      <b-button v-if="this.isManager" variant="outline-warning  " style="width: 99%" class="btn" :to="{ name: 'QnaRegistAns', params: { no: qna.no } }">답변작성</b-button>
    </div>
    <b-button v-if="this.loginUser == qna.userid || this.isManager" variant="outline-success " style="width: 99%" class="btn" @click="deleteQna">질문삭제</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaDetail",
  props: {
    loginUser: null,
    isManager: null,
  },
  data() {
    return {
      qna: {
        no: "",
        title: "",
        content: "",
        asktime: "",
        userid: "",
        anscontent: "",
        anstime: "",
        masterid: "",
      },
    };
  },
  methods: {
    deleteQna() {
      this.$emit("delete-qna", this.qna);
    },
  },
  created() {
    if (!this.loginUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
      return;
    }
    axios.get("http://localhost:8080/happyhouse/qna/" + this.$route.params.no).then(({ data }) => {
      this.qna = data;
    });
  },
};
</script>
