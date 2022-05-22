<template>
  <div>
    <router-view
      :loginUser="this.loginUser"
      :isManager="this.isManager"
      @create-qna="createQna"
      @update-qna="updateQna"
      @delete-qna="deleteQna"
      @create-qna-ans="createQnaAns"
      @update-qna-ans="updateQnaAns"
    />
    <!-- <router-view @create-qna="createQna" @update-qna="updateQna" @delete-qna="deleteQna" @create-qna-ans="createQnaAns" @update-qna-ans="updateQnaAns" /> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QnaView",
  props: {
    user: null,
  },
  data() {
    return {
      loginUser: "",
      isManager: "",
    };
  },
  methods: {
    createQna(qna) {
      axios
        .post("http://localhost:8080/happyhouse/qna/", {
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
        });
    },
    updateQna(qna) {
      axios
        .put("http://localhost:8080/happyhouse/qna/" + qna.no, {
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
        });
    },
    deleteQna(qna) {
      axios.delete("http://localhost:8080/happyhouse/qna/" + qna.no).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data == "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        this.$router.push({ name: "QnaView" });
      });
    },
    createQnaAns(qna) {
      axios
        .put("http://localhost:8080/happyhouse/qna/ans/" + qna.no, {
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
        });
    },
    updateQnaAns(qna) {
      axios
        .put("http://localhost:8080/happyhouse/qna/ans/" + qna.no, {
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
        });
    },
  },
  created() {
    if (this.user) {
      this.loginUser = this.user.id;
      this.isManager = this.user.manager;
    } else {
      this.loginUser = null;
      this.isManager = null;
    }
  },
};
</script>

<style scoped></style>
