<template>
  <div>
    <!-- Header-->
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>welcome to house</h4></span>
      </div>
    </b-jumbotron>
    <router-view :loginUser="this.loginUser" :isManager="this.isManager" @create-user="createUser" @update-user="updateUser" @delete-user="deleteUser" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserView",
  props: {
    user: null,
  },
  data() {
    return {
      loginUser: "",
      isManager: "",
    };
  },
  methods: {
    createUser(user) {
      axios
        .post("http://localhost:8080/happyhouse/user/", {
          id: user.id,
          password: user.password,
          name: user.name,
          email: user.email,
          tel: user.tel,
          category: user.category,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data == 1) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/");
        })
        .catch(({ error }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";

          alert(msg);
          this.$router.push("/");
        });
    },
    updateUser(user) {
      axios
        .put("http://localhost:8080/happyhouse/user/" + user.id, {
          id: user.id,
          password: user.password,
          name: user.name,
          email: user.email,
          tel: user.tel,
          category: user.category,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data == 1) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push("/user");
        });
    },
    deleteUser(user) {
      axios.delete("http://localhost:8080/happyhouse/user/" + user.id).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data == 1) {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        this.$emit("logout");
      });
    },
  },
  created() {
    if (this.user) {
      this.loginUser = this.user.id;
      this.isManager = this.user.manager;
    } else {
      this.loginUser = null;
      this.isManager = null;
    }
  },
};
</script>

<style scoped>
.jumbotron {
  height: 40vh;
  text-align: center;
  position: relative;
  z-index: 1;
}
.jumbotron::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/img/mypage-bg.jpg");
  background-position: center;
  background-size: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.65;
}
.jumbotron > div {
  width: 70%;
  display: inline-block;
}
</style>
