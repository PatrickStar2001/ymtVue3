<template>
  <el-dialog v-model="dialogVisible" title="查询结果" width="30%">
    <el-form :model="dialogData">
      <el-form-item label="宿舍名称">
        <span>{{ dialogData.name }}</span>
      </el-form-item>
      <el-form-item label="宿舍长编号">
        <span>{{ dialogData.leader}}</span>
      </el-form-item>
      <el-form-item label="总床位数">
        <span>{{dialogData.maxNumber}}</span>
      </el-form-item>
      <el-form-item label="空位数">
        <span>{{dialogData.leftNumber}}</span>
      </el-form-item>
      <el-form-item label="入住人数">
        <span>{{dialogData.liveNumber}}</span>
      </el-form-item>
      <el-form-item label="宿舍状态">
        <span>{{dialogData.status}}</span>
      </el-form-item>
      <el-form-item label="宿舍备注">
        <span>{{dialogData.comment}}</span>
      </el-form-item>
      <el-form-item label="学校">
        <span>{{dialogData.school}}</span>
      </el-form-item>
      <el-form-item label="宿舍类型">
        <span>{{dialogData.type}}</span>
      </el-form-item>
      <el-form-item label="建筑">
        <span>{{dialogData.building}}</span>
      </el-form-item>
  </el-form>
  <div slot="footer" class="footer-container">
      <el-button @click="dialogVisible = false">关闭</el-button>
  </div>
  </el-dialog>

  <div class="root">
    <el-dialog v-model="dialogFormVisible" title="宿舍表单">
      <el-form :model="dormitory">
        <el-form-item label="宿舍名称" :label-width="formLabelWidth">
          <el-input v-model="dormitory.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍长编号" :label-width="formLabelWidth">
          <el-input v-model="dormitory.leader" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总床位数" :label-width="formLabelWidth">
          <el-input v-model="dormitory.maxNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="空位数" :label-width="formLabelWidth">
          <el-input v-model="dormitory.leftNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入住人数" :label-width="formLabelWidth">
          <el-input v-model="dormitory.liveNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍状态" :label-width="formLabelWidth">
          <el-input v-model="dormitory.status" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍备注" :label-width="formLabelWidth">
          <el-input v-model="dormitory.comment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校" :label-width="formLabelWidth">
          <el-input v-model="dormitory.school" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍类型" :label-width="formLabelWidth">
          <el-input v-model="dormitory.type" autocomplete="off" />
        </el-form-item>
        <el-form-item label="建筑" :label-width="formLabelWidth">
          <el-input v-model="dormitory.building" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false" class="cancel-button">取消</el-button>
          <el-button type="primary" @click="confirm()" class="confirm-button">确定</el-button>
        </div>
      </template>
    </el-dialog>
 <div class="box">
    <div class="query-form">
      <el-form :model="queryForm" inline>
      <el-form-item label="">
        <el-input v-model="queryForm.id" placeholder="请输入宿舍ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
      </el-form>
    </div>
    <div class="add">
      <el-button type="success" plain @click="toAdd" class="add-button">新增</el-button>
    </div>
    <el-button @click="toggleSortOrder">切换排序</el-button>
  </div>
    
  <div class="table">
     
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" label="宿舍名称" width="100" align="center" />
        <el-table-column prop="leader" label="宿舍长编号" width="100" align="center" />
        <el-table-column prop="maxNumber" label="总床位数" width="100" align="center" />
        <el-table-column prop="leftNumber" label="空位数" width="100" align="center" />
        <el-table-column prop="liveNumber" label="入住人数" width="100" align="center" />
        <el-table-column prop="status" label="宿舍状态" width="100" align="center" />
        <el-table-column prop="comment" label="宿舍备注" width="200" align="center" />
        <el-table-column prop="school" label="学校" width="150" align="center" />
        <el-table-column prop="type" label="宿舍类型" width="100" align="center" />
        <el-table-column prop="building" label="建筑" width="100" align="center" />
        <el-table-column fixed="right" label="权限" width="150" align="center">
          <template #default="scope">
            <el-button type="info" plain size="small" @click="handleEdit(scope.row.id)" class="edit-button">编辑</el-button>
            <el-button type="danger" plain size="small" @click="handleDelete(scope.row.id)" class="delete-button">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>
  
<script>
import dormitory from "@/http/dormitory";
import { defineComponent } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  components: {
    ElMessageBox,
    ElMessage,
  },
  data() {
    return {
      list: [],
      dormitory: {},
      dialogFormVisible: false,
      queryForm: {
      id: ''},
      dialogVisible: false,
      dialogData: {}, // 存储查询结果
      sortOrder: 'asc' 
    };
  },
  mounted() {
    this.fetchData();
    this.sortData();
  },
  methods: {
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortData(); // 调用排序方法
  },
  sortData() {
    // 根据排序方式对数据进行排序
    if (this.sortOrder === 'asc') {
      this.list.sort((a, b) => a.id - b.id); // 假设根据id字段排序
    } else {
      this.list.sort((a, b) => b.id - a.id);
    }
  },
    fetchData() {
      dormitory.entire().then((res) => {
        console.log(res);
        this.list = res.data.dormitories;
      });
    },
    handleQuery() {
  const queryData = { id: this.queryForm.id };
  dormitory.select(queryData)
    .then((res) => {
      // 处理查询结果，例如更新数据
      console.log(res);

      // 设置弹窗数据，并显示弹窗
      this.dialogData = res.data.dormitory;
      this.dialogVisible = true;
    })
    .catch((error) => {
      // 查询失败，弹出错误提示框
      ElMessageBox.alert("查询失败，请重试", "错误", {
        confirmButtonText: "确定",
        type: "error",
      });
      console.error(error); // 打印错误对象到控制台，以便调试
    });
},
    handleDelete(id) {
      const data = { id };
      ElMessageBox.confirm("您是否需要删除该宿舍?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          dormitory.remove(data).then((res) => {
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
            message: "删除取消",
          });
        });
    },
    handleEdit(id) {
      this.dialogFormVisible = true;
      const data = { id };
      dormitory.select(data).then((res) => {
        this.dormitory = res.data.dormitory;
      });
    },
    toAdd() {
      this.dormitory = {};
      this.dialogFormVisible = true;
    },
    confirm() {
      if (this.dormitory.id == undefined) {
        dormitory.add(this.dormitory).then((res) => {
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
        dormitory.update(this.dormitory).then((res) => {
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
.root {
  padding: 20px;
}

.table {
  margin-top: 20px;
}


.cancel-button {
  background-color: #e6a23c;
  color: #fff;
}

.confirm-button {
  background-color: #67c23a;
  color: #fff;
}

.edit-button {
  background-color: #409eff;
  color: #fff;
  margin-right: 10px;
}

.delete-button {
  background-color: #f56c6c;
  color: #fff;
}

.el-table {
  font-size: 14px;
}

.el-table-column {
  padding: 10px;
}

.el-table__header {
  background-color: #f5f7fa;
}

.el-table__row {
  &:nth-child(even) {
    background-color: #f9fafc;
  }
}

.el-input {
  width: 100%;
}

.query-form {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.query-form .el-form-item:not(:last-child) {
  margin-right: 10px;
  margin-left: 10px;
}

.el-input {
  width: 180px;
  margin-left: 10px;
}

.add-button {
  background-color: #67c23a;
  color: #fff;
  margin-left: 10px;
  margin-right: 50px;
}
.footer-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}

.box{
  display: flex;
}

.query-form.add-button {
  flex: 1;
}
</style>