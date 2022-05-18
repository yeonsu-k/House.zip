<template>
  <div>
    <!-- Header -->
    <b-jumbotron>
      <div class="text-white">
        <h1 class="font-weight-bold display-4">공지사항</h1>
      </div>
    </b-jumbotron>
    <router-view :notices="notices" @create-notice="createNotice" @update-notice="updateNotice" @delete-notice="deleteNotice" />
  </div>
</template>

<script>
export default {
  name: "NoticeView",
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    getNoticeList() {
      let noticeList = JSON.parse(localStorage.getItem("noticeList"));
      if (noticeList) {
        this.notices = noticeList;
      }
    },
    createNotice(notice) {
      let noticeList = JSON.parse(localStorage.getItem("noticeList"));
      if (noticeList) {
        noticeList.push(notice);
      } else {
        noticeList = [];
        noticeList.push(notice);
      }

      localStorage.setItem("noticeList", JSON.stringify(noticeList));
      alert("등록 완료");
      this.getNoticeList();
      // 리스트 화면으로 이동
      this.$router.push("/notice");
    },
    updateNotice(notice) {
      let noticeList = JSON.parse(localStorage.getItem("noticeList"));

      for (let i = 0; i < noticeList.length; i++) {
        if (noticeList[i].no === notice.no) {
          this.$set(noticeList, i, notice);
          noticeList[i] = notice;
          alert("수정 완료");
          break;
        }
      }
      localStorage.setItem("noticeList", JSON.stringify(noticeList));
      this.getNoticeList();
      this.$router.push("/notice");
    },
    deleteNotice(notice) {
      let noticeList = JSON.parse(localStorage.getItem("noticeList"));

      for (let i = 0; i < noticeList.length; i++) {
        if (noticeList[i].no === notice.no) {
          noticeList.splice(i, 1);
          alert("삭제 완료");
          break;
        }
      }

      localStorage.setItem("noticeList", JSON.stringify(noticeList));
      this.getNoticeList();
      this.$router.push("/notice");
    },
  },
  created() {
    this.getNoticeList();
  },
};
</script>

<style scoped>
.jumbotron {
  background-image: url("@/assets/notice.jpg");
  background-position: center;
  background-size: fill;
  height: 40vh;
  text-align: center;
}
.jumbotron > div {
  width: 70%;
  height: 40vh;
  display: inline-block;
}
</style>
