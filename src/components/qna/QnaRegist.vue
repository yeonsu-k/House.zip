<template>
  <div class="container">
    <span style="font-size: 35px">QnA 질문 작성</span>
    <hr />
    <div role="group" class="mt-2">
      <label for="input-title">제목</label>
      <b-form-input id="input-title" v-model="qna.title" placeholder="Enter title" trim></b-form-input>
    </div>
    <div role="group" class="mt-2">
      <label for="input-content">내용</label>
      <b-form-textarea id="input-content" v-model="qna.content" placeholder="Enter content" rows="8"></b-form-textarea>
    </div>
    <div style="text-align: center">
      <b-button style="width: 99%" variant="" @click="regist">등록</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "QnARegist",
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
      if (this.qna.title === "" || this.qna.content === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }

      let qna = {
        no: 0,
        title: this.qna.title,
        content: this.qna.content,
        asktime: "",
        userid: this.loginUser,
        anscontent: "",
        anstime: "",
        masterid: "",
      };

      this.$emit("create-qna", qna);
    },
  },
};
</script>
