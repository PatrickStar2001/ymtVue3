<template>
    <div class="admin-group">
        <div class="admin-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="admingroups" style="width: 100%">
            <el-table-column fixed prop="idn" label="#"  />
            <el-table-column prop="id" label="id"  />
            <el-table-column prop="name" label="name"  />
            <el-table-column prop="pid" label="pid"  />
            <el-table-column prop="rules" label="rules"  />
            <el-table-column prop="createTime" label="create_time"  />
            <el-table-column prop="updateTime" label="update_time"  />

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="管理组编辑">
        <el-form :model="admingroup">
            <el-form-item label="id" :label-width="formLabelWidth">
                <el-input v-model="admingroup.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="admingroup.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="pid" :label-width="formLabelWidth">
                <el-input v-model="admingroup.pid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="rules" :label-width="formLabelWidth">
                <el-input v-model="admingroup.rules" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="admingroup.createTime" type="date" autocomplete="off" />
            </el-form-item>
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="admingroup.updateTime" type="date" autocomplete="off" />
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
</template>

<script>
import { defineComponent } from "vue"
import { admingroupEdit, admingroupAdd, admingroupdelete } from "../../http/admingroup";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            admingroups: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            admingroup: {
                "createTime": "",
                "id": 0,
                "name": "",
                "pid": 0,
                "rules": "",
                "status": "",
                "updateTime": ""
            },
            formLabelWidth: 80
        }
    },
    methods: {
        toEdit(admingroup) {
            console.log(admingroup);
            this.dialogFormVisible = true;
            this.admingroup = cloneDeep(admingroup);
        },
        
        del(id) {
            console.log(id)
            const params = {
                id: id
            }
            
        },
        toAdd() {
            this.dialogFormVisible = true;
            this.admingroup = {
                "createTime": "",
                "id": 0,
                "name": "",
                "pid": 0,
                "rules": "",
                "status": "",
                "updateTime": ""
            }
        },
        save() {
            const admingroup = this.admingroup;
            if (admingroup.id == 0) {
                admingroupAdd(admingroup).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false;
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
            else {
                admingroupEdit(admingroup).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false;
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

        }

    }

});
</script>

<style lang="scss" scoped></style>