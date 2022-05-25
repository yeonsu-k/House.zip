<template>
  <div>
    <div id="head">
      <p class="text-center h1">Q & A</p>
    </div>
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
        <div class="mx-4 mt-2" style="min-height: 35vh">
          <b-row class="ml-3">
            <b-col>
              <pre>{{ qna.content }}</pre>
            </b-col>
          </b-row>
        </div>
        <hr />
        <b-row class="text-right" align-h="end">
          <b-col cols="auto">
            <b-button v-if="this.loginId == qna.userid" id="bbtn" class="btn mr-2" variant="outline-light" :to="{ name: 'QnaModify' }">질문수정</b-button>
            <button v-if="this.loginId == qna.userid || this.isManager" class="btn" style="background-color: #ece6cc" @click="deleteQna">질문삭제</button>
          </b-col>
        </b-row>
      </div>
      <hr />

      <!-- <hr style="border-top: 2px dashed #bbb" /> -->
      <!-- <span class="h5 ml-5">Q&A 답변</span> -->
      <div class="shadow py-3 px-5" id="user_col">
        <div v-if="qna.masterid">
          <hr />
          <b-row class="mx-4">
            <b-col>
              <span>관리자 &nbsp; {{ qna.masterid }}</span>
            </b-col>
            <b-col class="text-center">
              <span>답변시간 &nbsp; {{ qna.anstime }}</span>
            </b-col>
            <b-col class="text-right"> </b-col>
          </b-row>
          <hr />
          <div class="mx-4 mt-2" style="min-height: 35vh">
            <b-row class="ml-3">
              <b-col>
                <pre>{{ qna.anscontent }}</pre>
              </b-col>
            </b-row>
          </div>
          <hr />
          <b-row v-if="this.isManager" class="text-right" align-h="end">
            <b-col cols="auto">
              <b-button style="background-color: #48608a" class="btn" :to="{ name: 'QnaModifyAns' }">답변수정</b-button>
            </b-col>
          </b-row>
        </div>
        <div v-else>
          <hr />
          <h6 align="center">등록된 답변이 없습니다.</h6>
          <b-row v-if="this.isManager" class="text-right" align-h="end">
            <b-col cols="auto">
              <b-button style="background-color: #48608a" class="btn mt-2" :to="{ name: 'QnaRegistAns' }">답변작성</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaDetail",
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
      isManager: false,
    };
  },
  methods: {
    deleteQna() {
      this.$emit("delete-qna", this.qna);
    },
  },
  created() {
    if (!this.loginId) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
      return;
    }
    this.isManager = JSON.parse(localStorage.getItem("isManager"));
    axios.get("http://localhost:8080/happyhouse/qna/" + this.$route.params.no).then(({ data }) => {
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
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}

#bbtn {
  color: black;
  background-color: #ece6cc;
}
</style>
