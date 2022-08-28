<template>
  <div>
    <div class="container my-4">
      <div class="shadow py-3 px-5 col-md-12 mx-auto" id="user_col">
        <div role="group" class="my-3">
          <div>
            <label for="input-title" style="font-weight: bold">제목</label>
            <b-form-input id="input-title" v-model="qna.title" placeholder="Enter title" trim></b-form-input>
          </div>
          <div role="group" class="my-3">
            <label for="input-content" style="font-weight: bold">내용</label>
            <b-form-textarea id="input-content" v-model="qna.content" placeholder="Enter content" rows="8"></b-form-textarea>
          </div>
          <div class="text-center">
            <button style="background-color: #ece6cc" class="btn w-25" @click="updateQna">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "QnaModify",
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
    updateQna() {
      if (this.qna.title === "" || this.qna.content === "") {
        alert("모든 내용을 입력해주세요");
      }

      this.$emit("update-qna", this.qna);
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
  height: 25vh;
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
