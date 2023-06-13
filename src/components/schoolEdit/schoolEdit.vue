<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="地址">
                <el-input v-model="entity.address" />
            </el-form-item>
            <el-form-item label="学校名称">
                <el-input v-model="entity.schoolName" />
            </el-form-item>

            <el-form-item label="省份">
                <el-input v-model="entity.province" />
            </el-form-item>

            <el-form-item label="市">
                <el-input v-model="entity.city" />
            </el-form-item>

            <el-form-item label="区">
                <el-input v-model="entity.area" />
            </el-form-item>

            <el-form-item label="学校描述">
                <el-input v-model="entity.description" type="textarea" :rows="5" />
            </el-form-item>

            <el-form-item label="学校状态">
                <el-select v-model="entity.enable" placeholder="请选择学校状态">
                    <el-option v-for="item in enableArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>


            <el-form-item label="纬度">
                <el-input v-model="entity.latitude" />
            </el-form-item>

            <el-form-item label="经度">
                <el-input v-model="entity.longitude" />
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit, checkName } from "@/http/school/schoolApi"
import { success, fail } from "@/utils/msg/msg";
import { getDate } from "@/utils/getDate/getDate";
import { useUserStore } from "@/store/user";
export default {
    props: { id: Number },
    mounted() {
        const userStore = useUserStore();
        const { token } = userStore;
        console.log('token：' + token)
        console.log('onMounted' + this.id)
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                address: '',
                schoolName: '',
                area: '',
                city: '',
                createTime: '',
                description: '',
                enable: 0,
                latitude: '',
                longitude: '',
                province: '',
                updateTime: '',
                deleted: 0
            },
            enableArr: [
                { value: 0, label: '未启用' },
                { value: 1, label: '已启用' }
            ]
        }
    },
    methods: {
        sure() {
            this.id == 0 ? this.add() : this.edit()
        },
        add() {
            console.log('name:' + this.entity.schoolName)
            checkName({ schoolName: this.entity.schoolName }).then(resp => {
                console.log('checkName:' + JSON.stringify(resp))
                resp.msg != '成功' ? this.doCreate() : fail('学校名已存在')
            })
        },
        doCreate() {
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
            console.log('触发了get方法')
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑学校收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.school
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
