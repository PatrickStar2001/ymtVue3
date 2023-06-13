<template>
    <div class="memorabilias">
        <p style="text-align: center; font-size: 20px; font-weight: 600; color: rgb(111, 105, 105); margin-top: -30px;" >大事件发生</p>
        <div class="community-tools">
            <el-input style="float: right; width: 200px; margin-right: 10px"></el-input>
            <el-button  type="primary" style="float: right; margin-right: 20px;">搜索</el-button>
            <el-button type="primary" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="memorabilias" style="width: 100%">
            <el-table-column fixed prop="id" label="" width="50" />
            <el-table-column prop="content" label="事件内容" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="happenTime" label="发生时间" />
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column prop="userId" label="用户ID" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange"  style="position: absolute; left: 800px; top: 630px;"/>
    </div>
    <el-dialog v-model="dialogFormVisible" title="大事件发生">
        <el-form :model="memorabilia">
            <el-form-item label="事件内容" :label-width="formLabelWidth">
                <el-input v-model="memorabilia.content" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
            <el-date-picker v-model="memorabilia.createTime" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="发生时间" :label-width="formLabelWidth">
                <el-date-picker v-model="memorabilia.happenTime" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="修改时间" :label-width="formLabelWidth">
                <el-date-picker v-model="memorabilia.updateTime" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="用户ID" :label-width="formLabelWidth">
                <el-input v-model="memorabilia.userId" autocomplete="off" />
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
import {    memorabiliaPage,
            memorabiliaAdd,
            memorabiliaDel,
            memorabiliaEdit, } from "../../http/memorabilia";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'

export default defineComponent({
    data() {
        return {
            memorabilias: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            memorabilia: {  
                "content": "",
                "createTime": "",
                "happenTime": "",
                "id": 0,
                "updateTime": "",
                "userId": 0
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getMemorabiliasPage(1)
    },
    methods: {
        toEdit(memorabilia) {
            console.log(memorabilia);
            this.dialogFormVisible=true;
            this.memorabilia=cloneDeep(memorabilia);    
        },
        getMemorabiliasPage(current) {
            const data = {
                current: current,
                size: 10
            }
            memorabiliaPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.memorabilias = page.records;
                for(var i=0;i<this.memorabilias.length;i++){
                    this.memorabilias[i].createTime=this.memorabilias[i].createTime.substring(0,10)
                    this.memorabilias[i].happenTime=this.memorabilias[i].happenTime.substring(0,10)
                    this.memorabilias[i].updateTime=this.memorabilias[i].updateTime.substring(0,10)
                }
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getMemorabiliasPage(current);
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
            memorabiliaDel(params).then(res => {
                if (res.success) {
                    this.getMemorabiliasPage(this.page.current)
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
            this.memorabilia = {  
                "content": "",
                "createTime": "",
                "happenTime": "",
                "id": 0,
                "updateTime": "",
                "userId": 0
            };
        },
        save() {
            const memorabilia = this.memorabilia;
            if (memorabilia.id == 0) {
                memorabiliaAdd(memorabilia).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getMemorabiliasPage(this.page.current)
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
                memorabiliaEdit(memorabilia).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getMemorabiliasPage(this.page.current)
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
<style lang="scss" scoped>
.memorabilias{
    width: 1200px;
    height: 500px;
    margin-left: 200px;
    margin-top: 80px;
    padding: 50px;
    border-radius: 5px;
    border-color: rgb(200, 200, 200);
    border-width: 1px;
    border-style:solid;

}
</style>
