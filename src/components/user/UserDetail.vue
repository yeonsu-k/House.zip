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
      },
    };
  },
  methods: {
    updateUser() {
      this.$emit("update-user", this.user);
    },
    deleteUser() {
      this.$emit("delete-user", this.user);
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/user/" + this.loginUser).then(({ data }) => {
      this.user = data;
    });
  },
};
</script>
