<template>
  <div>
    <h3 class="text-info">FAQ Management</h3>

    <div>
      <div>
        <div class="d-flex d-flex justify-content-between mb-3">
          <div class="d-flex">
            <label class="m-auto px-2">Show:</label>
            <select class="form-control" v-model="perPage">
              <option
                v-for="s in [10, 20, 50, 100]"
                :key="`page-size-${s}`"
                v-text="s"
              />
            </select>
          </div>
          <div class="d-flex">
            <label class="m-auto px-2">Search:</label>
            <b-form-input
              class="text-primary"
              placeholder="Enter your name"
            ></b-form-input>
          </div>
        </div>
      </div>
      <div>
        <div class="overflow-auto">
          <b-table
            class="bg-white text-dark"
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
            bordered
            dark
          ></b-table>
        </div>
        <b-pagination
          class="d-flex justify-content-end"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "faq_management",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [
        {
          catagory: "Account 1",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account 2",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account 3 ",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account 4",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account 5",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account 6",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
        {
          catagory: "Account",
          title: "Title",
          content: "Content",
          insert_date: "2020-09-25",
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>

<style lang="scss" scoped></style>
