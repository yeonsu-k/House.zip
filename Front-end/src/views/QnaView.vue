<template>
  <div>
    <qna-head></qna-head>
    <router-view :loginId="loginId" @create-qna="createQna" @update-qna="updateQna" @delete-qna="deleteQna" @create-qna-ans="createQnaAns" @update-qna-ans="updateQnaAns" />
  </div>
</template>

<script>
import QnaHead from "@/components/qna/QnaHead.vue";
import axios from "axios";
export default {
  components: {
    QnaHead,
  },
  name: "QnaView",
  props: {
    loginId: null,
  },
  methods: {
    createQna(qna) {
      axios
        .post("http://localhost:8080/housezip/qna/", {
          no: qna.no,
          title: qna.title,
          content: qna.content,
          asktime: qna.asktime,
          userid: qna.userid,
          anscontent: qna.anscontent,
          anstime: qna.anstime,
          masterid: qna.masterid,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push({ name: "QnaView" });
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
    updateQna(qna) {
      axios
        .put("http://localhost:8080/housezip/qna/" + qna.no, {
          title: qna.title,
          content: qna.content,
          no: qna.no,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/qna");
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
    deleteQna(qna) {
      axios
        .delete("http://localhost:8080/housezip/qna/" + qna.no)
        .then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          this.$router.push({ name: "QnaView" });
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
    createQnaAns(qna) {
      axios
        .put("http://localhost:8080/housezip/qna/ans/" + qna.no, {
          no: qna.no,
          anscontent: qna.anscontent,
          anstime: qna.anstime,
          masterid: qna.masterid,
        })
        .then(({ data }) => {
          let msg = "답변등록 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "답변등록이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/qna");
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
    updateQnaAns(qna) {
      axios
        .put("http://localhost:8080/housezip/qna/ans/" + qna.no, {
          no: qna.no,
          anscontent: qna.anscontent,
          anstime: qna.anstime,
          masterid: qna.masterid,
        })
        .then(({ data }) => {
          let msg = "답변수정 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "답변수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/qna");
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    },
  },
};
</script>

<style scoped></style>
