<template>
  <div>
    <div id="head">
      <p class="text-center h1">Notice</p>
    </div>
    <div class="container my-4">
      <div class="shadow py-3 px-5 col-md-12 mx-auto" id="user_col">
        <div role="group" class="my-3">
          <div>
            <label for="input-title" style="font-weight: bold">제목</label>
            <b-form-input id="input-title" v-model="notice.title" placeholder="Enter title" trim></b-form-input>
          </div>
          <div role="group" class="my-3">
            <label for="input-content" style="font-weight: bold">내용</label>
            <b-form-textarea id="input-content" v-model="notice.content" placeholder="Enter content" rows="8"></b-form-textarea>
          </div>
          <div class="text-center">
            <button style="background-color: #ece6cc" class="btn w-25" @click="updateNotice">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
#head {
  background-color: #48608a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
  color: lightcyan;
}
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}

#bbtn {
  color: black;
  background-color: #ece6cc;
}
</style>
