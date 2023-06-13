<template>
    <div class="buildings">
      <div class="building-tools">
        <el-button type="warning" @click="toAdd">添加</el-button>
      </div>
      <el-table :data="buildings" style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="50"/>
        <el-table-column prop="chager" label="楼管"/>
        <el-table-column prop="id" label="宿舍楼编号"/>
        <el-table-column prop="name" label="宿舍楼名称"/>
        <el-table-column prop="schoolId" label="SchoolId"/>
  
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
            <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
     <!-- <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total" @current-change="currentchange" style="position: absolute; left: 800px; top: 630px;"/>  -->
    </div>
    <el-dialog v-model="dialogFormVisible" title="楼栋编辑">
      <el-form :model="building">


        <el-form-item label="SchoolId" :label-width="formLabelWidth">
          <el-input v-model="building.schoolId" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="楼管" :label-width="formLabelWidth">
          <el-input v-model="building.chager" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="宿舍楼编号" :label-width="formLabelWidth">
          <el-input v-model="building.id" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="宿舍楼名称" :label-width="formLabelWidth">
          <el-input v-model="building.name" autocomplete="off"/>
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
  import { buildingpage, editbuilding, deletebuilding, addbuilding } from "../../http/building";
  import { ElMessage } from "element-plus";
  import { cloneDeep } from "lodash-es";
  export default defineComponent({
    data() {
      return {
        buildings: [],
        building: {
            "colums": [],
            "current": 0,
             "size": 0
        },
        dialogFormVisible: false,
        building: {
            "chager": 0,
             "id": 0,
            "name": "",
            "schoolId": 0
        },
        formLabelWidth: 80,
      };
    },
    mounted() {
      this.getbuildingsPage(1);
    },
    methods: {
      toEdit(building) {
        console.log(building);
        this.dialogFormVisible = true;
        this.building = cloneDeep(building);
      },
      getbuildingsPage(current) {
        const data = {
          current: current,
          size: 10,
        };
        buildingpage(data).then(res => {
            console.log(res);
            const page = res.data.page;
            this.buildings = page.records;
            this.page = page;
          }).catch((err) => {
            console.log(err);
          })
      },
      currentchange(current) {
        
        this.getbuildingsPage(current);
        this.page.current = current; //
      },
      del(id) {

        console.log(id);
        const params = {
          id: id,
        };
        deletebuilding(params).then(res => {
            if (res.success) {
              this.getbuildingsPage(this.page.current);
             
              if (this.page.total % this.page.size == 1)
                this.getAdCatesPage(this.page.current - 1);
              else {
                this.getAdCatesPage(this.page.current);
              }
            } else {
              console.log(res.msg);
              return false;
            }
          })
          .catch((err) => {

          });
      },
      toAdd() {
        //到添加的页面
        this.dialogFormVisible = true;
        //清空表单
        this.building = {
            "chager": 0,
             "id": 0,
            "name": "",
            "schoolId": 0
        };
      },
      save() {
        const building = this.building;
        if (building.id == 0) {
            addbuilding(building).then(res => {
              if (res.success) {
                //刷新页面
                this.dialogFormVisible = false;
                this.getbuildingsPage(this.page.current);
                ElMessage(res.msg);
              } else {
                ElMessage(res.msg);
                return false;
              }
            }).catch((err) => {
              ElMessage("网络错误联系管理员");
            });
        } else {
            editbuilding(building)
            .then(res => {
              if (res.success) {
                //刷新页面
                this.dialogFormVisible = false;
                this.getbuildingsPage(this.page.current);
                ElMessage(res.msg);
              } else {
                ElMessage(res.msg);
                return false;
              }
            })
            .catch((err) => {
              ElMessage("网络错误联系管理员");
            });
        }
      },
    },
  });
  </script>
  
  <style lang="scss" scoped></style>
  