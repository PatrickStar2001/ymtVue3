<template>
    <div class="communities">
        <div class="choiceRow-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="communities" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="name" label="班级名称" />
            <el-table-column prop="state" label="状态" />
            <el-table-column prop="depart" label="学院" />

            <el-table-column prop="school" label="学校名称" />
            <el-table-column prop="major" label="专业" />


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
        <el-form :model="choiceRow">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
                <el-input v-model="choiceRow.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="choiceRow.major" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth">
                <el-input v-model="choiceRow.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校名称" :label-width="formLabelWidth">
                <el-input v-model="choiceRow.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="choiceRow.state" autocomplete="off" />
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

import {
    edit,
    add,
    all,
    delInfo,
    getClassinfoBySchoolAndDepartAndMajo,
    getClassinfosForSelectByMajorId,
    getOne,
    page,
    school
} from "../../http/classInfo"
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            communities: [],
            page: {
                colums: [],
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            classEntity: {
                "depart": "",
                "id": 0,
                "major": "",
                "name": "",
                "school": "",
                "state": 0
            },
            choiceRow: {},

            formLabelWidth: 80,
            isAdd: false
        }
    },
    mounted() {
        this.getCommunitiesPage(1)
    },
    methods: {
        toEdit(row) {
            console.log('既然你----')
            this.choiceRow = cloneDeep(row);
            this.dialogFormVisible = true;

            // Object.assign
            // this.choiceRow = cloneDeep(choiceRow);
        },
        getCommunitiesPage(current) {
            const data = {
                current: 1,
                size: 1000
            }
            all(data).then(res => {
                console.log("收到的回复：" + JSON.stringify(res));
                this.communities = res.data.classinfos;

                console.log('--------' + JSON.stringify(this.communities[0]))
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getCommunitiesPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            console.log('id:---- ' + id)
            //删除数据
            //模拟删除，服务器进行处理 
            //要别人反悔机会
            // 如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            delInfo(params).then(res => {
                if (res.success) {
                    this.getCommunitiesPage(this.page.current)
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
            this.choiceRow = this.classEntity
            this.isAdd = true
        },
        save() {
            if (this.isAdd) {
                console.log('添加方法')
                this.isAdd = false
            }
            console.log('添加的:' + JSON.stringify(this.choiceRow))
            if (this.choiceRow.id === 0) {
                console.log('进入添加方法------')
                add(this.choiceRow).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCommunitiesPage(this.page.current)
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
                edit(this.choiceRow).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCommunitiesPage(this.page.current)
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
