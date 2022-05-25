<template>
  <div class="container">
    <h4 style="font-weight: bold">회원 정보 수정</h4>
    <hr />
    <b-row>
      <b-col>
        <b-form-group label="아이디" label-for="input-id">
          <b-form-input id="input-id" v-model="user.id" placeholder="Enter id" readonly></b-form-input>
        </b-form-group>
        <form>
          <b-form-group label="비밀번호" label-for="input-password">
            <b-form-input id="input-password" type="password" v-model="user.password" placeholder="Enter password"></b-form-input>
          </b-form-group>
        </form>
        <b-form-group label="이름" label-for="input-name">
          <b-form-input id="input-name" v-model="user.name" placeholder="Enter name"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="이메일" label-for="input-email">
          <b-form-input id="input-email" type="email" v-model="user.email" placeholder="Enter email"></b-form-input>
        </b-form-group>
        <b-form-group label="전화번호" label-for="input-tel">
          <b-form-input id="input-tel" v-model="user.tel" placeholder="Enter tel"></b-form-input>
        </b-form-group>
        <label for="input-tel">관심지역</label>
        <b-row class="text-center">
          <b-col>
            <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList">
              <b-form-select-option :value="null" disabled>시도를 선택하세요</b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="gugunCode" :options="guguns">
              <b-form-select-option :value="null" disabled>구군을 선택하세요</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <label>관심사</label>
    <div>
      <span class="mr-3 text-center" v-for="(option, index) in options" :key="index">
        <input type="checkbox" :id="option.text" :options="options" v-model="option.checked" />
        <label :for="option.text"> {{ option.text }}</label>
      </span>
      <b-form-text id="input-live-help-name">매물을 볼 때 중요하게 생각하는 시설을 선택해주세요 (다중선택가능)</b-form-text>
    </div>
    <b-button class="btn mt-3 w-100" variant="outline-light" id="bbtn" @click="updateUser">수정</b-button>
    <b-button v-if="!isManager" variant="outline-success" class="btn" @click="deleteUser">삭제</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserDetail",
  props: {
    loginId: null,
  },
  data() {
    return {
      user: {
        id: "",
        password: "",
        name: "",
        email: "",
        tel: "",
        category: "",
      },
      selected: [], // Must be an array reference!
      options: [
        { text: "지하철역", value: "0", checked: false },
        { text: "병원", value: "1", checked: false },
        { text: "약국", value: "2", checked: false },
        { text: "마트", value: "3", checked: false },
        { text: "유치원/어린이집", value: "4", checked: false },
        { text: "학교", value: "5", checked: false },
        { text: "학원", value: "6", checked: false },
        { text: "문화", value: "7", checked: false },
        { text: "식당", value: "8", checked: false },
        { text: "카페", value: "9", checked: false },
      ],
      sidoCode: null,
      gugunCode: null,
      sidos: [],
      guguns: [],
    };
  },
  methods: {
    isManager() {
      return localStorage.getItem("isManager");
    },
    getSido() {
      axios.get("http://localhost:8080/happyhouse/house/list/sido").then(({ data }) => {
        this.sidos = data.map((category) => ({ value: category.sidoCode, text: category.sidoName }));
      });
    },
    getGugun() {
      if (this.sidoCode) {
        axios.get("http://localhost:8080/happyhouse/house/list/gugun/" + this.sidoCode).then(({ data }) => {
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
      // if (this.sidoCode) this.getGugun(this.sidoCode);
      if (this.sidoCode) this.getGugun();
    },
    updateUser() {
      let category = "";
      this.options.forEach((option) => {
        if (option.checked) {
          category = option.value + "," + category;
        }
      });
      if (category == "") this.user.category = "";
      else this.user.category = category.substr(0, category.length - 1);
      this.user.interestSidoCode = this.sidoCode;
      this.user.interestGugunCode = this.gugunCode;

      this.$emit("update-user", this.user);
    },
    deleteUser() {
      this.$emit("delete-user", this.user);
    },
  },
  created() {
    this.clearSido();
    this.getSido();
    // let loginId = localStorage.getItem("loginId");
    console.log(localStorage.getItem("jwt"));
    if (this.$route.params.id) {
      axios
        .get("/happyhouse/user/" + this.$route.params.id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset = utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then(({ data }) => {
          this.user = data;
          this.user.category.split(",").forEach((element) => {
            this.options[parseInt(element)].checked = true;
          });
          if (this.user.interestSidoCode) {
            this.sidoCode = this.user.interestSidoCode;
            this.getGugun();
            this.gugunCode = this.user.interestGugunCode;
          }
        })
        .catch(({ error }) => {
          alert("조회 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    }
  },
};
</script>

<style scoped>
#bbtn {
  color: black;
  background-color: #ece6cc;
}
</style>
