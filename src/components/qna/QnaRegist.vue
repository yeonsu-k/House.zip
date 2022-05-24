<template>
  <div>
    <div id="head">
      <p class="text-center h1">Q & A</p>
    </div>
    <div class="container my-4">
      <div class="shadow py-3 px-5 col-md-10 mx-auto" id="user_col">
        <div role="group" class="mt-3 mb-2">
          <div>
            <label for="input-title" style="font-weight: bold">제목</label>
            <b-form-input id="input-title" v-model="qna.title" placeholder="Enter title" trim></b-form-input>
          </div>
          <div role="group" class="my-3">
            <label for="input-content" style="font-weight: bold">내용</label>
            <b-form-textarea id="input-content" v-model="qna.content" placeholder="Enter content" rows="8"></b-form-textarea>
          </div>
          <div class="text-center">
            <b-button id="bbtn" style="background-color: #ece6cc" variant="outline-light" class="btn w-25" @click="regist">등록</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QnaRegist",
  props: {
    loginId: null,
  },
  data() {
    return {
      qna: {
        no: "",
        title: "",
        content: "",
        asktime: "",
        userid: "",
        anscontent: "",
        anstime: "",
        masterid: "",
        hit: "",
      },
    };
  },
  methods: {
    regist() {
      if (this.qna.title === "" || this.qna.content === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }

      let qna = {
        no: 0,
        title: this.qna.title,
        content: this.qna.content,
        asktime: "",
        userid: this.loginId,
        anscontent: "",
        anstime: "",
        masterid: "",
      };

      this.$emit("create-qna", qna);
    },
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
