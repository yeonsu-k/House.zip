<template>
  <div class="container">
    <h2>수정하기</h2>
    <b-form-group label="제목" label-for="input-title">
      <b-form-input id="input-title" v-model="notice.title" placeholder="Enter title"></b-form-input>
    </b-form-group>
    <b-form-group label="내용" label-for="input-content">
      <b-form-input id="input-content" v-model="notice.content" placeholder="Enter content"></b-form-input>
    </b-form-group>
    <b-button variant="outline-success" class="btn" @click="updateNotice">저장</b-button>
  </div>
</template>
<script>
export default {
  name: "NoticeModify",
  data() {
    return {
      notice: {
        no: "",
        title: "",
        content: "",
        regtime: "",
        id: "",
      },
    };
  },
  methods: {
    updateNotice() {
      if (this.title === "" || this.content === "") {
        alert("모든 내용을 입력해주세요");
      }
      this.$emit("update-notice", this.notice);
    },
  },
  created() {
    const no = this.$route.params.no;
    let noticeList = JSON.parse(localStorage.getItem("noticeList"));

    for (let i = 0; i < noticeList.length; i++) {
      if (noticeList[i].no === no) {
        this.notice = noticeList[i];
      }
    }
  },
};
</script>
