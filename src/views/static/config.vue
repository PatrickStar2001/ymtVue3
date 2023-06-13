<template>
    <div class="config">
        <div class="config-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="config" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="name" label="变量名" />
            <el-table-column prop="group" label="分组" />
            <el-table-column prop="title" label="变量标题" />
            <el-table-column prop="tip" label="变量描述" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="value" label="变量值" />
            <el-table-column prop="content" label="字典数据" />
            <el-table-column prop="rule" label="验证规则" />
            <el-table-column prop="extend" label="扩展属性" />
            <el-table-column prop="allow_del" label="允许删除:0=否,1=是" />
            <el-table-column prop="weigh" label="权重" />
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
    <el-dialog v-model="dialogFormVisible" title="类型编辑">
        <el-form :model="config">
            <el-form-item label="变量名" :label-width="formLabelWidth">
                <el-input v-model="config.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="分组" :label-width="formLabelWidth">
                <el-input v-model="config.group" autocomplete="off" />
            </el-form-item>
            <el-form-item label="变量标题" :label-width="formLabelWidth">
                <el-input v-model="config.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="变量描述" :label-width="formLabelWidth">
                <el-input v-model="config.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-input v-model="config.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="变量值" :label-width="formLabelWidth">
                <el-input v-model="config.value" autocomplete="off" />
            </el-form-item>
            <el-form-item label="字典数据" :label-width="formLabelWidth">
                <el-input v-model="config.content" autocomplete="off" />
            </el-form-item>
            <el-form-item label="验证规则" :label-width="formLabelWidth">
                <el-input v-model="config.rule" autocomplete="off" />
            </el-form-item>
            <el-form-item label="扩展属性" :label-width="formLabelWidth">
                <el-input v-model="config.extend" autocomplete="off" />
            </el-form-item>
            <el-form-item label="允许删除" :label-width="formLabelWidth">
                <el-input v-model="config.allowDel" autocomplete="off" />
            </el-form-item>
            <el-form-item label="权重" :label-width="formLabelWidth">
                <el-input v-model="config.weigh" autocomplete="off" />
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
import {    configPage,
            configAdd,
            configDel,
            configEdit} from "../../http/config";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            config: [],
            page: {
                total:0,
                current:1,
                size:10
            },
            dialogFormVisible: false,
            config: {  
                "allowDel": true,
                "content": "",
                "extend": "",
                "group": "",
                "id": 0,
                "name": "",
                "rule": "",
                "tip": "",
                "title": "",
                "type": "",
                "value": "",
                "weigh": 0
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getconfigPage(1)
    },
    methods: {
        toEdit(config) {
            console.log(config);
            this.dialogFormVisible=true;
            this.config=cloneDeep(config);    
        },
        getconfigPage(current) {
            const data = {
                current: current,
                size: 2
            }
            configPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.config = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getconfigPage(current);
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
            configDel(params).then(res => {
                if (res.success) {
                    this.getconfigPage(this.page.current)
                    //当前分页数据只剩一条时删除返回上一页
                    if (this.page.total % this.page.size == 1)
                        this.getAdCatesPage(this.page.current - 1)
                    else {
                        this.getAdCatesPage(this.page.current)
                    }
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
            //清空表单
            this.config = {  
                "allowDel": true,
                "content": "",
                "extend": "",
                "group": "",
                "id": 0,
                "name": "",
                "rule": "",
                "tip": "",
                "title": "",
                "type": "",
                "value": "",
                "weigh": 0
            };
        },
        save() {
            const config = this.config;
            if (config.id == 0) {
                configAdd(config).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getconfigPage(this.page.current)
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
                configEdit(config).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getconfigPage(this.page.current)
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
