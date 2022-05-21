<template>
  <ul class="pagination justify-content-center">
    <li class="page-item" v-if="prev">
      <button class="page-link" aria-label="Previous" @click="movePage(startPageIndex - 1, (startPageIndex - 1) * listRowCount)">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>

    <li v-for="index in endPageIndex - startPageIndex + 1" :key="index" class="page-item" :class="{ active: startPageIndex + index - 1 == currentPageIndex }">
      <button class="page-link" @click="movePage(startPageIndex + index - 1, (startPageIndex + index - 1) * listRowCount)">{{ startPageIndex + index - 1 }}</button>
      <!-- <a class="page-link" href="javascript:movePage(' + i + ')">' + i + '</a> -->
    </li>

    <li class="page-item" v-if="next">
      <button class="page-link" aria-label="Next" @click="movePage(endPageIndex + 1, (endPageIndex + 1) * listRowCount)">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  name: "PageLink",
  data() {
    return {
      totalListItemCount: 0,
      listRowCount: 10,
      pageLinkCount: 10,
      currentPageIndex: 1,

      pageCount: 0,
      startPageIndex: 0,
      endPageIndex: 0,
      prev: false,
      next: false,
    };
  },
  props: {
    status: Boolean,
  },
  methods: {
    updatePage(no) {
      this.$emit("update-page", no);
    },
    movePage(param, no) {
      this.currentPageIndex = param;
      this.initComponent();
      this.updatePage(no);
    },

    initComponent() {
      if (this.status) {
        axios
          .get("http://localhost:8080/happyhouse/qna/ans/total")
          .then(({ data }) => {
            this.totalListItemCount = data;
            this.initUI();
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      } else {
        axios
          .get("http://localhost:8080/happyhouse/qna/total")
          .then(({ data }) => {
            this.totalListItemCount = data;
            this.initUI();
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      }
    },
    initUI() {
      this.pageCount = Math.ceil(this.totalListItemCount / this.listRowCount);

      if (this.currentPageIndex % this.pageLinkCount == 0) {
        this.startPageIndex = (this.currentPageIndex / this.pageLinkCount - 1) * this.pageLinkCount + 1;
      } else {
        this.startPageIndex = Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + 1;
      }

      if (this.currentPageIndex % this.pageLinkCount == 0) {
        //10, 20...맨마지막
        this.endPageIndex = (this.currentPageIndex / this.pageLinkCount - 1) * this.pageLinkCount + this.pageLinkCount;
      } else {
        this.endPageIndex = Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + this.pageLinkCount;
      }

      if (this.endPageIndex > this.pageCount) {
        this.endPageIndex = this.pageCount;
      }

      if (this.currentPageIndex <= this.pageLinkCount) {
        this.prev = false;
      } else {
        this.prev = true;
      }

      if (this.endPageIndex >= this.pageCount) {
        this.endPageIndex = this.pageCount;
        this.next = false;
      } else {
        this.next = true;
      }
    },
  },
  watch: {
    status() {
      this.pageLinkCount = 10;
      this.currentPageIndex = 1;

      this.pageCount = 0;
      this.startPageIndex = 0;
      this.endPageIndex = 0;
      this.prev = false;
      this.next = false;

      this.initComponent();
      // this.updatePage(this.listRowCount);
    },
    currentPageIndex: function () {
      this.initUI();
    },
  },
  created() {
    this.initComponent();
  },
  mounted() {
    this.updatePage(this.listRowCount);
  },
};
</script>
