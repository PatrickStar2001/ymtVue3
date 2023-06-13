<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="Courses">
        <div class="course-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="Courses" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="courseNo" label="课程编号" />
            <el-table-column prop="courseType" label="课程类型" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="depart" label="学院" width="120" />
            <el-table-column prop="description" label="课程描述" width="120" />
            <el-table-column prop="major" label="专业" width="120" />
            <el-table-column prop="name" label="课程名称" width="120" />
            <el-table-column prop="nameEn" label="英文课程名称" width="120" />
            <el-table-column prop="school" label="学校" width="120" />
            <el-table-column prop="state" label="状态" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />

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
    <el-dialog v-model="dialogFormVisible" title="课程类型编辑">
        <el-form :model="Course">
            <el-form-item label="课程编号" :label-width="formLabelWidth">
                <el-input v-model="Course.courseNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课程类型" :label-width="formLabelWidth">
                <el-input v-model="Course.courseType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="Course.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth">
                <el-input v-model="Course.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课程描述" :label-width="formLabelWidth">
                <el-input v-model="Course.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth">
                <el-input v-model="Course.major" autocomplete="off" />
            </el-form-item>
            <el-form-item label="课程名称" :label-width="formLabelWidth">
                <el-input v-model="Course.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="英语课程名称" :label-width="formLabelWidth">
                <el-input v-model="Course.nameEn" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
                <el-input v-model="Course.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="Course.state" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-input v-model="Course.school" autocomplete="off" />
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

    <template><el-input v-model="input" placeholder="Please input" /></template>
</template>

<script>
import { defineComponent } from "vue"
//
import { coursePage, courseDelId, courseAdd, courseEdit,getbycolums } from "../../http/course";
import { ElMessage } from 'element-plus'
import axios from "axios"
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            input:"",
            Courses: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            Course: {
                "courseNo": "",
                "courseType": "",
                "createTime": "",
                "deleted": 0,
                "depart": "",
                "description": "",
                "id": 0,
                "major": "",
                "name": "",
                "nameEn": "",
                "school": "",
                "state": 0,
                "updateTime": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getCoursesPage(1)
    },
    methods: {
        toEdit(course) {
            console.log(course);
            this.dialogFormVisible = true;
            this.Course = cloneDeep(course);
        },
        getCoursesPage(current) {
            const data = {
                current: current,
                size: 6
            }
            coursePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.Courses = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getCoursesPage(current);
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
            courseDelId(params).then(res => {
                if (res.success) {
                    this.getCoursesPage(this.page.current)

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
        },
        save() {
            const course = this.Course;
            if (course.id == 0) {
                courseAdd(course).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCoursesPage(this.page.current)
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
                courseEdit(course).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCoursesPage(this.page.current)
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
    }

});
</script>

<style lang="scss" scoped></style>
