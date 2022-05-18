<template>
  <div>
    <!-- Header -->
    <b-jumbotron>
      <div class="text-white">
        <h1 class="font-weight-bold display-4">Q & A</h1>
        <hr style="background-color: white; height: 2px" />
        <span style="font-size: 20px"><h6>관리자와 고객 1:1 질의응답</h6></span>
      </div>
    </b-jumbotron>
    <router-view :qnas="qnas" @create-qna="createQna" @update-qna="updateQna" @delete-qna="deleteQna" @create-qna-ans="createQnaAns" @update-qna-ans="updateQnaAns" />
  </div>
</template>

<script>
export default {
  name: "QnaView",
  data() {
    return {
      qnas: [],
    };
  },
  methods: {
    getQnaList() {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));
      if (qnaList) {
        this.qnas = qnaList;
      }
    },
    createQna(qna) {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));
      if (qnaList) {
        qnaList.push(qna);
      } else {
        qnaList = [];
        qnaList.push(qna);
      }

      localStorage.setItem("qnaList", JSON.stringify(qnaList));
      alert("등록 완료");
      this.getQnaList();
      // 리스트 화면으로 이동
      this.$router.push("/qna");
    },
    updateQna(qna) {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));

      for (let i = 0; i < qnaList.length; i++) {
        if (qnaList[i].no === qna.no) {
          this.$set(qnaList, i, qna);
          qnaList[i] = qna;
          alert("수정 완료");
          break;
        }
      }
      localStorage.setItem("qnaList", JSON.stringify(qnaList));
      this.getQnaList();
      this.$router.push("/qna");
    },
    deleteQna(qna) {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));

      for (let i = 0; i < qnaList.length; i++) {
        if (qnaList[i].no === qna.no) {
          qnaList.splice(i, 1);
          alert("삭제 완료");
          break;
        }
      }
      localStorage.setItem("qnaList", JSON.stringify(qnaList));
      this.getQnaList();
      this.$router.push("/qna");
    },
    createQnaAns(qna) {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));

      for (let i = 0; i < qnaList.length; i++) {
        if (qnaList[i].no === qna.no) {
          this.$set(qnaList, i, qna);
          qnaList[i] = qna;
          alert("답변 등록 완료");
          break;
        }
      }
      localStorage.setItem("qnaList", JSON.stringify(qnaList));
      this.getQnaList();
      this.$router.push("/qna");
    },
    updateQnaAns(qna) {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));

      for (let i = 0; i < qnaList.length; i++) {
        if (qnaList[i].no === qna.no) {
          this.$set(qnaList, i, qna);
          qnaList[i] = qna;
          alert("답변 수정 완료");
          break;
        }
      }
      localStorage.setItem("qnaList", JSON.stringify(qnaList));
      this.getQnaList();
      this.$router.push("/qna");
    },
  },
  created() {
    this.getQnaList();
  },
};
</script>

<style scoped>
.jumbotron {
  height: 40vh;
  text-align: center;
  position: relative;
  z-index: 1;
}
.jumbotron::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/login-bg.jpg");
  background-position: center;
  background-size: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;
}

.jumbotron > div {
  width: 70%;
  height: 40vh;
  display: inline-block;
}
</style>
