<template>

<h2 style="text-align: center;">权限管理{{this.adCates.id}}</h2>

    <div class="adCates">
        <div class="adcate-tools">
            <el-form-item >
            <el-button  type="primary" @click="toAdd" plain style="margin-left: 60px;" ><el-icon><DocumentAdd /></el-icon>添加数据</el-button> 
              <el-input placeholder="输入id" style="width: 120px; margin-left: 80px;"  v-model="id"/>
              <el-button :icon="Search" circle style="margin-left: 10px;" @click="toSearch(this.id)"><el-icon><Search /></el-icon></el-button>
           </el-form-item>

        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="80" />
            <el-table-column prop="code" label="code(权限码)" width="120"/>
            <el-table-column prop="description" label="description" width="120" />
            <el-table-column prop="url" label="url(访问地址)" width="230" />
            <el-table-column prop="type" label="type" width="120" />
            <el-table-column prop="pid" label="pid" width="50" />
            <el-table-column prop="hasChildren" label="子权限" width="80" />
            <el-table-column prop="createTime" label="创建时间" width="250" >
         
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
                <template #default="scope">
                    <el-button  type="danger" @click="toEdit(scope.row)" plain><el-icon><EditPen /></el-icon>修改</el-button> 
                    <el-button  type="primary" @click="del(scope.row.id)" plain><el-icon><Delete /></el-icon>删除</el-button> 
                    
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>

    <!--这个是修改的-->
    <el-dialog v-model="dialogFormVisible" title="权限编辑">
        <el-form :model="adCate">
          
          <el-form-item label="code" :label-width="formLabelWidth">
              <el-input v-model="adCate.code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="description" :label-width="formLabelWidth">
              <el-input v-model="adCate.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="pid" :label-width="formLabelWidth">
              <el-input v-model="adCate.pid" autocomplete="off" />
          </el-form-item>
          <el-form-item label="type" :label-width="formLabelWidth">
              <el-input v-model="adCate.type" autocomplete="off" />
          </el-form-item>
          <el-form-item label="hasChildren" :label-width="formLabelWidth">
              <el-switch  active-value="1" inactive-value="0" v-model="adCate.hasChildren"></el-switch>
          </el-form-item>
          <el-form-item label="updateTime" :label-width="formLabelWidth">
              <el-input v-model="adCate.updateTime" autocomplete="off" />
          </el-form-item>
          <el-form-item label="url" :label-width="formLabelWidth">
              <el-input v-model="adCate.url" autocomplete="off" />
          </el-form-item>
      </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>

<!--这个是添加的-->
    <el-dialog v-model="dialogForm" title="权限添加">
        <el-form :model="adCate">
          
            <el-form-item label="code" :label-width="formLabelWidth">
                <el-input v-model="addpermission.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="description" :label-width="formLabelWidth">
                <el-input v-model="addpermission.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="pid" :label-width="formLabelWidth">
                <el-input v-model="addpermission.pid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="type" :label-width="formLabelWidth">
                <el-input v-model="addpermission.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="hasChildren" :label-width="formLabelWidth">
                <el-switch  active-value="1" inactive-value="0" v-model="addpermission.hasChildren"></el-switch>
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="addpermission.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="addpermission.updateTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="url" :label-width="formLabelWidth">
                <el-input v-model="addpermission.url" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogForm = false">Cancel</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>

import { defineComponent } from "vue"
import { perPage, perDelId, perAdd, perEdit ,Search} from "../../http/permission";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'


export default defineComponent({
    data() {
        return {
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            id:null,
            result: '',
            dialogFormVisible: false,
            dialogForm:false,
            adCate: {
                "code": "",
                  "createTime": "",
                  "deleted": 0,
                  "description": "",
                  "hasChildren": 0,
                  "id": 0,
                  "pid": 0,
                  "type": "",
                  "updateTime": "",
                  "url": ""
            },

            addpermission:{
                
                  "code": "",
                  "createTime": "",
                  "deleted": 0,
                  "description": "",
                  "hasChildren": 0,
                  "id": 0,
                  "pid": 0,
                  "type": "",
                  "updateTime": "",
                  "url": ""

            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getperPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible=true;
            this.adCate=cloneDeep(adcate);    
        },
        //获取页面数据
        getperPage(current) {
            const data = {
                current: current,
                size: 5
            }
            perPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.adCates = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getperPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
        
            console.log(id)
            const params = {
                id: id
            }
            perDelId(params).then(res => {
                if (res.success) {
                    this.getperPage(this.page.current)

                }
                else {
                    console.log(res.msg)
                    return false
                }


            }).catch(err => {

            })
        },
        toAdd() {
            //到添加的页面
            this.dialogForm = true;
        },
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                perAdd(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getperPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else{
                perEdit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getperPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }

        },
        //通过id进行搜索
        toSearch(id){
            const params = {
                id: id
            }
            Search(params).then(res => {
                console.log(res.data.permission);
                this.adCates=[],
                this.adCates.push(res.data.permission)
             // this.adCates=res.data.permission

             // console.log(this.adCates);

              //  this.getAdCatesPage(this.page.current)
            }).catch(err => {
                console.log(err);
            })
            this.id=null
          //  console.log(this.adCates)
        
        }

    }

});
</script>

<style lang="scss" scoped></style>
