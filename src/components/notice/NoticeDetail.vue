<template>
  <div class="container">
    <h2>상세보기</h2>
    <b-form-group label="제목" label-for="input-title">
      <b-form-input id="input-title" v-model="notice.title" placeholder="Enter title" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="작성자" label-for="input-id">
      <b-form-input id="input-id" v-model="notice.id" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="작성시간" label-for="input-regtime">
      <b-form-input id="input-regtime" v-model="notice.regtime" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="내용" label-for="input-content">
      <b-form-input id="input-content" v-model="notice.content" placeholder="Enter content" readonly></b-form-input>
    </b-form-group>
    <b-button variant="outline-success" class="btn" :to="{ name: 'NoticeModify', params: { no: notice.no } }">수정</b-button>
    <b-button variant="outline-success" class="btn" @click="deleteNotice">삭제</b-button>
  </div>
</template>
<script>
export default {
  name: "NoticeDetail",
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
    deleteNotice() {
      this.$emit("delete-notice", this.notice);
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
