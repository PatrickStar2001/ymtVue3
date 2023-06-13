<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="entity.name" />
            </el-form-item>
            <el-form-item label="来源">
                <el-input v-model="entity.origin" />
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="entity.type" placeholder="请选择课题类型">
                    <el-option v-for="item in enableArr" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
            </el-form-item>

            <el-form-item label="等级">
                <el-input v-model="entity.rank" />
            </el-form-item>

            <el-form-item label="周期">
                <el-input v-model="entity.period" />
            </el-form-item>

            <el-form-item label="费用">
                <el-input v-model="entity.fee" />
            </el-form-item>

            <el-form-item label="是否结项">
                <el-select v-model="entity.finished" placeholder="">
                    <el-option v-for="item in enableArr" :key="item.value" :label="item.value" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="佐证材料">
                <el-input v-model="entity.attachment" />
            </el-form-item>

            <el-form-item label="课题编号">
                <el-input v-model="entity.subjectNo" />
            </el-form-item>

            <el-form-item label="负责人">
                <el-input v-model="entity.userId" />
            </el-form-item>
            <el-form-item label="课题等级">
                <el-input v-model="entity.level" />
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/subjectApi/subjectApi"
import { success, fail } from "@/utils/msg/msg";
import { getDate } from "@/utils/getDate/getDate";
export default {
    props: { id: Number },
    mounted() {
        console.log('onMounted' + this.id)
        this.get()
    },
    data() {
        return {
            entity: {
                id:0,
                attachment: '',
                fee: '',
                finished: '',
                name: '',
                origin: '',
                participant: '',
                period: '',
                rank: '',
                subjectNo: '',
                type: '',
                userId: '',
                level:'',
            },
            enableArr: [
                { value: '是', label: '科技类' },
                { value: '否', label: '教改类' }
            ]
        }
    },
    methods: {
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
            console.log('触发了get方法')
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑学校收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.subject
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
