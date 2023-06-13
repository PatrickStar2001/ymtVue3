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
            <div class="text">
                <h1>类别管理</h1>
            </div>
           
        </div>
        <div class="cat_rig">
            <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
    <el-input v-model="input" placeholder="请输入id"></el-input>
  </div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple">
    <el-button type="warning" @click="search">搜索</el-button>
  </div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="warning" @click="toAdd">添加</el-button></div></el-col>
</el-row>
            
        </div>
        <el-table :data="adCates" style="width:100%;"  border>
            <el-table-column fixed prop="id" label="序号" width="80" />
            <el-table-column prop="catName" label="类别名称"  width=""/>
            <el-table-column prop="createTime" label="创建时间" width="" />
            <el-table-column prop="showInNav" label="是否导航显示"  />
            <el-table-column prop="sortOrder" label="排序" width="" />
            <el-table-column fixed="right" label="操作" width="">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="类别信息编辑">
        <el-form :model="adCate">
            <el-form-item label="类别名称" :label-width="formLabelWidth">
                <el-input v-model="adCate.catName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="父id" :label-width="formLabelWidth">
                <el-input v-model="adCate.parentId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="显示导航" :label-width="formLabelWidth">
                <el-select v-model="adCate.showInNav" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </el-option>
  </el-select>
            </el-form-item>
            <el-form-item label="排序方式" :label-width="formLabelWidth">
                <el-select v-model="adCate.sortOrder" placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value1"
      :label="item.label1"
      :value="item.value1"
      :disabled="item.disabled">
    </el-option>
  </el-select>
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
            options: [{
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否',
        }],

        options1: [{
          value1: 0,
          label1: '升序'
        }, {
          value1: 1,
          label1: '降序',
          
        }],
        value:'',
        value1:'',
        input:'',
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            adCate:{
  "catName": "",
  "createTime": "",
  "deleted": 0,
  "id": 0,
  "parentId": 0,
  "showInNav": true,
  "sortOrder": 0,
  "updateTime": ""
},
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAdCatesPage()
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible=true;
            this.adCate=cloneDeep(adcate);    
        },
        getAdCatesPage() {
            adCatePage().then(res => {
                console.log(res);
                console.log(res.data.articleCats);
                this.adCates = res.data.articleCats;
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
                    console.log(res)
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
.cat_rig{
    height: 50px;
}
.title{
    height: 80px;
    margin: 0 auto;
}
.text{
    height: 70px;
    width:200px;
    margin: 0 auto;
}
</style>
