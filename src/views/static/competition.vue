<template>
    <div class="competitions">
        <div class="competition-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="competitions" style="width: 100%">
            <el-table-column prop="id" label="竞赛编号" width="150" />
                <el-table-column prop="name" label="竞赛名称" width="150" />
                <el-table-column prop="start" label="开始时间" width="150" />
                <el-table-column prop="end" label="结束时间" width="150" />
                <el-table-column prop="homePage" label="竞赛官网" width="150" />
                <el-table-column prop="type" label="竞赛类型" width="150" />
                <el-table-column prop="level" label="竞赛等级" width="150" />
                <el-table-column prop="organizer" label="主办单位" width="150" />
                <el-table-column prop="schoolId" label="学校" width="150"/>

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
    <el-dialog v-model="dialogFormVisible" title="广告类型编辑">
        <el-form :model="competition">
            <el-form-item label="竞赛名称" :label-width="formLabelWidth">
                <el-input v-model="competition.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-input v-model="competition.start" autocomplete="off" />
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-input v-model="competition.end" autocomplete="off" />
            </el-form-item>
            <el-form-item label="竞赛官网" :label-width="formLabelWidth">
                <el-input v-model="competition.homePage" autocomplete="off" />
            </el-form-item>
            <el-form-item label="竞赛类型" :label-width="formLabelWidth">
                <el-input v-model="competition.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="竞赛等级" :label-width="formLabelWidth">
                <el-input v-model="competition.level" autocomplete="off" />
            </el-form-item>
            <el-form-item label="主办单位" :label-width="formLabelWidth">
                <el-input v-model="competition.organizer" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
                <el-input v-model="competition.schoolId" autocomplete="off" />
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
import {   competitionPage,
            competitionAdd,
            competitionDel,
            competitionEdit, } from "../../http/competition";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            competitions: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            competition: {  
                "id": "",
                "name": 0,
                "start": "",
                "end": 0,
                "homePage": 0,
                "type": "",
                "level": "",
                "organizer": 0,
                "schoolId": "",
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getcompetitionsPage(1)
    },
    methods: {
        toEdit(competition) {
            console.log(competition);
            this.dialogFormVisible=true;
            this.competition=cloneDeep(competition);    
        },
        getcompetitionsPage(current) {
            const data = {
                schoolId: 1,
                current: current,
                size: 5
            }
           competitionPage(data).then(res => {
                console.log(res);
                const resdata = res.data;
                this.competitions = resdata.page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getcompetitionsPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            //删除数据
            //模拟删除，服务器进行处理 
            //要别人反悔机会
            // 如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            competitionDel(params).then(res => {
                if (res.success) {
                    this.getcompetitionsPage(this.page.current)
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
            this.competition = {  
                "id": "",
                "name": "",
                "start": "",
                "end": "",
                "homePage": "",
                "type": "",
                "level": "",
                "organizer": "",
                "schoolId": "",
            };
        },
        save() {
            const competition = this.competition;
            if (competition.id == 0) {
                competitionAdd(competition).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getcompetitionsPage(this.page.current)
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
                competitionEdit(competition).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getcompetitionsPage(this.page.current)
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
