<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="adCates">
    <div class="title">
        <h3>用户管理</h3>
    </div>
        <div class="user_rig">
            <el-row :gutter="20">
  <el-col :span="9"><div class="grid-content bg-purple">
      <el-input v-model="id" placeholder="请输入id" />
  </div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">
     <el-button type="primary" >搜索</el-button>
  </div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple">
        <el-button type="warning" @click="toAdd">添加</el-button>
  </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>   
        </div>
        <el-table :data="adCates" style="width: 100%" border>
            <el-table-column fixed prop="id" label="序号" width="80" />
            <el-table-column prop="name" label="用户名" width="120"/>
            <el-table-column prop="width" label="密码" width="120" />
            <el-table-column prop="height" label="token" width="120" />
             <el-table-column prop="name" label="状态" width="80"/>
            <el-table-column prop="width" label="积分" width="80" />
            <el-table-column prop="height" label="创建时间" width="120" />
             <el-table-column prop="name" label="更新时间" width="120"/>
            <el-table-column prop="width" label="昵称" width="120" />
            <el-table-column prop="height" label="签名" width="120" />
            <el-table-column prop="height" label="手机号" width="120"/>
            <el-table-column prop="height" label="上次登录时间" width="120" />
            <el-table-column prop="height" label="失败次数" width="80"/>
            <el-table-column prop="height" label="余额" width="120" />
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
    <el-dialog v-model="dialogFormVisible" title="用户信息编辑">
        <el-form :model="adCate">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="adCate.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="adCate.width" autocomplete="off" />
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="adCate.height" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="adCate.height" autocomplete="off" />
            </el-form-item>
            <el-form-item label="签名" :label-width="formLabelWidth">
                <el-input v-model="adCate.height" autocomplete="off" />
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
import { adCatePage, adCateDelId, adCateAdd, adCateEdit } from "../../http";
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
            id:'',
            dialogFormVisible: false,
            user:{
  "avatar": "",
  "birthday": "",
  "createTime": "",
  "email": "",
  "gender": 1,
  "groupId": 1,
  "id": 0,
  "joinip": "",
  "jointime": 0,
  "lastloginip": "",
  "lastlogintime": 0,
  "loginfailure": 0,
  "mobile": "",
  "money": 0,
  "motto": "",
  "nickname": "",
  "password": "",
  "salt": "",
  "score": 0,
  "status": "",
  "updateTime": "",
  "username": ""
},
            adCate: {
                "height": "",
                "id": 0,//标志点 0添加 >0 更新
                "name": "",
                "width": ""
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
                size: 2
            }
            adCatePage(data).then(res => {
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
            //模拟删除，服务器进行处理 
            //要别人反悔机会
            // 如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            adCateDelId(params).then(res => {
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
            this.dialogFormVisible = true;
        },
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                adCateAdd(adcate).then(res => {
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
                adCateEdit(adcate).then(res => {
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

<style lang="scss" scoped>
.title{
    height: 50px;
    margin: 0 auto;
}
.user_rig{
    flex-direction: row;
    height: 50px;
    
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: white;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: white;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: white;
  }
</style>
