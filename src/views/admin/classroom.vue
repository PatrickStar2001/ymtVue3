<template>
    <!-- el-table显示数据,分页 -->
    <div class="classrooms">
      <div class="classroom-tools">
        <el-button type="warning" @click="toAdd">添加</el-button>
        <el-input v-model="searchId" placeholder="请输入教室ID" clearable style="width: 120px;"></el-input>
        <el-button type="primary" @click="searchClassroom">搜索</el-button>
      </div>
      <el-table :data="classrooms" style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="150" />
        <el-table-column prop="name" label="教室名称" width="120" />
        <el-table-column prop="building" label="所在建筑" width="120" />
        <el-table-column prop="school" label="所属学校" width="120" />
        <el-table-column fixed="right" label="功能管理" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
            <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total || 0" @current-change="currentchange" /> -->
    </div>
    <el-dialog v-model="dialogFormVisible" title="教室编辑">
      <el-form :model="classroom">
        <el-form-item label="教室名称" :label-width="formLabelWidth">
          <el-input v-model="classroom.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所在建筑" :label-width="formLabelWidth">
          <el-select v-model="classroom.building" placeholder="请选择所在建筑">
            <el-option v-for="building in buildings" :key="building.id" :label="`${building.id}（${building.name}）`"
              :value="building.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属学校" :label-width="formLabelWidth">
          <el-select v-model="classroom.school" placeholder="请选择所属学校">
            <el-option v-for="school in schools" :key="school.id" :label="`${school.id}（${school.schoolName}）`"
              :value="school.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addOrUpdateClassroom">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { ElMessage } from 'element-plus';
  import { addClassroom, getAllClassrooms, deleteClassroom, editClassroom, getOneClassroom, getAllBuilding, getAllSchool } from '../../http/classroom';
  import { cloneDeep } from 'lodash-es';
  
  export default defineComponent({
    data() {
      return {
        classrooms: [],
        page: {
          total: 0,
          current: 1,
          size: 5
        },
        dialogFormVisible: false,
        classroom: {
          building: '',
          id: null,
          name: '',
          school: ''
        },
        formLabelWidth: 80,
        searchId: '', // 添加搜索框的绑定值
        buildings: [], // 存储所有建筑的数据
        schools: [] // 存储所有学校的数据
      };
    },
    mounted() {
      this.getClassroomsPage(1);
      this.getAllBuildingData();
      this.getAllSchoolData();
    },
    methods: {
      toEdit(classroom) {
        console.log(classroom);
        this.dialogFormVisible = true;
        this.classroom = cloneDeep(classroom);
      },
      getClassroomsPage(current) {
        const data = {
          current: current,
          size: this.page.size
        };
  
        getAllClassrooms(data)
          .then(res => {
            console.log(res);
            if (res.success) {
              this.classrooms = res.data.classrooms; // 修改为 res.data.classrooms
              this.page = {
                total: res.data.classrooms.length, // 修改为 res.data.classrooms.length
                current: res.data.current,
                size: res.data.size
              };
            } else {
              console.log(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      del(id) {
        console.log(id);
        const params = {
          id: id
        };
        deleteClassroom(params)
          .then(res => {
            if (res.success) {
              this.getClassroomsPage(this.page.current);
            } else {
              console.log(res.msg);
              return false;
            }
          })
          .catch(err => {
  
          });
      },
      addOrUpdateClassroom() {
        const classroom = this.classroom;
        if (classroom.id) {
          // 调用编辑接口，将 classroom 对象作为参数发送请求
          editClassroom(classroom)
            .then(res => {
              if (res.success) {
                this.dialogFormVisible = false;
                this.getClassroomsPage(this.page.current);
                ElMessage.success(res.msg);
              } else {
                ElMessage.error(res.msg);
              }
            })
            .catch(err => {
              ElMessage.error('网络错误，请联系管理员');
            });
        } else {
          // 调用添加接口，将 classroom 对象作为参数发送请求
          addClassroom(classroom)
            .then(res => {
              if (res.success) {
                this.dialogFormVisible = false;
                this.getClassroomsPage(this.page.current);
                ElMessage.success(res.msg);
              } else {
                ElMessage.error(res.msg);
              }
            })
            .catch(err => {
              ElMessage.error('网络错误，请联系管理员');
            });
        }
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.classroom = {
          building: '',
          id: null,
          name: '',
          school: ''
        };
      },
      searchClassroom() {
        // 根据搜索框的值进行搜索
        const id = parseInt(this.searchId);
        if (isNaN(id)) {
          ElMessage.warning('请输入有效的教室ID');
          return;
        }
  
        console.log('Searching classroom with ID:', id);
  
        getOneClassroom(id)
          .then(res => {
            console.log('Search result:', res);
            if (res.success) {
              // 处理搜索结果
              const classroom = res.data.classinfo;
              this.classrooms = [classroom]; // 将结果放入数组中
              this.page = {
                total: 1,
                current: 1,
                size: this.page.size
              };
            } else {
              ElMessage.error(res.msg);
            }
          })
          .catch(err => {
            ElMessage.error('网络错误，请联系管理员');
          });
      },
      getAllBuildingData() {
        getAllBuilding()
          .then(res => {
            console.log(res);
            if (res.success) {
              this.buildings = res.data.buildings; // 将建筑数据存储到buildings数组中
            } else {
              console.log(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      getAllSchoolData() {
        getAllSchool()
          .then(res => {
            console.log(res);
            if (res.success) {
              this.schools = res.data.schools; // 将学校数据存储到schools数组中
            } else {
              console.log(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  });
  </script>