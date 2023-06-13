<template>

    <div class="images">
      <div class="image-tools">
        <el-button type="warning" @click="toAdd">添加</el-button>
        <el-input v-model="searchId" placeholder="通过id搜索" clearable style="width: 160px;"></el-input>
        <el-button type="primary" @click="searchimage">搜索</el-button>
      </div>
  
  
      <el-table :data="images" style="width: 100%">
        <el-table-column prop="id" label="编号" width="100" />
        <el-table-column prop="name" label="图片名称" width="200" />
        <el-table-column prop="imgUrl" label="图片路径" width="200" />
        <el-table-column  prop="height" label="图片高度" width="150" />
        <el-table-column prop="width" label="图片宽度" width="150" />
        <el-table-column prop="createTime" label="创建时间" width="150" />
        <el-table-column prop="updateTime" label="更新时间" width="150" />
          <el-table-column prop="updateTime" label="操作" width="250" >
          <template #default="scope">
            <el-button link type="primary" size="small" @click="toEdit(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </div>
    <el-dialog v-model="dialogFormVisible" title="图片信息编辑">
      <el-form :model="image">
        <el-form-item label="图片名称" :label-width="formLabelWidth">
          <el-input v-model="image.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片路径" :label-width="formLabelWidth">
          <el-input v-model="image.imgUrl" autocomplete="off" />
        </el-form-item>
  
        <el-form-item label="图片高度" :label-width="formLabelWidth">
          <el-input v-model="image.height" autocomplete="off" />
        </el-form-item>
  
        <el-form-item label="图片宽度" :label-width="formLabelWidth">
          <el-input v-model="image.width" autocomplete="off" />
        </el-form-item>
  
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="image.createTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-input v-model="image.updateTime" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="keep">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { ElMessage } from 'element-plus';
  import {  addimage,getAllimage,deleteimage,editimage,getOneimage,imagePage } from '../../http/image';
  import { cloneDeep } from 'lodash-es';
  
  export default defineComponent({
    data() {
      return {
        images: [],
        page: {
          total: 0,
          current: 1,
          size: 10
        },
        dialogFormVisible: false,
      
      image:{
        "createTime": "",
  "height": 0,
  "id": 0,
  "imgUrl": "",
  "name": "",
  "updateTime": "",
  "width": 0
    },
        formLabelWidth: 80,
        searchId: ''
      }
    },
    mounted() {
      this.getimagesPage(1);
  
    },
    methods: {
      toEdit(image) {
        console.log(image);
        this.dialogFormVisible = true;
        this.image = cloneDeep(image);
      },
      getimagesPage(current) {
        const data = {
          current: current,
          size: 2
        }
  
       imagePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.images = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
  
        },
        currentchange(current) {
            this.getimagesPage(current);
            this.page.current = current;
        },
      del(id) {
        if (confirm("是否删除") == true) 
        console.log(id);
        const params = {
          id: id
        };
        deleteimage(params)
          .then(res => {
            if (res.success) {
              this.getimagesPage(this.page.current);
            } else {
              console.log(res.msg);
              return false;
            }
          })
          .catch(err => {
            
          });
      },
      keep() {
        const image = this.image;
        if (image.id) {
          editimage(image).then(res => {
              if (res.success) {
                this.dialogFormVisible = false;
                this.getimagesPage(this.page.current);
                ElMessage.success(res.msg);
              } else {
                ElMessage.error(res.msg);
              }
            })
            .catch(err => {
              ElMessage.error('出错了');
            });
        } else {
          addimage(image)
            .then(res => {
              if (res.success) {
                this.dialogFormVisible = false;
                this.getimagesPage(this.page.current);
                ElMessage.success(res.msg);
              } else {
                ElMessage.error(res.msg);
              }
            })
            .catch(err => {
              ElMessage.error('出错了');
            });
        }
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.image = {
            createTime: '',
        height: 0,
        id: 0,
         imgUrl: '',
       name: '',
       updateTime: '',
       width: 0
        };
      },
      searchimage() {
        const id = parseInt(this.searchId);
        if (isNaN(id)) {
          ElMessage.warning('请输入有效的ID');
          return;
        }
  
        console.log('Searching image with ID:', id);
  
        getOneimage(id)
          .then(res => {
            console.log('Search result:', res);
            if (res.success) {
              const image = res.data.classinfo;
              this.images = [image]; 
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
            ElMessage.error('出错了');
          });
      },
  
    }
  });
  </script>