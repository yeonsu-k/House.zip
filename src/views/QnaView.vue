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
    <router-view
      :userid="this.userid"
      :isManager="this.isManager"
      :qnas="this.qnas"
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
      userid: "",
      isManager: "",
      qnas: [],
    };
  },
  methods: {
    getQnaList() {
      axios.get("http://localhost:8080/happyhouse/qna/").then(({ data }) => {
        this.qnas = data;
      });
    },
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
        // this.movieList();
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
    this.getQnaList();
    if (this.user) {
      this.userid = this.user.id;
      this.isManager = this.user.manager;
    } else {
      this.userid = null;
      this.isManager = null;
    }
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
