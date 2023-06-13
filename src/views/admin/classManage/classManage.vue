<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>

            <el-select v-model="majorId" placeholder="请选择所属专业">
                <el-option v-for="item in majorArr" :key="item.id" :label="item.majorName" :value="item.id" />
            </el-select>

            <el-button type="success" @click="query()">查询</el-button>
            <el-button type="success" @click="clear()">清空</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="班级列表">
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

        <el-dialog v-model="visible" v-if="visible" width="30%" title="班级信息">
            <ClassInfoEdit :id="choiceId" @doCancel="doCancel"></ClassInfoEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { al, del, getAllMajor,getClassinfosForSelectByMajorId } from "@/http/classInfoApi/classInfoApi";
import { allSchool } from "@/http/departmentApi/departmentApi"
import { success, fail } from "@/utils/msg/msg";
import ClassInfoEdit from '../../../components/classInfoEdit/classInfoEdit.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
        // this.allSchool()
        this.getAllMajor()
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
            majorId:0
        };
    },
    methods: {
        getClassinfosForSelectByMajorId(){
            getClassinfosForSelectByMajorId({major:this.majorId}).then(resp=>{
                this.data = resp.msg = '没有数据' ? [] : resp.data.classInfos
            })
        },
        getAllMajor(){
            getAllMajor().then(resp=>{
                // console.log('专业:' + JSON.stringify(resp))
                this.majorArr = resp.data.majors
            })
        },
        query() {
            if(this.majorId == 0){
                fail('清选择专业')
                return
            }
            // console.log('专业id' + this.majorId)
            this.getClassinfosForSelectByMajorId()
        },
        clear() {
            this.majorId = 0
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
                this.data = resp.data.classinfos
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                { prop: "name", label: "班级", width: 200 },
                { prop: "school", label: "学校", width: 300 },
                { prop: "depart", label: "学院", width: 200 },
                { prop: "major", label: "专业", width: 200 },
            ];
        }
    },
    components: { ListView, ClassInfoEdit }
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
