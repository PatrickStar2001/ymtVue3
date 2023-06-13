<template>
    <div>
        <el-button type="primary" @click="add">添加用户</el-button>
        <el-table :data="tableData">
            <el-table-column prop="id" label="id" align="center" />
            <el-table-column prop="roleId" label="roleId" align="center" />
            <el-table-column prop="permissionIds" label="permissionIds" align="center" />
            <el-table-column prop="createTime" label="createTime" align="center" />
            <el-table-column prop="updateTime" label="updateTime" align="center" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="del(scope.row.id)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>


        <el-dialog v-model="dialogFormVisible" :title="state ? '添加学生信息' : '修改学生信息'">
            <el-form :model="form">
                <el-form-item label="id" prop="id">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="roleId" prop="roleId">
                    <el-input v-model="form.roleId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="permissionIds" prop="permissionIds">
                    <el-input v-model="form.permissionIds" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="sure('form')">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { roleGetall, roleAdd, roleDel, roleEdit } from '../../http/rolePermission'
import { ElMessage, ElMessageBox } from 'element-plus';


const dialogFormVisible = ref(false)
const tableData = ref([])
const state = ref(true)
const form = ref({
    id: '',
    roleId:'',
    permissionIds:'',
    // createTime: '',
    // updateTime: ''
});
onMounted(() => {
    Getall()


})
const Getall = async () => {
    const data = await roleGetall()
    if (data.code !== 1) {
        return ElMessage('数据获取失败')
    }
    tableData.value = data.data.rolePermissions
    console.log(data);
    console.log(data.code);
}
const add = () => {
    form.value = {
        id: '',
        roleId:'',
        permissionIds:'',
        // createTime: '',
        // updateTime: ''
    }
    state.value = true
    dialogFormVisible.value = true
}

const sure = async (form) => {
    if (state) {
        const data = await roleAdd(form.value)
        console.log(data);
    } else {
        const data = await roleEdit(form.value)
        console.log(data);
    }


}
const edit = (row) => {
    state.value = false
    dialogFormVisible.value = true
    form.value = { ...row };
    console.log(row);
}
const del = async (row) => {
    ElMessageBox.confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
    .then(() => {
                //调用删除接口
                del({
                    id: val.id
                }).then(res => {
                    if (res.code === 1) {
                        ElMessage({
                            type: 'success',
                            message: '删除成功',
                        })
                        this.findPage()
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '删除失败',
                        })
                    }
                })

            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                })
            })

}
</script>

<style lang="scss" scoped>
.home {
    background-color: $blue;
}

.index {
    background-color: red;
}
</style>
