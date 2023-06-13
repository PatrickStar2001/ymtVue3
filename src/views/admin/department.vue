<template>
   

    <div class="adCates">
        <div class="adcate-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="departName" label="部门名称" />
            <el-table-column prop="departCode" label="部门英文名" />
            <el-table-column prop="departDesc" label="部门描述"/>
            <el-table-column prop="schoolId" label="学校id" />
            <el-table-column prop="departFype" label="学院类型"/>

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
    <el-dialog v-model="dialogFormVisible" title="话题编辑">
        <el-form :model="adCate">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
                <el-input v-model="adCate.departName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="部门英文名" :label-width="formLabelWidth">
                <el-input v-model="adCate.departCode" autocomplete="off" />
            </el-form-item>
            <el-form-item label="部门描述" :label-width="formLabelWidth">
                <el-input v-model="adCate.departDesc" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校id" :label-width="formLabelWidth">
                <el-input v-model="adCate.schoolId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院类型" :label-width="formLabelWidth">
                <el-input v-model="adCate.departFype" autocomplete="off" />
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
import { adTopicPage, adTopicDelId, adTopicAdd, adTopicEdit } from "../../http/department";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            adCate: {
                //部门名称
                "departName": "",
                "id": 0,//标志点 0添加 >0 更新
                //部门英文名
                "departCode": "",
                //部门描述
                "departDesc": '',
                //学校id
                "schoolId": '',
                //学院类型
                "departFype" : ''
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible=true;
            this.adCate=cloneDeep(adcate);    
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 5
            }
            adTopicPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.adCates = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAdCatesPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            //删除数据
            
            console.log(id)
            const params = {
                id: id
            }
            adTopicDelId(params).then(res => {
                if (res.success) {
                    this.getAdCatesPage(this.page.current)

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
            this.adCate =  {
                "depart_name": "",
                "id": 0,
                "depart_code": "",
                "depart_desc": '',
                "school_id": '',
                "depart_type" : ''
            },
            this.dialogFormVisible = true;
        },
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                adTopicAdd(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
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
            else{
                adTopicEdit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
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