<template>
  <div class="container">
    <span style="font-size: 35px">질문 상세</span>
    <hr />
    <b-table-simple class="mt-2 table-bordered text-center" style="min-height: 400px">
      <b-thead class="table-secondary">
        <b-tr>
          <b-th width="auto">제목</b-th>
          <b-th style="width: 50wh">{{ qna.title }}</b-th>
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
    <div v-if="qna.masterid">
      <h4>QnA 답변</h4>
      <b-form-group label="관리자" label-for="input-mid">
        <b-form-input id="input-mid" v-model="qna.masterid" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="답변시간" label-for="input-anstime">
        <b-form-input id="input-anstime" v-model="qna.anstime" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="답변내용" label-for="input-anscontent">
        <b-form-input id="input-anscontent" v-model="qna.anscontent" placeholder="Enter content" readonly></b-form-input>
      </b-form-group>
      <b-button variant="outline-success" class="btn" :to="{ name: 'QnaModifyAns', params: { no: qna.no } }">답변수정</b-button>
    </div>
    <div v-else>
      <b-button variant="outline-success" class="btn" :to="{ name: 'QnaModify', params: { no: qna.no } }">질문수정</b-button>
      <h4>아직 답변이 달리지 않았습니다.</h4>
      <b-button variant="outline-success" class="btn" :to="{ name: 'QnaRegistAns', params: { no: qna.no } }">답변작성</b-button>
    </div>
    <b-button variant="outline-success" class="btn" @click="deleteQna">질문삭제</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaDetail",
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
    axios.get("http://localhost:8080/happyhouse/qna/" + this.$route.params.no).then(({ data }) => {
      this.qna = data;
    });
  },
};
</script>
