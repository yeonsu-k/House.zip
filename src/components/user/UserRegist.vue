<template>
  <div id="main">
    <b-container>
      <b-row class="container" align-h="center" style="height: 78vh">
        <b-col md="10" class="shadow py-5 px-5" id="user_col">
          <h2>회원 가입</h2>
          <hr />
          <div role="group" class="mt-2">
            <label for="input-id">아이디</label>
            <b-form-input id="input-id" size="sm" v-model="id" :state="idState" placeholder="Enter at least 4 letters" trim></b-form-input>
          </div>
          <form>
            <div role="group" class="mt-2">
              <label for="input-password">비밀번호</label>
              <b-form-input id="input-password" type="password" v-model="password" :state="passwordState" size="sm" placeholder="Enter your password" trim autocomplete="on"></b-form-input>
              <!-- <b-form-invalid-feedback id="input-live-feedback-password"> Enter at least 4 letters </b-form-invalid-feedback>
              <b-form-text id="input-live-help-password">Your password.</b-form-text> -->
            </div>
          </form>
          <div role="group" class="mt-2">
            <label for="input-name">이름</label>
            <b-form-input id="input-name" size="sm" v-model="name" :state="nameState" placeholder="Enter your name" trim></b-form-input>
          </div>

          <div role="group" class="mt-2">
            <label for="input-email">이메일</label>
            <b-form-input id="input-email" size="sm" type="email" v-model="email" placeholder="Enter your email" trim></b-form-input>
          </div>
          <div role="group" class="mt-2">
            <label for="input-tel">전화번호</label>
            <b-form-input id="input-tel" size="sm" v-model="tel" placeholder="Enter your phone number" trim></b-form-input>
          </div>
          <b-form-group class="mt-2" label="관심사" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" :aria-describedby="ariaDescribedby" name="flavour-1" :checked="options.true"></b-form-checkbox-group>
            <b-form-text id="input-live-help-name">매물을 볼 때 중요하게 생각하는 시설을 선택해주세요 (다중선택가능)</b-form-text>
          </b-form-group>
          <div class="mt-2">
            <!-- 버튼색 추천 :  #ece6cc , #48608a , #637DB0 , #57788c -->
            <button class="btn" style="background-color: #ece6cc; width: 100%" @click="regist">등록</button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "UserRegist",
  data() {
    return {
      id: "",
      password: "",
      name: "",
      email: "",
      tel: "",
      selected: [], // Must be an array reference!
      options: [
        { text: "학교", value: "학교" },
        { text: "학원", value: "학원" },
        { text: "의료", value: "의료" },
        { text: "편의점", value: "편의점" },
        { text: "지하철", value: "지하철" },
        { text: "유치원/어린이집", value: "유치원/어린이집" },
      ],
    };
  },
  watch: {
    options() {
      console.log(this.options);
    },
    selected() {
      console.log(this.selected);
    },
  },
  methods: {
    regist() {
      if (this.id === "" || this.password === "" || this.name === "" || this.email === "" || this.tel === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }
      let category = "";
      if (this.selected.length) {
        this.selected.forEach((element) => {
          category = element + "," + category;
        });
        category = category.substr(0, category.length - 1);
        // console.log(category.split(",").length);
      }
      let user = {
        id: this.id,
        password: this.password,
        name: this.name,
        email: this.email,
        tel: this.tel,
        category: category,
      };
      // alert(category);
      this.$emit("create-user", user);
    },
  },
  computed: {
    idState() {
      return this.id.length >= 4 ? true : false;
    },
    passwordState() {
      return this.password.length >= 4 ? true : false;
    },
    nameState() {
      return this.name.length >= 2 ? true : false;
    },
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
#main::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/img/slider1.jpg");
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
#user_col {
  height: 70vh;
  border-radius: 40px;
  overflow: auto;
  background-color: white;
  align-self: center;
}
#user_col::-webkit-scrollbar {
  display: none;
}
</style>
