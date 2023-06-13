<template>
  <div>
    <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
      style="margin-bottom: 20px;">
      <template #append>
        <el-button circle type="danger" @click="Getone(this.searchText)">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </template>
    </el-input>
  </div>
  <div>
    <el-table :data="paginatedData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }" border>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="pid" label="父级ID"></el-table-column>
      <el-table-column prop="apiName" label="API名称"></el-table-column>
      <el-table-column prop="apiUrl" label="API地址"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="apiMethod" label="请求方法"></el-table-column>
      <el-table-column prop="hasChildren" label="是否有子级"></el-table-column>

      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button v-if="row.isNew" class="custom-button" type="success" circle @click="Insert(row)">
            <el-icon>
              <Position />
            </el-icon>
          </el-button>

          <el-button v-else class="custom-button" type="warning" circle @click="Alter(row)">
            <el-icon>
              <Position />
            </el-icon>
          </el-button>

          <el-button type="primary" circle @click="openEditDialog(row)">
            <el-icon>
              <EditPen />
            </el-icon>

          </el-button>

          <el-button type="danger" v-if="row.isNew" circle @click="deleteData(row)"><el-icon>
              <Delete />
            </el-icon>
          </el-button>
          <el-button type="danger" v-else circle @click="deleteAPI(row)"><el-icon>
              <Delete />
            </el-icon>
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-size="pageSize" :total="filteredApiList.length"
      @current-change="handlePageChange">
    </el-pagination>
    <el-button type="primary" circle @click="addAPI" style="margin-top: 10px;">
      <el-icon>
        <CirclePlusFilled />
      </el-icon>
    </el-button>

    <el-button type="primary" circle @click="GetAll" style="margin-top: 10px;">
      <el-icon>
        <RefreshRight />
      </el-icon>

    </el-button>

    <el-dialog v-model="editDialogVisible" title="编辑内容" center width="50%">
      <el-form :model="editedAPI" label-width="100px">

        <el-form-item label="id">
          <el-input v-model="editedAPI.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="父级ID">
          <el-input v-model="editedAPI.pid"></el-input>
        </el-form-item>

        <el-form-item label="请求方法">
          <el-select v-model="editedAPI.apiMethod">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="API名称">
          <el-input v-model="editedAPI.apiName"></el-input>
        </el-form-item>

        <el-form-item label="API地址">
          <el-input v-model="editedAPI.apiUrl"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="editedAPI.description"></el-input>
        </el-form-item>

        <el-form-item label="是否有子级">
          <el-switch v-model="editedAPI.hasChildren" active-color="#409EFF" inactive-color="#C0CCDA"></el-switch>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="Cancel">取消</el-button>
          <el-button type="primary" @click="Save">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus';
import api from "@/http/backend_api.js"

