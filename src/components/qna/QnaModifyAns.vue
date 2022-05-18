<template>
  <div class="container">
    <h2>수정</h2>

    <b-form-group label="제목" label-for="input-title">
      <b-form-input id="input-title" v-model="qna.title" placeholder="Enter title" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="작성자" label-for="input-id">
      <b-form-input id="input-id" v-model="qna.userid" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="작성시간" label-for="input-asktime">
      <b-form-input id="input-asktime" v-model="qna.asktime" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="내용" label-for="input-content">
      <b-form-input id="input-content" v-model="qna.content" placeholder="Enter content" readonly></b-form-input>
    </b-form-group>

    <h4>QnA 답변 수정</h4>
    <b-form-group label="답변내용" label-for="input-anscontent">
      <b-form-input id="input-anscontent" v-model="qna.anscontent" placeholder="Enter content"></b-form-input>
    </b-form-group>
    <b-button variant="outline-success" @click="updateAns">저장</b-button>
  </div>
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
