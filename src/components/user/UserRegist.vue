<template>
  <div class="container">
    <h2>회원 가입</h2>

    <div role="group" class="mt-2">
      <label for="input-id">아이디</label>
      <b-form-input id="input-id" v-model="id" :state="idState" aria-describedby="input-live-help-id input-live-feedback-id" placeholder="Enter your id" trim></b-form-input>
      <!-- This will only be shown if the preceding input has an invalid state -->
      <b-form-invalid-feedback id="input-live-feedback-id"> Enter at least 4 letters </b-form-invalid-feedback>
      <!-- This is a form text block (formerly known as help block) -->
      <b-form-text id="input-live-help-id">Your unique id.</b-form-text>
    </div>
    <form>
      <div role="group" class="mt-2">
        <label for="input-password">비밀번호</label>
        <b-form-input
          id="input-password"
          type="password"
          v-model="password"
          :state="passwordState"
          aria-describedby="input-live-help-password input-live-feedback-password"
          placeholder="Enter your password"
          trim
          autocomplete="on"
        ></b-form-input>
        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback-password"> Enter at least 4 letters </b-form-invalid-feedback>
        <!-- This is a form text block (formerly known as help block) -->
        <b-form-text id="input-live-help-password">Your password.</b-form-text>
      </div>
    </form>
    <div role="group" class="mt-2">
      <label for="input-name">이름</label>
      <b-form-input id="input-name" v-model="name" :state="nameState" aria-describedby="input-live-help-name input-live-feedback-name" placeholder="Enter your name" trim></b-form-input>
      <!-- This will only be shown if the preceding input has an invalid state -->
      <b-form-invalid-feedback id="input-live-feedback-id"> Enter at least 2 letters </b-form-invalid-feedback>
      <!-- This is a form text block (formerly known as help block) -->
      <b-form-text id="input-live-help-name">Your full name.</b-form-text>
    </div>

    <div role="group" class="mt-2">
      <label for="input-email">이메일</label>
      <b-form-input id="input-email" type="email" v-model="email" placeholder="Enter your email" trim></b-form-input>
    </div>
    <div role="group" class="mt-2">
      <label for="input-tel">전화번호</label>
      <b-form-input id="input-tel" v-model="tel" placeholder="Enter your tel" trim></b-form-input>
    </div>

    <b-form-group class="mt-2" label="관심사" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" :aria-describedby="ariaDescribedby" name="flavour-1" :checked="options.true"></b-form-checkbox-group>
      <b-form-text id="input-live-help-name">매물을 볼 때 중요하게 생각하는 시설을 선택해주세요 (다중선택가능)</b-form-text>
    </b-form-group>
    <div class="mt-2">
      <b-button variant="outline-success" @click="regist">등록</b-button>
    </div>
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
