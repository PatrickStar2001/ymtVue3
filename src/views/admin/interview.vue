<template>
    <div class="root">
      <el-button type="success" plain @click="toAdd">新增</el-button>
      <el-dialog v-model="dialogFormVisible" title="表单">
        <el-form :model="interview">
          <el-form-item label="面试题型" :label-width="formLabelWidth">
            <el-input v-model="interview.interviewType" autocomplete="off" />
          </el-form-item>
          <el-form-item label="面试题" :label-width="formLabelWidth">
            <el-input v-model="interview.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户id" :label-width="formLabelWidth">
            <el-input v-model="interview.userinfoId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="查看次数" :label-width="formLabelWidth">
            <el-input v-model="interview.view" autocomplete="off" />
          </el-form-item>
          <el-form-item label="面试题型解析">
      <el-input v-model="interview.analysis" type="textarea" :rows="5"  />
    </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm()"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
      <div class="table">
        <el-table :data="list" style="width: 100%">
          <el-table-column fixed prop="id" label="id" width="80" align="center"/>
          <el-table-column prop="title" label="面试题" width="150" align="center"/>
          <el-table-column prop="analysis" label="面试题型解析" width="700" align="center"/>
          <el-table-column prop="interviewType" label="面试题型" width="100" align="center"/>
          <el-table-column prop="createTime" label="创建时间" width="250" align="center"/>
          <el-table-column prop="updateTime" label="更新时间" width="250" align="center"/>
          <el-table-column prop="userinfoId" label="用户id" width="100" align="center"/>
          <el-table-column prop="view" label="查看次数" width="80" align="center" />
          <el-table-column fixed="right" label="权限" width="150" align="center">
            <template #default="scope">
              <el-button type="info" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" plain size="small"  @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>
  </template>
    
    <script>
  import interview from "@/http/interview";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        list: [],
        interview: {},
        dialogFormVisible: false,
        current:1,
        size:10,
        total:0
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        interview.entire().then((res) => {
          console.log(res)
          this.list = res.data.interviews;
        });
      },
      changeSize(size){
        this.size = size
        this.fetchData(1)
      },
      handleDelete(id) {
        const data = { id };
        ElMessageBox.confirm("您是否需要删除该面试题吗?", "提示", {
          confirmButtonText: "ok",
          cancelButtonText: "no",
          type: "warning",
        })
          .then(() => {
            interview.remove(data).then((res) => {
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
                this.fetchData();
              } else {
                ElMessage({
                  type: "error",
                  message: "网络出问题，联系管理员",
                });
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "warning",
              message: "取消删除",
            });
          });
      },
      handleEdit(id) {
        this.dialogFormVisible = true;
        const data = { id };
        interview.select(data).then((res) => {
          this.interview = res.data.interview;
        });
      },
      toAdd() {
        this.interview = {};
        this.dialogFormVisible = true;
      },
      confirm() {
        if (this.interview.id == undefined) {
          interview.add(this.interview).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "添加成功",
              });
              this.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
              });
            }
            this.dialogFormVisible = false;
          });
        } else {
          interview.update(this.interview).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "编辑成功",
              });
              this.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
              });
            }
          });
          this.dialogFormVisible = false;
        }
      },
    },
  });
  </script>
    
    <style lang="scss" scoped>
  
  </style>
    