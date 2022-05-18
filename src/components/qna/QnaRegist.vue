<template>
  <div class="container">
    <h2>QnA 질문 작성</h2>

    <div role="group" class="mt-2">
      <label for="input-title">제목</label>
      <b-form-input id="input-title" v-model="title" placeholder="Enter title" trim></b-form-input>
    </div>
    <div role="group" class="mt-2">
      <label for="input-content">내용</label>
      <b-form-textarea id="input-content" v-model="content" placeholder="Enter content" rows="8"></b-form-textarea>
    </div>
    <b-button variant="outline-success" @click="regist">등록</b-button>
  </div>
</template>
<script>
export default {
  name: "QnARegist",
  //no 가져오는 방법..
  //유저 아이디 가져오는 방법..
  // props: {
  //   user: {
  //     id: "",
  //     password: "",
  //     name: "",
  //     email: "",
  //     tel: "",
  //   },
  // },
  data() {
    return {
      no: "",
      title: "",
      content: "",
      asktime: "",
      userid: "",
      anscontent: "",
      anstime: "",
      masterid: "",
    };
  },
  methods: {
    regist() {
      if (this.title === "" || this.content === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }

      let qna = {
        no: 2,
        title: this.title,
        content: this.content,
        asktime: "2022-05-18 16:32",
        userid: "sf123",
        anscontent: "",
        anstime: "",
        masterid: "",
      };

      this.$emit("create-qna", qna);
    },
  },
};
</script>
