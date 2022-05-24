<template>
  <div>
    <div id="head">
      <p class="text-center h1">Q & A</p>
    </div>
    <div class="container my-4">
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
          <b-col> {{ qna.content }} </b-col>
        </b-row>
      </div>
      <hr />
      <b-row>
        <b-col v-if="this.loginUser == qna.userid">
          <button style="background-color: #ece6cc" class="btn w-100" :to="{ name: 'QnaModify' }">질문수정</button>
        </b-col>
        <b-col v-if="this.loginUser == qna.userid || this.isManager">
          <button style="background-color: #ece6cc" class="btn w-100" @click="deleteQna">질문삭제</button>
        </b-col>
      </b-row>

      <hr style="border-top: 2px dashed #bbb" />
      <!-- <span class="h5 ml-5">Q&A 답변</span> -->
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
            <b-col>{{ qna.anscontent }} </b-col>
          </b-row>
        </div>
        <hr />
        <b-button v-if="this.isManager" style="background-color: #48608a" class="btn w-100" :to="{ name: 'QnaModifyAns' }">답변수정</b-button>
      </div>
      <div v-else>
        <hr />
        <h6 align="center">아직 답변이 달리지 않았습니다.</h6>
        <b-button v-if="this.isManager" style="background-color: #48608a" class="btn w-100 mt-2" :to="{ name: 'QnaRegistAns' }">답변작성</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaDetail",
  props: {
    loginUser: null,
    isManager: null,
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
    deleteQna() {
      this.$emit("delete-qna", this.qna);
    },
  },
  created() {
    if (!this.loginUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
      return;
    }
    axios.get("http://localhost:8080/happyhouse/qna/" + this.$route.params.no).then(({ data }) => {
      this.qna = data;
    });
  },
};
</script>

<style scoped>
#head {
  background-color: #ece6cc;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
}
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}

#bbtn {
  color: white;
}
</style>
