<template>
    <div>
        <el-button  type="primary" round  @click="add">添加</el-button>
        <el-table :data="Roles" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="150"/>
            <el-table-column prop="deleted" label="deleted" width="120" />
            <el-table-column prop="description" label="description" width="120" />
            <el-table-column prop="createTime" label="createTime" width="120" />
            <el-table-column prop="roleName" label="roleName" width="120" />
            <el-table-column prop="status" label="status" width="120" />
            <el-table-column prop="updateTime" label="updateTime" width="120" />
            <el-table-column fixed="right" label="Operations" width="240">
                <template #default="scope">
                    <el-button  type="primary" round size="small" @click="edit(scope.row)">修改</el-button>
                    <el-button  type="danger" round size="small" @click="del(scope.row.id)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="pageinfo.totalpage" :page-size="pageinfo.pageSize"
            @current-change="pageChange" />

    </div>
    <el-dialog v-model="DialogVisible" title="添加" width="50%" center>
        <el-form :model="Role">
            <el-form-item label="id" :label-width="formLabelWidth" >
                <el-input v-model="Role.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="deleted" :label-width="formLabelWidth">
                <el-input v-model="Role.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="description" :label-width="formLabelWidth">
                <el-input v-model="Role.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="Role.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="roleName" :label-width="formLabelWidth">
                <el-input v-model="Role.roleName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="status" :label-width="formLabelWidth">
                <el-input v-model="Role.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="Role.updateTime" autocomplete="off" />
            </el-form-item>
            
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="DialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAdd">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="EditDialogVisible" title="修改" width="50%" center>
        <el-form :model="Role">
            <el-form-item label="id" :label-width="formLabelWidth">
                <el-input v-model="Role.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="deleted" :label-width="formLabelWidth">
                <el-input v-model="Role.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="description" :label-width="formLabelWidth">
                <el-input v-model="Role.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="Role.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="roleName" :label-width="formLabelWidth">
                <el-input v-model="Role.roleName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="status" :label-width="formLabelWidth">
                <el-input v-model="Role.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="Role.updateTime" autocomplete="off" />
            </el-form-item>
            
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EditDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmEdit">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
  </template>
  
  <script>
  import { defineComponent } from "vue"
  import { cloneDeep } from 'lodash-es';
  import { getAll,add,getOne,getRolesByColums,getRolesPage,del,edit } from "../../http/role";
  import { ElMessage, ElMessageBox } from 'element-plus';
  export default defineComponent({
    data() {
        return {
            Roles: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            Role: {
                "createTime": "",
                "deleted": 0,
                "description": "",
                "id": 0,
                "roleName": "",
                "status": 0,
                "updateTime": ""
            },
            DialogVisible: false,
            EditDialogVisible: false
        }
    },
    mounted() {
        this.getdormitorys()

    },
    methods: {
        pageChange(currentPage) {
            this.pageinfo.currentPage = currentPage;
            this.getdormitorys();

        },

        getdormitorys() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getAll().then(res => {

                if (res.success) {
                    this.pageinfo.totalpage = res.data.roles.length;
                    this.Roles=res.data.roles.slice(start, end);
                    ElMessage(res.msg)
                } else {
                    ElMessage(res.msg)
                    return false
                }

                console.log(res);
            }).catch(err => {
                console.log(err);
            })


        },
        add() {
            this.DialogVisible = true
        },
        confirmAdd() {

            const one = this.Role;
            add(one).then(res => {
                this.getdormitorys()
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },

        
        edit(Role) {
            this.EditDialogVisible = true;
            this.Role = cloneDeep(Role);

        },

        confirmEdit() {
            let Role = this.Role; 
            console.log(Role)
            edit(Role).then(res => {
                if (res.success) {
                    this.EditDialogVisible = false;
                    this.getdormitorys();
                    ElMessage(res.msg)
                } else {
                    ElMessage(res.msg)
                    return false
                }

            }).catch(err => {
                ElMessage('网络错误联系管理员')
            })
        },
        
        del(id) {
            console.log(id);
            const params = {
                id: id
            }
            ElMessageBox.confirm(
                '是否确认删除',
                'Warning',
                {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '再考虑一下',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    }),
                    
                        del(params).then(res => {
                            if (res.success) {
                                this.getdormitorys();
                            } else {
                                console.log(res.msg);
                                return false
                            }
                        }).catch(err => {
                            console.log(err);

                        })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '再考虑一下',
                    })
                })

        }
    }
  });
  </script>
  
  <style lang="scss" scoped>

</style>
  