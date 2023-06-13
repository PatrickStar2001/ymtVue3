<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="学校列表">
                    <slot>
                        <el-table-column label="状态" width="70">
                            <template #default="scope">
                                <span>{{ scope.row.enable == 0 ? '未启用' : '启用' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="primary" @click="doEdit(scope.row.id)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="课题信息">
            <SubjectEdit :id="choiceId" @doCancel="doCancel"></SubjectEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { one, add, edit, page } from "@/http/subjectApi/subjectApi"
import { success, fail } from "@/utils/msg/msg";
import SubjectEdit from '../../../components/subjectEdit/subjectEdit.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
    },
    data() {
        return {
            data: [],
            column: [],
            visible: false,
            choiceId: 0
        };
    },
    methods: {
        doEdit(id) {
            this.choiceId = id
            this.visible = true
            console.log('编辑的id:' + this.choiceId + '  visible:' + this.visible)
        },
        doAdd() {
            console.log('触发了添加方法')
            this.choiceId = 0
            this.visible = true
        },
        doCancel() {
            this.visible = false
            this.all()
        },
        all() {
            let body  = {
                "colums": [],
                "current": 1,
                "size": 100
            }
            page(body).then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.page.records
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                // { prop: "id", label: "课题编号", width: 100 },
                { prop: "name", label: "名称", width: 200 },
                { prop: "attachment", label: "材料", width: 100 },
                { prop: "fee", label: "费用", width: 100 },
                { prop: "finished", label: "是否结项", width: 200 },
                { prop: "origin", label: "课题来源", width: 200 },
                { prop: "participant", label: "参与者", width: 200 },
                { prop: "period", label: "课题周期", width: 200 },
                { prop: "rank", label: "等级", width: 50 },
                { prop: "subjectNo", label: "编号", width: 250 },
                { prop: "type", label: "类型", width: 250 },
                { prop: "userId", label: "负责人", width: 250 },
            ];
        }
    },
    components: { ListView, SubjectEdit }
}
</script>
<style  scoped>
.up {
    display: flex;
    justify-content: center;
}

.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
