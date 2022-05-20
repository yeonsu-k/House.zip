<template>
  <b-container>
    <span style="font-size: 35px">수정하기</span>
    <hr />
    <b-form-group label="제목" label-for="input-title">
      <b-form-input id="input-title" v-model="notice.title" placeholder="Enter title"></b-form-input>
    </b-form-group>
    <b-form-group label="내용" label-for="input-content">
      <b-form-textarea id="input-content" v-model="notice.content" placeholder="Enter content" rows="8"></b-form-textarea>
    </b-form-group>
    <b-button class="btn" style="width: 98%" variant="outline-success" @click="updateNotice">저장</b-button>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  name: "NoticeModify",
  data() {
    return {
      notice: {
        no: "",
        title: "",
        content: "",
        regtime: "",
        userid: "",
        hit: "",
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
    axios.get("http://localhost:8080/happyhouse/notice/" + this.$route.params.no).then(({ data }) => {
      this.notice = data;
    });
  },
};
</script>
