<template>
  <div>
    <notice-head></notice-head>
    <router-view :loginId="loginId" @create-notice="createNotice" @update-notice="updateNotice" @delete-notice="deleteNotice" />
  </div>
</template>

<script>
import NoticeHead from "@/components/notice/NoticeHead.vue";
import axios from "axios";
export default {
  components: {
    NoticeHead,
  },
  name: "NoticeView",
  props: {
    loginId: null,
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
};
</script>

<style scoped></style>
