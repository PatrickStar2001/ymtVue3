<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>

            <el-select v-model="schoolId" placeholder="请选择所属学校">
                <el-option v-for="item in schoolArr" :key="item.id" :label="item.schoolName" :value="item.id" />
            </el-select>

            <el-button type="success" @click="query()">查询</el-button>
            <el-button type="success" @click="clear()">清空</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="学院列表">
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

        <el-dialog v-model="visible" v-if="visible" width="30%" title="学院信息">
            <!-- <SchoolEdit :id="choiceId" @doCancel="doCancel"></SchoolEdit> -->
            <DepartmentEdit :id="choiceId" @doCancel="doCancel"></DepartmentEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { al, edit, getBySchoolId, del, add, one, allSchool } from "@/http/departmentApi/departmentApi";
import { success, fail } from "@/utils/msg/msg";
import SchoolEdit from '../../../components/schoolEdit/schoolEdit.vue';
import DepartmentEdit from '../../../components/departmentEdit/departmentEdit.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
        this.allSchool()
    },
    data() {
        return {
            data: [],
            column: [],
            visible: false,
            choiceId: 0,
            schoolArr: [],
            schoolId: '',
        };
    },
    methods: {
        query() {
            console.log('学校id' + this.schoolId)
            getBySchoolId({ schoolId: this.schoolId }).then(resp => {
                console.log('query到的：' + JSON.stringify(resp))
                this.data = resp.msg != '没有数据' ? resp.data.departments : []
            })
        },
        clear() {
            this.schoolId = ''
            this.all()
        },
        allSchool() {
            allSchool().then(resp => {
                this.schoolArr = resp.data.schools
            })
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
                this.data = resp.data.departments
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "学院编号", width: 100 },
                { prop: "departName", label: "学院名称", width: 200 },
                { prop: "departCode", label: "学院英文名称", width: 300 },
                { prop: "departDesc", label: "学院描述", width: 200 },
                { prop: "schoolId", label: "学校id", width: 200 },
                { prop: "departType", label: "学院类型", width: 100 },
            ];
        }
    },
    components: { ListView, SchoolEdit, DepartmentEdit }
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
