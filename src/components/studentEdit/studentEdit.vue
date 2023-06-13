<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="entity.studentName" />
            </el-form-item>

            <el-form-item label="学号">
                <el-input v-model="entity.studentNo" />
            </el-form-item>

            <el-form-item label="所属学校">
                <el-select v-model="entity.school" placeholder="请选择所属学校" @change="changeSchool">
                    <el-option v-for="item in schoolArr" :key="item.id" :label="item.schoolName" :value="item.schoolName" />
                </el-select>
            </el-form-item>

            <el-form-item label="所属学院">
                <el-select v-model="entity.depart" placeholder="请选择所属学院" @change="changeDepart">
                    <el-option v-for="item in departArr" :key="item.id" :label="item.departName" :value="item.departName" />
                </el-select>
            </el-form-item>

            <!-- <el-form-item label="所属专业">
                <el-select v-model="entity.major" placeholder="请选择所属专业">
                    <el-option v-for="item in majorArr" :key="item.id" :label="item.majorName" :value="item.majorName" />
                </el-select>
                <span>majorController中getMajorForSelectByDepartId接口也有问题,导致这边没办法三级联动,所以专业在下面这行手动输入吧</span>
            </el-form-item> -->

            <el-form-item label="所属专业">
                <el-input v-model="entity.major" />
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/studentApi/studentApi"
import { success, fail } from "@/utils/msg/msg";
import { getBySchoolId, allSchool } from "@/http/departmentApi/departmentApi";
export default {
    props: { id: Number },
    mounted() {
        console.log('mounted' + this.id)
        this.get()
        this.allSchool()
    },
    data() {
        return {
            entity: {
                id: 0,
                user_id: '',
                school: '',
                depart: '',
                classInfo: '',
                major: '',
                studentName: '',
                studentNo:''
            },
            enableArr: [
                { value: 0, label: '不启用' },
                { value: 1, label: '启用' }
            ],
            majorArr: [],
            departArr: [],
            schoolArr: [],
            schoolId: 0,
            departId: 0,
        }
    },
    methods: {
        getMajorByDepartId(departId) {
            getMajorForSelectByDepartId({ departId: departId }).then(resp => {
                this.majorArr = resp.data.majors
            })
        },
        getDepartBySchoolId(schoolId) {
            getBySchoolId({ schoolId: schoolId }).then(resp => {
                this.departArr = resp.msg != '没有数据' ? resp.data.departments : []
            })
        },
        changeDepart(a) {
            console.log('选中的学院：' + a)
            this.departArr.forEach(item => {
                if (item.departName == a) {
                    console.log('depart:' + JSON.stringify(item))
                    // this.getMajorByDepartId(item.id)
                }
            })
        },
        changeSchool(a) {
            console.log('选中的学校:' + a)
            this.schoolArr.forEach(item => {
                if (item.schoolName == a) {
                    console.log('school:' + JSON.stringify(item))
                    this.getDepartBySchoolId(item.id)
                }
            })
        },
        allSchool() {
            allSchool().then(resp => {
                this.schoolArr = resp.data.schools
            })
        },
        sure() {
            this.id == 0 ? this.add() : this.edit()
        },
        add() {
            console.log('新建的:' + JSON.stringify(this.entity))
            add(this.entity).then(resp => {
                success('新建成功')
                this.doCancel()
            })
        },
        edit() {
            edit(this.entity).then(resp => {
                success('已保存')
                this.doCancel()
            })
        },
        doCancel() {
            this.$emit('doCancel')
        },
        get() {
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('id:' + this.id + '  编辑时one收到的:' + JSON.stringify(resp))
                    if (!!resp.data) {
                        this.entity = resp.data.student
                    }

                })
            }
        },
    },
}
</script>
<style  scoped>
.btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
