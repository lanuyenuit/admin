<template>
  <div>
    <h3 class="text-info">Notice</h3>
    <div>
      <div>
        <div class="d-flex d-flex justify-content-between mb-3">
          <div>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="showAddNewModal"
            >
              <i class="fa fa-plus-square"></i> Add new
            </button>
          </div>
          <div class="d-flex">
            <label class="m-auto px-2">Search:</label>
            <b-form-input
              class="text-primary"
              placeholder="Enter your name"
              v-model="keyword"
            ></b-form-input>
          </div>
        </div>
      </div>

      <div>
        <div class="overflow-auto">
          <b-table
            class="bg-white text-dark"
            id="my-table"
            :items="qnaList"
            :per-page="paginator && paginator.limit"
            :current-page="paginator && paginator.currentPage"
            bordered
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            :fields="fields"
            @row-selected="onRowSelected"
            responsive="sm"
            @row-clicked="myRowClickHandler"
          >
          </b-table>
        </div>
        <div class="d-flex justify-content-end">
          <div class="d-flex mr-2">
            <label class="m-auto px-2">Show:</label>

            <select
              class="form-control mb-0"
              v-model.number="paginator && paginator.limit"
            >
              <option
                v-for="s in [10, 20, 50, 100]"
                :key="`page-size-${s}`"
                v-text="s"
              />
            </select>
          </div>
          <b-pagination
            class="d-flex justify-content-end mb-0"
            v-model="page"
            :total-rows="paginator && paginator.totalDocs"
            :per-page="limit"
            aria-controls="my-table"
          ></b-pagination>
          <div class="h-100 p-2 mb-0">
            <span>
              View
              {{
                paginator && (paginator.currentPage - 1) * paginator.limit + 1
              }}
              to {{ paginator && paginator.currentPage * paginator.limit }} of
              {{ paginator && paginator.totalDocs }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <b-modal
      scrollable
      v-model="isShowModalAnswer"
      @hide="closeQnaModal"
      centered
      size="lg"
      :title="isAddNew ? 'New Q&A' : 'View Q&A'"
      class="modal hide fade"
      ok-only
      :ok-title="isAddNew ? 'Add new' : 'Update'"
      @ok="isAddNew ? addNewQna() : updateAnswer(selected)"
    >
      <div>
        <div class="row form-group">
          <div class="col-sm-2 m-auto">Catagory</div>
          <div class="col-sm-10">
            <div class="row">
              <div class="col-sm-3">
                <select class="form-control mb-0" v-model="selected.id">
                  <option v-for="option in catagories" :value="option.id">
                    {{ option.name }}
                  </option>
                </select>
              </div>
              <div class="col-sm-9 d-flex">
                <div class="m-auto">Q&A Type</div>
                <div>
                  <select class="form-control mb-0" v-model="selected.type_id">
                    <option v-for="type in optionsType" :value="type.id">
                      {{ type.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-sm-2">Title</div>
          <div class="col-sm-10">
            <b-form-input
              class="text-primary"
              v-model="selected && selected.title"
            ></b-form-input>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-sm-2">Answer</div>
          <div class="col-sm-10">
            <b-form-textarea
              id="textarea-default"
              v-model="row && selected.detail"
              rows="5"
            ></b-form-textarea>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
// const apiDomain = "http://192.168.1.127:9898/api/BE/v1.0";

export default {
  name: "notice",

  data() {
    return {
      limit: 10,
      page: 1,
      selected: {},
      row: {},
      modes: ["single"],
      selectMode: "single",
      keyword: null,
      fields: [
        { key: "title", label: "Notice title" },
        { key: "content", label: "Notice content " },
        { key: "create_at", label: "Insert date" },
      ],
    };
  },

  async mounted() {
    this.paginator = await this.getPaginator();
    this.catagories = await this.getCatagories();
    this.items = this.paginator.docs;
  },

  methods: {
    async getPaginator(obj) {
      if (!obj) obj = {};

      try {
        let res = await this.$http.get(
          "http://192.168.1.127:9898/api/BE/v1.0/qnas",
          {
            headers: Object.assign(
              { "x-requested-with": "XMLHttpRequest" },
              obj.title ? { title: obj.title } : {},
              obj.page ? { page: obj.page } : {},
              obj.limit ? { limit: obj.limit } : {}
            ),
          }
        );
        if (res.status && res.status === 200) {
          return res.data.paginator;
        } else {
          alert("Error: getQnaList");
        }
      } catch (error) {
        alert(error);
      }
    },

    async onRowSelected(obj) {
      this.isAddNew = false;
      if (obj[0] && obj[0].id) {
        try {
          let res = await this.$http.get(
            `http://192.168.1.127:9898/api/BE/v1.0/qna`,
            {
              headers: Object.assign(
                { "x-requested-with": "XMLHttpRequest" },
                obj.title ? { title: obj.title } : {},
                obj.detail ? { detail: obj.detail } : {},
                obj.typeId ? { type_id: obj.typeId } : {},
                obj[0] && obj[0].id ? { id: obj[0].id } : {}
              ),
            }
          );
          if (res.status && res.status === 200) {
            this.selected = res.data.questionAnswer;

            this.isShowModalAnswer = true;
          }
        } catch (error) {
          alert(error);
        }
      } else return;
    },

    closeQnaModal() {
      this.$refs.selectableTable.clearSelected();
    },

    showAddNewModal() {
      this.isShowModalAnswer = true;
      this.isAddNew = true;
      this.selected = {};
    },
  },
};
</script>

<style lang="scss" scoped></style>
