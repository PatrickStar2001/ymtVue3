<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="学院名称">
                <el-input v-model="entity.departName" />
            </el-form-item>

            <el-form-item label="英文名称">
                <el-input v-model="entity.departCode" />
            </el-form-item>

            <el-form-item label="学院描述">
                <el-input v-model="entity.departDesc" type="textarea" :rows="5" />
            </el-form-item>

            <el-form-item label="学院类型">
                <el-select v-model="entity.departType" placeholder="请选择学院类型">
                    <el-option v-for="item in enableArr" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
            </el-form-item>


            <el-form-item label="所属学校">
                <el-select v-model="entity.schoolId" placeholder="请选择所属学校">
                    <el-option v-for="item in schoolArr" :key="item.id" :label="item.schoolName" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/departmentApi/departmentApi"
import { success, fail } from "@/utils/msg/msg";
import { al } from "@/http/school/schoolApi";
import { getDate } from "@/utils/getDate/getDate";
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
                departCode: '',
                departDesc: '',
                departName: '',
                departType: '',
                schoolId: '',
            },
            enableArr: [
                { value: 0, label: '学院' },
                { value: 1, label: '处室' }
            ],
            schoolArr: []
        }
    },
    methods: {
        allSchool(){
            al().then(resp=>{
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
                one({id:this.id}).then(resp => {
                    console.log('编辑学院收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.department
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
