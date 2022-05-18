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
    <router-view @create-user="createUser" @update-user="updateUser" @delete-user="deleteUser" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserView",
  // data() {
  //   return {
  //     users: [],
  //   };
  // },
  methods: {
    // getUserList() {
    //   let userList = JSON.parse(localStorage.getItem("userList"));
    //   if (userList) {
    //     this.users = userList;
    //   }
    // },
    createUser(user) {
      axios
        .post("http://localhost:8080/happyhouse/user/", {
          id: user.id,
          password: user.password,
          name: user.name,
          email: user.email,
          tel: user.tel,
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
      let userList = JSON.parse(localStorage.getItem("userList"));

      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === user.id) {
          this.$set(userList, i, user);
          userList[i] = user;
          alert("수정 완료");
          break;
        }
      }
      // localStorage.setItem("userList", JSON.stringify(userList));
      // this.getUserList();
      this.$router.push("/user");
    },
    deleteUser(user) {
      let userList = JSON.parse(localStorage.getItem("userList"));

      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === user.id) {
          userList.splice(i, 1);
          alert("삭제 완료");
          break;
        }
      }

      // localStorage.setItem("userList", JSON.stringify(userList));
      // this.getUserList();
      this.$router.push("/user");
    },
  },
  // created() {
  //   this.getUserList();
  // },
};
</script>

<style scoped>
/* .user-link {
  color: black;
}

.view {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}

label {
  display: inline-block;
  width: 130px;
}

.btn {
  width: 8%;
  background-color: #d0d3d0;
  color: rgb(80, 82, 79);
  padding: 14px 20px;
  margin: 8px;
  border: 1px solid #787878;
  border-radius: 4px;
  font-size: large;
  cursor: pointer;
}

/* 테이블 CSS 
.user-list {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: auto;
}

.user-list td,
.user-list th {
  border: 1px solid black;
} */
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
  background: url("@/assets/mypage-bg.jpg");
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
