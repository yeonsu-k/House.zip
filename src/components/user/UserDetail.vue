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
    <b-button variant="outline-success" class="btn" @click="deleteUser">삭제</b-button>
  </div>
</template>
<script>
export default {
  name: "UserDetail",
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
    // const pathName = new URL(document.location).pathname.split("/");
    // const id = pathName[pathName.length - 1];
    const id = this.$route.params.id;
    // localStorage에서 carList 저장된 자동차 목록을 얻어온 후 JSON객체로 parsing한다.
    let userList = JSON.parse(localStorage.getItem("userList"));

    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id === id) {
        this.user = userList[i];
      }
    }
  },
};
</script>
