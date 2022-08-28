<template>
  <div>
    <div class="container my-4">
      <div class="shadow py-3 px-5" id="user_col">
        <hr />
        <div class="mx-5">
          <b-row class="mb-3 h5">
            <b-col style="font-weight: bold">{{ qna.title }}</b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>작성일 &nbsp; {{ qna.asktime }}</span>
            </b-col>
            <b-col class="text-center">
              <span>작성자 &nbsp; {{ qna.userid }}</span>
            </b-col>
            <b-col class="text-right">
              <span>조회수 &nbsp; {{ qna.hit }}</span>
            </b-col>
          </b-row>
        </div>
        <hr />
        <div class="mx-4 mt-2">
          <b-row class="ml-3">
            <b-col>
              <pre>{{ qna.content }}</pre>
            </b-col>
          </b-row>
        </div>
        <hr />
        <b-row class="text-right" align-h="end">
          <b-col cols="auto">
            <button v-if="this.loginUser == qna.userid" style="background-color: #ece6cc" class="btn" :to="{ name: 'QnaModify' }">질문수정</button>
          </b-col>
          <b-col cols="auto" v-if="this.loginUser == qna.userid || this.isManager">
            <button style="background-color: #ece6cc" class="btn" @click="deleteQna">질문삭제</button>
          </b-col>
        </b-row>
      </div>
      <hr style="border-top: 2px dashed #bbb" />
      <div class="shadow py-3 px-5 mx-auto" id="user_col">
        <div role="group" class="mt-3 mb-2">
          <div role="group" class="my-3">
            <label for="input-content" style="font-weight: bold" class="mb-2">답변 작성</label>
            <b-form-textarea id="input-anscontent" v-model="qna.anscontent" placeholder="Enter content" rows="6"></b-form-textarea>
          </div>
          <div class="text-center">
            <b-button id="bbtn" variant="outline-light" class="btn w-25" @click="regist">등록</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaRegistAns",
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
      if (this.qna.anscontent === "") {
        alert("내용을 입력해주세요");
        return;
      }

      this.qna.masterid = this.loginId;

      this.$emit("create-qna-ans", this.qna);
    },
  },
  created() {
    axios.get("http://localhost:8080/housezip/qna/" + this.$route.params.no).then(({ data }) => {
      this.qna = data;
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
  height: 20vh;
  color: lightcyan;
}
#head p {
  font-weight: bold;
}

#bbtn {
  color: black;
  background-color: #ece6cc;
}
</style>
