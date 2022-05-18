<template>
  <div class="container">
    <h2>QnA 답변 작성</h2>

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

    <h4>QnA 답변 작성</h4>
    <b-form-group label="답변내용" label-for="input-anscontent">
      <b-form-input id="input-anscontent" v-model="qna.anscontent" placeholder="Enter content"></b-form-input>
    </b-form-group>
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
    regist() {
      if (this.qna.anscontent === "") {
        alert("내용을 입력해주세요");
        return;
      }

      this.qna.anstime = "2022-05-19 17:32";
      this.qna.masterid = "ssafyssafy";

      this.$emit("create-qna-ans", this.qna);
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
