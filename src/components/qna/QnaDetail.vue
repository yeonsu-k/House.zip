<template>
  <div class="container">
    <h2>QnA 상세보기</h2>
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