export default {
  created() {
    this.GetAll();
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredApiList.slice(startIndex, endIndex);
    },
    filteredApiList() {
      if (this.searchText && this.apiList) {
        // 使用 Array.prototype.filter() 方法过滤数据
        return this.apiList.filter(item => {
          return item.id == this.searchText;
        });
      } else {
        // 如果搜索条件为空，返回原始数据源
        return this.apiList;
      }
    }
  },


  data() {
    return {
      editedAPI: {},//当前数据缓存
      editDialogVisible: false,//修改弹窗显示
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的数据条数
      searchText: '', // 搜索关键字
      apiList: [], // 原始数据列表
    };
  },
  methods: {
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 清空搜索关键字
    clearSearch() {
      this.searchText = '';
    },
    Cancel() {
      this.editDialogVisible = false;
      ElMessage.info('保存取消！');

    },
    Getone(id) {
      this.apiList = [],
        api.getOneData(id)
          .then(response => {
            console.log("搜索成功！");
            ElMessage.success('搜索成功！');
            const backendApis = response.data.backendApi;
            this.apiList.push(backendApis);
          })
          .catch(error => {
            ElMessage.error('搜索失败！');
            console.log("搜索失败！");
          });
    },
    Save() {
      // 保存编辑后的数据
      console.log('Saving API:', this.editedAPI);
      const index = this.apiList.findIndex(item => item.id === this.editedAPI.id);
      if (index !== -1) {
        // 替换原有的数据
        this.apiList.splice(index, 1, this.editedAPI);
      } else {
        // 添加编辑后的数据
        this.apiList.push(this.editedAPI);
      }
      this.editDialogVisible = false;
      ElMessage.success('保存成功！');

    },
    openEditDialog(row) {
      this.editedAPI = { ...row };
      this.editDialogVisible = true;
    },

    editAPI(api) {
      // 处理编辑逻辑，可以在这里打开编辑对话框或跳转到编辑页面
      console.log("编辑 API", api);
    },
    deleteAPI(row) {
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        api.delData(row.id)
          .then(response => {
            if (response.success) {
              // 处理删除成功的情况
              // 用户点击了确定按钮，执行删除操作
              const index = this.apiList.findIndex(api => api.id === row.id);
              if (index !== -1) {
                this.apiList.splice(index, 1); // 从数据源中删除API对象
              }
              console.log('删除成功');
              ElMessage.success('删除成功！');

            } else {
              // 处理删除失败的情况
              ElMessage.error(response.msg);

              console.error(response.msg);
            }
          })
          .catch(error => {
            // 处理请求异常
            console.error(error);
          });
        console.log("删除 API");

      }).catch((e) => {
        // 取消删除操作
        console.log("不删除 API", e);
      });
    },
    deleteData(row) {
      // 在这里处理删除逻辑，可以在确认后从数据源中删除API对象或向服务器发送删除请求
      // 这里使用 Element Plus 的 ElMessageBox 弹窗组件来确认删除操作
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 用户点击了确定按钮，执行删除操作
          const index = this.apiList.findIndex(api => api.id === row.id);
          if (index !== -1) {
            this.apiList.splice(index, 1); // 从数据源中删除API对象
          }
          ElMessage.success('删除成功！');

        })

        .catch(() => {
          ElMessage.error('删除失败！');

          // 用户点击了取消按钮，取消删除操作
          console.log('取消删除 API', row);
        });
    },

    // 可以添加其他方法来实现创建和查看功能
    addAPI() {
      ElMessage.success("添加数据ing");
      const newAPI = {
        apiMethod: "GET",
        apiName: "New API",
        apiSort: 0,
        apiUrl: "/new-api",
        description: "这是新的API",
        hasChildren: false,
        id: this.apiList.length + 1,
        pid: 0,
        isNew: true, // 新添加的数据标识
      };
      this.apiList.push(newAPI);
    },
    async GetAll() {
      try {
        this.clearSearch();
        const response = await api.getAllData();
        if (response.success) {
          // 获取返回的数据
          const backendApis = response.data.backendApis;

          // 在这里处理获取到的数据，可以进行赋值或其他操作
          this.apiList = backendApis;
          ElMessage.success('刷新成功！');

        } else {
          // 处理请求失败的情况
          ElMessage.error('请求失败！');

          console.error(response.msg);
        }
      } catch (error) {
        // 处理请求异常
        console.error(error);
      }
    },

    Insert(row) {
      api.addData(row)
        .then(response => {
          delete row.isNew;
          ElMessage.success('添加成功！');

          console.log("添加成功！");
        })
        .catch(error => {
          ElMessage.error('添加失败！');

          console.log("添加失败！");
          // 添加失败后的处理逻辑
        });
    },
    Alter(row) {
      api.editData(row)
        .then(response => {
          console.log("修改成功！");
          ElMessage.success('修改成功！');

        })
        .catch(error => {
          console.log("修改失败！");
          ElMessage.error('修改失败！');

          // 添加失败后的处理逻辑
        });
    },

  },


};
</script>
<style>
body {
  margin: 0;
  padding: 0;

  background-size: cover;
  opacity: 0.9 !important;
  /* 使用 !important 提高优先级 */
  background-repeat: no-repeat;
}
</style>