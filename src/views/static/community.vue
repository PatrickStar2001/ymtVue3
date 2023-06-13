<template>
    <div class="communities">
        <div class="community-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="communities" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="address" label="团社地址" />
            <el-table-column prop="charger" label="团社会长" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="deleted" label="逻辑删除" />
            <el-table-column prop="depart" label="学院编号" />
            <el-table-column prop="description" label="团社介绍" />
            <el-table-column prop="email" label="团社邮箱" />
            <el-table-column prop="logo" label="团社logo" />
            <el-table-column prop="mobile" label="团社电话" />
            <el-table-column prop="name" label="团社名称" />
            <el-table-column prop="schoolId" label="#" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="teachers" label="导师" />
            <el-table-column prop="type" label="团社类型" />
            <el-table-column prop="updateTime" label="更新时间" />
            <el-table-column prop="version" label="#" />
            <el-table-column prop="weixin" label="团社公众号" />

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
    <el-dialog v-model="dialogFormVisible" title="广告类型编辑">
        <el-form :model="community">
            <el-form-item label="团社地址" :label-width="formLabelWidth">
                <el-input v-model="community.address" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社会长" :label-width="formLabelWidth">
                <el-input v-model="community.charger" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="community.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="逻辑删除" :label-width="formLabelWidth">
                <el-input v-model="community.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院编号" :label-width="formLabelWidth">
                <el-input v-model="community.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社介绍" :label-width="formLabelWidth">
                <el-input v-model="community.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社邮箱" :label-width="formLabelWidth">
                <el-input v-model="community.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="community.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社logo" :label-width="formLabelWidth">
                <el-input v-model="community.logo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社电话" :label-width="formLabelWidth">
                <el-input v-model="community.mobile" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社名称" :label-width="formLabelWidth">
                <el-input v-model="community.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="SchoolID" :label-width="formLabelWidth">
                <el-input v-model="community.schoolId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="community.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="导师" :label-width="formLabelWidth">
                <el-input v-model="community.teachers" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-input v-model="community.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-input v-model="community.updateTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="version" :label-width="formLabelWidth">
                <el-input v-model="community.version" autocomplete="off" />
            </el-form-item>
            <el-form-item label="团社公众号" :label-width="formLabelWidth">
                <el-input v-model="community.weixin" autocomplete="off" />
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
import {    communityPage,
            communityAdd,
            communityDel,
            communityEdit, } from "../../http/communtiy";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            communities: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            community: {  
                "address": "",
                "charger": 0,
                "createTime": "",
                "deleted": 0,
                "depart": 0,
                "description": "",
                "email": "",
                "id": 0,
                "logo": "",
                "mobile": "",
                "name": "",
                "schoolId": 0,
                "status": 0,
                "teachers": "",
                "type": 0,
                "updateTime": "",
                "version": 0,
                "weixin": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getCommunitiesPage(1)
    },
    methods: {
        toEdit(community) {
            console.log(community);
            this.dialogFormVisible=true;
            this.community=cloneDeep(community);    
        },
        getCommunitiesPage(current) {
            const data = {
                current: current,
                size: 2
            }
            communityPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.communities = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getCommunitiesPage(current);
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
            communityDel(params).then(res => {
                if (res.success) {
                    this.getCommunitiesPage(this.page.current)
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
            this.community = {  
                "address": "",
                "charger": 0,
                "createTime": "",
                "deleted": 0,
                "depart": 0,
                "description": "",
                "email": "",
                "id": 0,
                "logo": "",
                "mobile": "",
                "name": "",
                "schoolId": 0,
                "status": 0,
                "teachers": "",
                "type": 0,
                "updateTime": "",
                "version": 0,
                "weixin": ""
            };
        },
        save() {
            const community = this.community;
            if (community.id == 0) {
                communityAdd(community).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCommunitiesPage(this.page.current)
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
                communityEdit(community).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCommunitiesPage(this.page.current)
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
