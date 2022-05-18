<template>
  <div class="container">
    <span style="font-size: 35px">상세보기</span>
    <hr />
    <!-- <b-container class="bv-example-row mb-3">
      <b-row align-v class="border" cols="2">
        <b-col class="col"> {{ notice.content }} </b-col>
        <b-col class="col text-right"
          ><small> {{ notice.regtime }} </small></b-col
        >
      </b-row>
    </b-container> -->

    <b-table-simple class="mt-2 table-bordered text-center" style="min-height: 400px">
      <b-thead class="table-secondary">
        <b-tr>
          <b-th width="auto">제목</b-th>
          <b-th style="width: 50%">{{ notice.title }}</b-th>
          <b-th width="auto">날짜</b-th>
          <b-th>{{ notice.regtime }}</b-th>
          <b-th width="auto">작성자</b-th>
          <b-th>{{ notice.id }}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <!-- <b-td style="vertical-align: middle">내용</b-td> -->
          <b-td colspan="6" style="text-align: left">{{ notice.content }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <div class="text-center">
      <b-button variant="outline-success" class="btn" style="width: 48%" :to="{ name: 'NoticeModify', params: { no: notice.no } }">수정</b-button>
      <b-button variant="outline-success" class="btn" style="width: 48%" @click="deleteNotice">삭제</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoticeDetail",
  data() {
    return {
      notice: {
        no: "",
        title: "",
        content: "",
        regtime: "",
        id: "",
      },
    };
  },
  methods: {
    deleteNotice() {
      this.$emit("delete-notice", this.notice);
    },
  },
  created() {
    const no = this.$route.params.no;
    let noticeList = JSON.parse(localStorage.getItem("noticeList"));

    for (let i = 0; i < noticeList.length; i++) {
      if (noticeList[i].no === no) {
        this.notice = noticeList[i];
      }
    }
  },
};
</script>
