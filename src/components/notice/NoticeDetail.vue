<template>
  <div>
    <div id="head">
      <p class="text-center h1">Notice</p>
    </div>
    <div class="container my-4">
      <div class="shadow py-3 px-5" id="user_col">
        <hr />
        <div class="mx-5">
          <b-row class="mb-3 h5">
            <b-col style="font-weight: bold">{{ notice.title }}</b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>작성일 &nbsp; {{ notice.regtime }}</span>
            </b-col>
            <b-col class="text-center">
              <span>작성자 &nbsp; {{ notice.userid }}</span>
            </b-col>
            <b-col class="text-right">
              <span>조회수 &nbsp; {{ notice.hit }}</span>
            </b-col>
          </b-row>
        </div>
        <hr />
        <div class="mx-4 mt-2" style="min-height: 35vh">
          <b-row class="ml-3">
            <b-col>
              <pre>{{ notice.content }}</pre>
            </b-col>
          </b-row>
        </div>
        <hr />
        <div v-if="isManager && loginUser === notice.userid" class="text-center">
          <b-row class="text-center" align-h="end">
            <b-button class="btn px-3 mr-2" id="bbtn" variant="outline-light" :to="{ name: 'NoticeModify', params: { no: notice.no } }">수정</b-button>
            <button class="btn px-3 mr-4" style="background-color: #ece6cc" @click="deleteNotice">삭제</button>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NoticeDetail",
  props: {
    loginUser: null,
    isManager: null,
  },
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
    deleteNotice() {
      this.$emit("delete-notice", this.notice);
    },
  },
  created() {
    if (!this.loginUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
      return;
    }
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
