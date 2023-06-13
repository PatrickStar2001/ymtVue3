<template>
    <div class="adCates">
      <div class="adcate-tools">
        <el-button type="warning" @click="toAdd">添加</el-button>
      </div>
      <el-table :data="adCates" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="" />
        <el-table-column prop="pid" label="pid" />
        <el-table-column prop="type" label="type" width="" />
        <el-table-column prop="title" label="title" width="" />
        <!-- ...省略其他列... -->
        <el-table-column prop="name" label="name" width="" />
        <el-table-column prop="path" label="path" width="" />
        <el-table-column prop="icon" label="icon" width="" />
        <el-table-column prop="menu_type" label="menu_type" width="" />
        <el-table-column prop="url" label="url" width="" />
        <el-table-column prop="component" label="component" width="" />
        <el-table-column prop="keepalive" label="keepalive" width="" />
        <el-table-column prop="extend" label="extend" width="" />
        <el-table-column prop="remark" label="remark" width="" />
        <el-table-column prop="weight" label="weight" width="" />
        <el-table-column prop="status" label="status" width="" />
        <el-table-column prop="update_time" label="update_time" width="" />
        <el-table-column prop="create_time" label="create_time" width="" />


        <el-table-column fixed="right" label="right" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
            <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total" @current-change="currentChange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="导航栏信息编辑">
      <el-form :model="adCate">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="adCate.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="pid" :label-width="formLabelWidth">
          <el-input v-model="adCate.pid" autocomplete="off" />
        </el-form-item>
        <el-form-item label="type" :label-width="formLabelWidth">
          <el-input v-model="adCate.type" autocomplete="off" />
        </el-form-item>
        <el-form-item label="title" :label-width="formLabelWidth">
          <el-input v-model="adCate.title" autocomplete="off" />
        </el-form-item>
        <!-- ...省略其他表单项... -->
        <el-form-item label="name" :label-width="formLabelWidth">
            <el-input v-model="adCate.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="path" :label-width="formLabelWidth">
            <el-input v-model="adCate.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="icon" :label-width="formLabelWidth">
            <el-input v-model="adCate.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="menu_type" :label-width="formLabelWidth">
            <el-input v-model="adCate.menu_type" autocomplete="off" />
        </el-form-item>
        <el-form-item label="url" :label-width="formLabelWidth">
            <el-input v-model="adCate.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="component" :label-width="formLabelWidth">
            <el-input v-model="adCate.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="keepalive" :label-width="formLabelWidth">
            <el-input v-model="adCate.keepalive" autocomplete="off" />
        </el-form-item>
        <el-form-item label="extend" :label-width="formLabelWidth">
            <el-input v-model="adCate.extend" autocomplete="off" />
        </el-form-item>
        <el-form-item label="remark" :label-width="formLabelWidth">
            <el-input v-model="adCate.remark" autocomplete="off" />
        </el-form-item>
        <el-form-item label="weight" :label-width="formLabelWidth">
            <el-input v-model="adCate.weight" autocomplete="off" />
        </el-form-item>




        <el-form-item label="status" :label-width="formLabelWidth">
          <el-input v-model="adCate.status" autocomplete="off" />
        </el-form-item>
        <el-form-item label="update_time" :label-width="formLabelWidth">
          <el-input v-model="adCate.update_time" autocomplete="off" />
        </el-form-item>
        <el-form-item label="create_time" :label-width="formLabelWidth">
          <el-input v-model="adCate.create_time" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import { menuepage, menuedit, menudel, menuadd } from "../../http/menu";
  import { ElMessage } from "element-plus";
  import { cloneDeep } from "lodash-es";
  
  export default defineComponent({
    data() {
      return {
        adCates: [],
        page: {
          total: 0,
          current: 1,
          size: 10,
        },
        dialogFormVisible: false,
        adCate: {
          component: "",
          createTime: "",
          extend: "",
          icon: "",
          id: 0,
          keepalive: 0,
          menuType: "",
          name: "",
          path: "",
          pid: 0,
          remark: "",
          status: "",
          title: "",
          type: "",
          updateTime: "",
          url: "",
          weigh: 0,
        },
        formLabelWidth: 80,
      };
    },
    mounted() {
      this.getAdCatesPage(1);
    },
    methods: {
      getAdCatesPage(current) {
        const data = {
          columns: [],
          current: current,
          size: 2,
        };
        menuepage(data)
          .then((res) => {
            console.log(res);
            const page = res.data.page;
            this.adCates = page.records;
            this.page = page;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      save() {
        const adcate = this.adCate;
        if (adcate.id === 0) {
          menuadd(adcate)
            .then((res) => {
              if (res.success) {
                this.dialogFormVisible = false;
                this.getAdCatesPage(this.page.current);
                ElMessage(res.msg);
              } else {
                ElMessage(res.msg);
                return false;
              }
            })
            .catch(() => {
              ElMessage("网络错误联系管理员");
            });
        } else {
          menuedit(adcate)
            .then((res) => {
              if (res.success) {
                this.dialogFormVisible = false;
                this.getAdCatesPage(this.page.current);
                ElMessage(res.msg);
              } else {
                ElMessage(res.msg);
                return false;
              }
            })
            .catch(() => {
              ElMessage("网络错误联系管理员");
            });
        }
      },
      toEdit(adcate) {
        console.log(adcate);
        this.dialogFormVisible = true;
        this.adCate = cloneDeep(adcate);
      },
      currentChange(current) {
        this.getAdCatesPage(current);
        this.page.current = current;
      },
      del(id) {
        console.log(id);
        const params = {
          id: id,
        };
        menudel(params)
          .then((res) => {
            if (res.success) {
              this.getAdCatesPage(this.page.current);
            } else {
              console.log(res.msg);
              return false;
            }
          })
          .catch(() => {});
      },
      toAdd() {
        this.dialogFormVisible = true;
      },
    },
  });
  </script>
  
  <style lang="scss" scoped></style>
  