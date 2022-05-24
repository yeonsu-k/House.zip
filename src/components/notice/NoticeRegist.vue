<template>
  <div class="container">
    <span style="font-size: 35px">공지사항 작성</span>
    <hr />
    <div role="group" class="mt-2">
      <label for="input-title">제목</label>
      <b-form-input id="input-title" v-model="title" placeholder="Enter title" trim></b-form-input>
    </div>
    <div role="group" class="mt-2">
      <label for="input-content">내용</label>
      <b-form-textarea id="input-content" v-model="content" placeholder="Enter content" rows="8"></b-form-textarea>
    </div>
    <div style="text-align: center">
      <b-button style="width: 99%" variant="outline-success" @click="regist">등록</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoticeRegist",
  props: {
    loginId: null,
  },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    regist() {
      if (this.title === "" || this.content === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }

      let notice = {
        no: 0,
        title: this.title,
        content: this.content,
        regtime: "",
        userid: this.loginId,
      };

      this.$emit("create-notice", notice);
    },
  },
};
</script>
