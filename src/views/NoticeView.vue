<template>
  <div>
    <!-- Header -->
    <b-jumbotron>
      <div class="text-white">
        <h1 class="font-weight-bold display-4">공지사항</h1>
      </div>
    </b-jumbotron>
    <router-view :loginUser="loginUser" :isManager="isManager" @create-notice="createNotice" @update-notice="updateNotice" @delete-notice="deleteNotice" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NoticeView",
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
    createNotice(notice) {
      axios
        .post("http://localhost:8080/happyhouse/notice/", {
          no: notice.no,
          title: notice.title,
          content: notice.content,
          regtime: notice.regtime,
          userid: notice.userid,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          // this.$router.push({ name: "NoticeView" });
          this.$router.push("/notice");
        });
    },
    updateNotice(notice) {
      axios
        .put("http://localhost:8080/happyhouse/notice/" + notice.no, {
          title: notice.title,
          content: notice.content,
          no: notice.no,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/notice");
        });
    },
    deleteNotice(notice) {
      axios.delete("http://localhost:8080/happyhouse/notice/" + notice.no).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data == "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        // this.$router.push({ name: "NoticeView" });
        this.$router.push("/notice");
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
  background: url("@/assets/img/notice.jpg");
  background-position: center;
  background-size: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;
}
</style>
