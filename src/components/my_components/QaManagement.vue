<template>
  <div>
    <h3 class="text-info">QA Management</h3>
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
            :items="paginator.docs"
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
            <template v-slot:cell(catagory)="data">
              <span>
                {{ data }}
              </span>
            </template>
            <!-- <template v-slot:cell(id)="data">
              <span v-html="`${mapCatagories(data.item).name}`"> </span>
            </template> -->
            <template v-slot:cell(type_id)="data">
              <span v-html="`${mapQnaType(data.item).name}`"> </span>
            </template>

            <!-- <template v-slot:cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template> -->
            <template v-slot:cell(actions)="data">
              <button class="btn btn-primary" type="submit">Button</button>
            </template>
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
const apiDomain = "http://192.168.1.127:9898/api/BE/v1.0";

export default {
  name: "qa_management",

  data() {
    return {
      limit: 10,
      page: 1,
      selected: {},
      row: {},
      modes: ["single"],
      selectMode: "single",
      isShowModalAnswer: false,
      paginator: null,
      catagories: null,
      isAddNew: false,
      keyword: null,
      fields: [
        { key: "catagory", label: "Catagory" },
        { key: "type_id", label: "Q&A Type " },
        { key: "title" },
        { key: "detail" },
        { key: "created_at" },
        { key: "status" },
      ],
    };
  },

  async mounted() {
    this.paginator = await this.getPaginator();
    this.catagories = await this.getCatagories();
    this.items = this.paginator.docs;
  },
  computed: {
    qnaList() {
      return this.paginator && this.paginator.docs;
    },

    optionsType() {
      let obj =
        this.catagories &&
        this.catagories.find((_) => _.id === this.selected.id);
      if (obj) return obj.types;
      return;
    },

    selectedQnaType() {
      return this.selected && this.mapQnaType(this.selected);
    },
  },

  watch: {
    keyword(val) {
      if (val) {
        let obj = {};
        obj.title = val;
        this.getPaginator(obj);
      }
    },
  },

  methods: {
    async getPaginator(obj) {
      if (!obj) obj = {};

      try {
        let res = await this.$http.get(`${apiDomain}/qnas`, {
          headers: Object.assign(
            { "x-requested-with": "XMLHttpRequest" },
            obj.title ? { title: obj.title } : {},
            obj.page ? { page: obj.page } : {},
            obj.limit ? { limit: obj.limit } : {}
          ),
        });
        if (res.status && res.status === 200) {
          return res.data.paginator;
        } else {
          alert("Error: getQnaList");
        }
      } catch (error) {
        alert(error);
      }
    },

    async getCatagories() {
      try {
        let res = await this.$http.get(` ${apiDomain}/categories`, {
          headers: Object.assign(
            { "x-requested-with": "XMLHttpRequest" }
            // obj.title ? { title: obj.title } : {},
            // obj.page ? { page: obj.page } : {},
            // obj.limit ? { limit: obj.limit } : {}
          ),
        });
        if (res.status && res.status === 200) {
          return res.data.qaCategory;
        } else {
          alert("Error: getCatagories");
        }
      } catch (error) {
        alert(`getCatagories ${error}`);
      }
    },

    mapCatagories(item) {
      let obj =
        this.catagories && this.catagories.find((_) => _.id === item.id);
      if (obj) return { id: obj.id, name: obj.name };
      return { id: null, name: "" };
    },

    mapListType(item) {
      let obj =
        this.catagories && this.catagories.find((_) => _.id === item.id);
      if (obj) return obj.types;
      return;
    },

    mapQnaType(item) {
      let obj =
        this.catagories && this.catagories.find((_) => _.id === item.id);
      if (obj) {
        let objType = obj.types && obj.types.find((_) => _.id === item.type_id);
        if (objType) return { typeId: objType.id, name: objType.name };
        return { typeId: null, name: "" };
      }
      return { typeId: null, name: "" };
    },

    async onRowSelected(obj) {
      this.isAddNew = false;
      if (obj[0] && obj[0].id) {
        try {
          let res = await this.$http.get(`${apiDomain}/qna`, {
            headers: Object.assign(
              { "x-requested-with": "XMLHttpRequest" },
              obj.title ? { title: obj.title } : {},
              obj.detail ? { detail: obj.detail } : {},
              obj.typeId ? { type_id: obj.typeId } : {},
              obj[0] && obj[0].id ? { id: obj[0].id } : {}
            ),
          });
          if (res.status && res.status === 200) {
            this.selected = res.data.questionAnswer;

            this.isShowModalAnswer = true;
          }
        } catch (error) {
          alert(error);
        }
      } else return;
    },
    myRowClickHandler(record, index) {},

    closeQnaModal() {
      this.$refs.selectableTable.clearSelected();
    },

    showAddNewModal() {
      this.isShowModalAnswer = true;
      this.isAddNew = true;
      this.selected = {};
    },

    async addNewQna() {
      try {
        const res = await this.$http({
          method: "POST",
          url: `${apiDomain}/qna`,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          data: Object.assign(
            {},
            this.selected.title ? { title: this.selected.title } : {},
            this.selected.detail ? { detail: this.selected.detail } : {},
            this.selected.type_id ? { type_id: this.selected.type_id } : {}
          ),
        });

        if (res.status && res.status === 200) {
          alert("Update successfull");
          this.paginator = await this.getPaginator();
        } else {
          alert("Error");
        }
      } catch (error) {
        alert(`addNewQna ${error}`);
      }
    },

    async updateAnswer(obj) {
      if (obj) {
        try {
          const res = await this.$http({
            method: "PUT",
            url: `${apiDomain}/qna`,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              id: obj.id,
            },
            data: Object.assign(
              {},
              obj.title ? { title: obj.title } : {},
              obj.detail ? { detail: obj.detail } : {},
              obj.type_id ? { type_id: obj.type_id } : {}
            ),
          });

          if (res.status && res.status === 200) {
            alert("Update successfull");
            this.paginator = await this.getPaginator();
          } else {
            alert("Error");
          }
        } catch (error) {
          alert(`updateAnswer ${error}`);
        }
      } else return;
    },
  },
};
</script>

<style lang="scss" scoped></style>
