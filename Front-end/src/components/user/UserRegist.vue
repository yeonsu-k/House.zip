<template>
  <div id="main">
    <b-container>
      <b-row class="container" align-h="center" style="height: 78vh">
        <b-col md="8" class="shadow py-5 px-5" id="user_col">
          <h2>회원 가입</h2>
          <hr />
          <div role="group" class="mt-2">
            <label for="input-id">아이디</label>
            <button class="btn-sm ml-2" id="bbtn" variant="outline-light" @click="checkid">중복확인</button>
            <b-form-input id="input-id" size="sm" v-model="id" :state="idState" placeholder="Enter at least 4 letters" trim></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-password"> Enter at least 4 letters </b-form-invalid-feedback>
          </div>
          <form>
            <div role="group" class="mt-2">
              <label for="input-password">비밀번호</label>
              <b-form-input id="input-password" type="password" v-model="password" :state="passwordState" size="sm" placeholder="Enter your password" trim autocomplete="on"></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback-password"> Enter at least 4 letters </b-form-invalid-feedback>
            </div>
            <div role="group" class="mt-2">
              <b-form-input id="input-pwdcheck" type="password" v-model="pwdcheck" :state="pwdCheckState" size="sm" placeholder="one more password" trim autocomplete="on"></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback-password-check"> Don't match password </b-form-invalid-feedback>
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
          <div role="group" class="mt-2">
            <label for="input-tel">관심지역</label>
            <b-row class="mb-2 my-1 text-center">
              <b-col class="sm">
                <b-form-select size="sm" v-model="sidoCode" :options="sidos" @change="gugunList">
                  <b-form-select-option :value="null" disabled>시도를 선택하세요</b-form-select-option>
                </b-form-select>
              </b-col>
              <b-col class="sm">
                <b-form-select size="sm" v-model="gugunCode" :options="guguns">
                  <b-form-select-option :value="null" disabled>구군을 선택하세요</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
          </div>
          <b-form-group class="mt-2" label="관심사" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" :aria-describedby="ariaDescribedby" name="flavour-1" :checked="options.true"></b-form-checkbox-group>
            <b-form-text id="input-live-help-name">매물을 볼 때 중요하게 생각하는 시설을 선택해주세요 (다중선택가능)</b-form-text>
          </b-form-group>
          <div class="mt-2">
            <button class="btn" style="background-color: #ece6cc; width: 100%" @click="regist">등록</button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserRegist",
  props: {
    loginId: null,
  },
  data() {
    return {
      idchecked: false,
      id: "",
      password: "",
      pwdcheck: "",
      name: "",
      email: "",
      tel: "",
      selected: [], // Must be an array reference!
      options: [
        { text: "지하철역", value: "0" },
        { text: "병원", value: "1" },
        { text: "약국", value: "2" },
        { text: "마트", value: "3" },
        { text: "유치원/어린이집", value: "4" },
        { text: "학교", value: "5" },
        { text: "학원", value: "6" },
        { text: "문화", value: "7" },
        { text: "식당", value: "8" },
        { text: "카페", value: "9" },
      ],
      sidoCode: null,
      gugunCode: null,
      sidos: [],
      guguns: [],
    };
  },
  created() {
    this.clearSido();
    this.getSido();
  },
  methods: {
    checkid() {
      if (this.id === "") {
        alert("ID를 입력해주세요");
        return;
      }
      axios
        .get("/housezip/checked/" + this.id)
        .then(({ data }) => {
          let msg = "중복입니다!";
          if (data == 1) {
            msg = "사용가능한 ID입니다";
            document.getElementById("input-id").readOnly = true;
            this.idchecked = true;
          }
          alert(msg);
        })
        .catch(({ error }) => {});
    },
    regist() {
      if (!this.idchecked) {
        alert("ID 중복검사를 해주세요");
        return;
      }
      if (this.password === "" || this.pwdcheck === "" || this.name === "" || this.email === "" || this.tel === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (!re.test(this.email)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return;
      }
      let category = "";
      if (this.selected.length) {
        this.selected.forEach((element) => {
          category = element + "," + category;
        });
        category = category.substr(0, category.length - 1);
      }
      let user = {
        id: this.id,
        password: this.password,
        name: this.name,
        email: this.email,
        tel: this.tel,
        category: category,
        interestSidoCode: this.sidoCode,
        interestGugunCode: this.gugunCode,
      };
      this.$emit("create-user", user);
    },
    getSido() {
      axios.get("http://localhost:8080/housezip/house/list/sido").then(({ data }) => {
        this.sidos = data.map((category) => ({ value: category.sidoCode, text: category.sidoName }));
      });
    },
    getGugun() {
      if (this.sidoCode) {
        axios.get("http://localhost:8080/housezip/house/list/gugun/" + this.sidoCode).then(({ data }) => {
          this.guguns = data.map((category) => ({ value: category.gugunCode, text: category.gugunName }));
        });
      }
    },
    clearSido() {
      this.sidos = [];
    },
    gugunList() {
      console.log(this.sidoCode);
      this.guguns = [];
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun();
    },
  },
  computed: {
    idState() {
      return this.id.length >= 4 ? true : false;
    },
    passwordState() {
      return this.password.length >= 4 ? true : false;
    },
    pwdCheckState() {
      return this.pwdcheck.trim() != "" && this.pwdcheck === this.password ? true : false;
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
#bbtn {
  color: black;
  background-color: #ece6cc;
  border: 0;
  outline: 0;
}
</style>
