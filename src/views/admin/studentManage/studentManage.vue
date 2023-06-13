<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>

            <div>
                <span>学生姓名</span>
                <el-input v-model="studentName"/>
            </div>

            <el-button type="success" @click="query()">查询</el-button>
            <el-button type="success" @click="clear()">清空</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="学生列表">
                    <slot>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="primary" @click="doEdit(scope.row.id)">编辑</el-button>
                                <el-button type="danger" @click="doDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="学生信息">
            <StudentEditVue :id="choiceId" @doCancel="doCancel"></StudentEditVue>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { del, add, edit,getStudentByStudentName,al } from "@/http/studentApi/studentApi"
import { success, fail } from "@/utils/msg/msg";
import StudentEditVue from '../../../components/studentEdit/studentEdit.vue';
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
            choiceId: 0,
            schoolArr: [],
            schoolId: '',
            majorArr:[],
            majorId:0,
            studentName:''
        };
    },
    methods: {
        query() {
            console.log('name'  + this.studentName)
            getStudentByStudentName({studentName:this.studentName}).then(resp=>{
                this.data = resp.msg == '没有数据' ? [] : resp.data.students
                console.log('按照姓名查询:' + JSON.stringify(resp))
            })
        },
        clear() {
            this.studentName = ''
            this.all()
        },
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
        doDelete(id) {
            console.log('删除的id:' + id)
            del({ id: id }).then(resp => {
                success('删除成功')
                this.all()
            })
        },
        all() {
            al().then(resp => {
                // console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.students
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                // { prop: "id", label: "编号", width: 100 },
                { prop: "studentName", label: "姓名", width: 200 },
                { prop: "school", label: "学校", width: 300 },
                { prop: "depart", label: "学院", width: 200 },
                { prop: "major", label: "专业", width: 200 },
                { prop: "studentNo", label: "学号", width: 200 },
                { prop: "userId", label: "用户编号", width: 200 },
            ];
        }
    },
    components: { ListView, StudentEditVue }
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
