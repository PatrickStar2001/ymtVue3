<template>
    <div class="subject">
        <div class="data-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="subject" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="attachment" label="佐证材料" />
            <el-table-column prop="fee" label="课题费用" />
            <el-table-column prop="finished" label="是否结项" />
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="name" label="课题名称" />
            <el-table-column prop="origin" label="课题来源" />
            <el-table-column prop="participant" label="参与者" />
            <el-table-column prop="period" label="课题周期" />
            <el-table-column prop="rank" label="课题等级" />
            <el-table-column prop="subjectNo" label="课题编号" />
            <el-table-column prop="type" label="课题类型" />
            <el-table-column prop="userId" label="负责人" />

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
    <el-dialog v-model="dialogFormVisible" title="课题编辑">
        <el-form :model="data">
            <el-form-item label="佐证材料" :label-width="formLabelWidth">
                <el-input v-model="data.attachment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题费用" :label-width="formLabelWidth">
                <el-input v-model="data.fee" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否结项" :label-width="formLabelWidth">
                <el-input v-model="data.finished" autocomplete="off" />
            </el-form-item>
            <el-form-item label="编号" :label-width="formLabelWidth">
                <el-input v-model="data.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题名称" :label-width="formLabelWidth">
                <el-input v-model="data.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题来源" :label-width="formLabelWidth">
                <el-input v-model="data.origin" autocomplete="off" />
            </el-form-item>
            <el-form-item label="参与者" :label-width="formLabelWidth">
                <el-input v-model="data.participant" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题周期" :label-width="formLabelWidth">
                <el-input v-model="data.period" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题等级" :label-width="formLabelWidth">
                <el-input v-model="data.rank" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题编号" :label-width="formLabelWidth">
                <el-input v-model="data.subjectNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课题类型" :label-width="formLabelWidth">
                <el-input v-model="data.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
                <el-input v-model="data.userId" autocomplete="off" />
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
import {    dataPage,
            dataAdd,
            dataDel,
            dataEdit, } from "../../http/subject";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            subject: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            data: {  
                "attachment": "",
                "fee": 0,
                "finished": "",
                "id": 0,
                "name": "",
                "origin": "",
                "participant": "",
                "period": "",
                "rank": "",
                "subjectNo": "",
                "type": "",
                "userId": "",
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getsubjectPage(1)
    },
    methods: {
        toEdit(data) {
            console.log(data);
            this.dialogFormVisible=true;
            this.data=cloneDeep(data);    
        },
        getsubjectPage(current) {
            const data = {
                current: current,
                size: 2
            }
            dataPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.subject = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            this.getsubjectPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            console.log(id)
            const params = {
                id: id
            }
            dataDel(params).then(res => {
                if (res.success) {
                    this.getsubjectPage(this.page.current)
                    //当前分页数据只剩一条时删除返回上一页
                    if (this.page.total % this.page.size == 1)
                        this.getAdCatesPage(this.page.current - 1)
                    else {
                        this.getAdCatesPage(this.page.current)
                    }
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
            this.dialogFormVisible = true;
            //清空表单
            this.data = {  
                "attachment": "",
                "fee": 0,
                "finished": "",
                "id": 0,
                "name": "",
                "origin": "",
                "participant": "",
                "period": "",
                "rank": "",
                "subjectNo": "",
                "type": "",
                "userId": "",
            };
        },
        save() {
            const data = this.data;
            if (data.id == 0) {
                dataAdd(data).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getsubjectPage(this.page.current)
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
                dataEdit(data).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getsubjectPage(this.page.current)
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
