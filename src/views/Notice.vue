<template>
  <div>
    <router-view :notices="notices" @create-notice="createNotice" @update-notice="updateNotice" @delete-notice="deleteNotice" />
  </div>
</template>

<script>
export default {
  name: "Notice",
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
        if (noticeList[i].id === notice.id) {
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
        if (noticeList[i].id === notice.id) {
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

<style></style>
