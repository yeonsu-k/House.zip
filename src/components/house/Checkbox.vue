<template>
  <div>
    <b-row class="input-group mb-3">
      <b-col cols="3" style="display: ">
        <input type="checkbox" id="box1" v-model="status" value="아파트" />
        <label for="box1"></label>
      </b-col>
      <b-col cols="3">
        <input type="checkbox" id="box2" v-model="status" value="연립다세대" />
        <label for="box2"> </label>
      </b-col>
      <b-col cols="3">
        <input type="checkbox" id="box3" v-model="status" value="오피스텔" />
        <label for="box3"></label>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "CheckxView",
  data() {
    return {
      status: ["아파트", "연립다세대", "오피스텔"],
    };
  },
  watch: {
    status() {
      console.log(this.status);
      let check = [false, false, false];
      this.status.forEach((element) => {
        if (element == "아파트") {
          check[0] = true;
        } else if (element == "연립다세대") {
          check[1] = true;
        } else {
          check[2] = true;
        }
      });
      this.$emit("chang-aptmark", check);
    },
  },
};
</script>

<style scoped>
/* input[type="checkbox"] {
  display: none;
}
span.check {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url("http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt") no-repeat;
  background-size: 100%;
}
span.check.on {
  background: url("http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu") no-repeat;
  background-size: 100%;
} */

/* 기본 체크박스 감추기 */
input[type="checkbox"] {
  display: none;
}
/* 체크박스 이미지 설정 */
#box1 + label {
  display: inline-block;
  width: 60px;
  height: 65px;
  cursor: pointer;
  background: url("@/assets/img/checkBn.png") left/60px no-repeat;
}
/* 체크 됐을 때 */
#box1:checked + label {
  background: url("@/assets/img/checkB.png") left/60px no-repeat;
}
/* 체크박스 이미지 설정 */
#box2 + label {
  display: inline-block;
  width: 60px;
  height: 65px;
  cursor: pointer;
  background: url("@/assets/img/checkYn.png") left/60px no-repeat;
}
/* 체크 됐을 때 */
#box2:checked + label {
  background: url("@/assets/img/checkY.png") left/60px no-repeat;
}
/* 체크박스 이미지 설정 */
#box3 + label {
  display: inline-block;
  width: 60px;
  height: 65px;
  cursor: pointer;
  background: url("@/assets/img/checkPn.png") left/60px no-repeat;
}
/* 체크 됐을 때 */
#box3:checked + label {
  background: url("@/assets/img/checkP.png") left/60px no-repeat;
}
</style>
