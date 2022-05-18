<template>
  <b-container>
    <span style="font-size: 35px">답변 수정</span>
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
    <span style="font-size: 35px">QnA 답변 수정</span>
    <b-form-group class="mt-3" label-for="input-anscontent">
      <b-form-textarea id="input-anscontent" v-model="qna.anscontent" placeholder="Enter content" rows="6"></b-form-textarea>
    </b-form-group>
    <b-button style="width: 99%" variant="outline-success" @click="updateAns">저장</b-button>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  name: "QnAModify",
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
    updateAns() {
      if (this.qna.anscontent === "") {
        alert("내용을 입력해주세요");
        return;
      }

      this.$emit("update-qna-ans", this.qna);
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/qna/" + this.$route.params.no).then(({ data }) => {
      this.qna = data;
    });
  },
};
</script>
