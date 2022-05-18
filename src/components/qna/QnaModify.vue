<template>
  <div class="container">
    <b-form-group label="제목" label-for="input-title">
      <b-form-input id="input-title" v-model="qna.title" placeholder="Enter title"></b-form-input>
    </b-form-group>
    <b-form-group label="내용" label-for="input-content">
      <b-form-input id="input-content" v-model="qna.content" placeholder="Enter content"></b-form-input>
    </b-form-group>
    <b-button variant="outline-success" class="btn" @click="updateQna">저장</b-button>
  </div>
</template>
<script>
export default {
  name: "QnaModify",
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
    updateQna() {
      if (this.title === "" || this.content === "") {
        alert("모든 내용을 입력해주세요");
      }
      this.$emit("update-qna", this.qna);
    },
  },
  created() {
    const no = this.$route.params.no;
    let qnaList = JSON.parse(localStorage.getItem("qnaList"));

    for (let i = 0; i < qnaList.length; i++) {
      if (qnaList[i].no === no) {
        this.qna = qnaList[i];
      }
    }
  },
};
</script>
