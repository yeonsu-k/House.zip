<template>
  <div class="container">
    <h2>회원 정보</h2>
    <b-form-group label="아이디" label-for="input-id">
      <b-form-input id="input-id" v-model="user.id" placeholder="Enter id" readonly></b-form-input>
    </b-form-group>
    <b-form-group label="비밀번호" label-for="input-password">
      <b-form-input id="input-password" type="password" v-model="user.password" placeholder="Enter password"></b-form-input>
    </b-form-group>
    <b-form-group label="이름" label-for="input-name">
      <b-form-input id="input-name" v-model="user.name" placeholder="Enter name"></b-form-input>
    </b-form-group>
    <b-form-group label="이메일" label-for="input-email">
      <b-form-input id="input-email" type="email" v-model="user.email" placeholder="Enter email"></b-form-input>
    </b-form-group>
    <b-form-group label="전화번호" label-for="input-tel">
      <b-form-input id="input-tel" v-model="user.tel" placeholder="Enter tel"></b-form-input>
    </b-form-group>

    <!-- <b-form-group class="mt-2" label="관심사" v-slot="{ ariaDescribedby }"> -->
    <!-- <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" :aria-describedby="ariaDescribedby" name="flavour-1" :checked="options.true"></b-form-checkbox-group>
      <b-form-checkbox-group v-model="selected" :options="options" :aria-describedby="ariaDescribedby" buttons button-variant="outline-success" name="buttons-2"></b-form-checkbox-group>
      <b-form-checkbox id="학교" checked="true" v-model="selected" value="학교">학교</b-form-checkbox> -->
    <div>관심사</div>
    <div id="input-cate" class="mt-2">
      <span class="mr-3" v-for="(option, index) in options" :key="index">
        <input type="checkbox" :id="option.text" :options="options" v-model="option.checked" />
        <label :for="option.text"> {{ option.text }}</label>
      </span>
    </div>
    <b-form-text id="input-live-help-name">매물을 볼 때 중요하게 생각하는 시설을 선택해주세요 (다중선택가능)</b-form-text>
    <!-- </b-form-group> -->
    <!-- <div>
      Selected: <strong>{{ selected }}</strong>
    </div> -->
    <b-button variant="outline-success" class="btn" @click="updateUser">수정</b-button>
    <b-button v-if="!isManager" variant="outline-success" class="btn" @click="deleteUser">삭제</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserDetail",
  props: {
    loginUser: null,
    isManager: null,
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
      // selected: [], // Must be an array reference!
      options: [
        { text: "학교", value: "학교", checked: false },
        { text: "학원", value: "학원", checked: false },
        { text: "의료", value: "의료", checked: false },
        { text: "편의점", value: "편의점", checked: false },
        { text: "지하철", value: "지하철", checked: false },
        { text: "유치원/어린이집", value: "유치원/어린이집", checked: false },
      ],
    };
  },
  computed: {
    checkedNames() {
      return this.names.filter((item) => item.checked).map((name) => name.name);
    },
  },
  methods: {
    updateUser() {
      let category = "";
      this.options.forEach((option) => {
        if (option.checked) {
          category = option.value + "," + category;
        }
      });
      if (category == "") this.user.category = "";
      else this.user.category = category.substr(0, category.length - 1);

      this.$emit("update-user", this.user);
    },
    deleteUser() {
      this.$emit("delete-user", this.user);
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/user/" + this.loginUser).then(({ data }) => {
      this.user = data;
      this.user.category.split(",").forEach((element) => {
        this.options.forEach((option) => {
          if (option.text == element) {
            option.checked = true;
            return false;
          }
        });
      });
    });
  },
};
</script>
