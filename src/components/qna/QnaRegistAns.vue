<template>
  <div class="container">
    <span style="font-size: 35px">QnA 답변 작성</span>
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
    <span style="font-size: 35px">QnA 답변 작성</span>
    <b-form-group class="mt-3" label-for="input-anscontent">
      <b-form-textarea id="input-anscontent" v-model="qna.anscontent" placeholder="Enter content" rows="6"></b-form-textarea>
    </b-form-group>
    <b-button style="width: 99%" variant="outline-success" @click="regist">등록</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaRegistAns",
  props: {
    loginUser: null,
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
        hit: "",
      },
    };
  },
  methods: {
    regist() {
      if (this.qna.anscontent === "") {
        alert("내용을 입력해주세요");
        return;
      }

      this.qna.masterid = this.loginUser;

      this.$emit("create-qna-ans", this.qna);
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/qna/" + this.$route.params.no).then(({ data }) => {
      this.qna = data;
    });
  },
};
</script>
