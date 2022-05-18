<template>
  <div>
    <router-view :qnas="qnas" @create-qna="createQna" @update-qna="updateQna" @delete-qna="deleteQna" @create-qna-ans="createQnaAns" @update-qna-ans="updateQnaAns" />
  </div>
</template>

<script>
export default {
  name: "Qna",
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
        if (qnaList[i].id === qna.id) {
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
        if (qnaList[i].id === qna.id) {
          qnaList.splice(i, 1);
          alert("삭제 완료");
          break;
        }
      }

      localStorage.setItem("qnaList", JSON.stringify(qnaList));
      this.qnaList();
      this.$router.push("/qna");
    },
    createQnaAns(qna) {
      let qnaList = JSON.parse(localStorage.getItem("qnaList"));

      for (let i = 0; i < qnaList.length; i++) {
        if (qnaList[i].id === qna.id) {
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
        if (qnaList[i].id === qna.id) {
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

<style></style>
