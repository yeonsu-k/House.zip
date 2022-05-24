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
            <b-form-input id="input-title" v-model="title" placeholder="Enter title" trim></b-form-input>
          </div>
          <div role="group" class="my-3">
            <label for="input-content" style="font-weight: bold">내용</label>
            <b-form-textarea id="input-content" v-model="content" placeholder="Enter content" rows="8"></b-form-textarea>
          </div>
          <div class="text-center">
            <button style="background-color: #ece6cc" class="btn w-25" @click="regist">등록</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoticeRegist",
  props: {
    loginUser: null,
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
        userid: this.loginUser,
      };

      this.$emit("create-notice", notice);
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
  color: white;
}

#user_col {
  overflow: auto;
  background-color: white;
  align-self: center;
}
#user_col::-webkit-scrollbar {
  display: none;
}
</style>
