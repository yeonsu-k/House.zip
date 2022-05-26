<template>
  <div>
    <!-- <label for="chk">
      <input id="chk" type="checkbox" :value="checked" @input="$emit('input', !checked)" />
      <span class="check" :class="{ on: check }"></span>
      {{ label }}
    </label> -->
    <b-row class="input-group">
      <b-col cols="3" class="mr-3">
        <input type="checkbox" id="box1" />
        <label for="box1"></label>
      </b-col>
      <b-col cols="3" class="mr-3">
        <input type="checkbox" id="box2" />
        <label for="box2"> </label>
      </b-col>
      <b-col cols="3" class="mr-3">
        <input type="checkbox" id="box3" />
        <label for="box3"></label>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "CheckxView",
  props: {
    checked: {
      type: Boolean,
      default: true,
    },
    label: String,
  },
  model: {
    prop: "checked",
    event: "input",
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
