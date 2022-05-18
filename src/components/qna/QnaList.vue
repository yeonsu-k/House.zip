<template>
  <div>
    <section class="page-section bg-light" id="전체">
      <div class="container">
        <div class="list-control float-base" style="float: right">
          <c:if test="${!empty ism && ism}">
            <a class="btn btn-warning" style="width: 90%" href="${root}/qna/write">문의하기</a>
          </c:if>
        </div>
        <div class="text-center">
          <table class="mt-2 table table-bordered">
            <thead class="table-secondary">
              <tr>
                <th class="col-md-2">id</th>
                <th class="col-md-8">질문</th>
                <th class="col-md-2">날짜</th>
              </tr>
            </thead>
            <c:if test="${!empty notices}">
              <c:forEach var="notice" items="${notices}">
                <tr>
                  <td>${notice.userId}</td>
                  <td><a href="${root}/notice/detail?no=${notice.no}" style="text-decoration: none">${notice.title}</a></td>
                  <td>${notice.regtime.substring(0,10)}</td>
                </tr>
              </c:forEach>
            </c:if>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "last_name",
          sortable: true,
        },
        {
          key: "first_name",
          sortable: false,
        },
        {
          key: "age",
          label: "Person age",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: "danger",
        },
      ],
      items: [
        { isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>

<style scoped>
.jumbotron {
  background-image: url("@/assets/login-bg.jpg");
  background-position: center;
  background-size: fill;
  height: 40vh;
  text-align: center;
}
.jumbotron > div {
  width: 70%;
  height: 40vh;
  display: inline-block;
}
</style>
