<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import {copyrightPage,copyrightAdd,copyrightOne,copyrightEdit } from "../../http/copyright"
onMounted(()=>{ getTableData() })
const tableData=ref([])
const search = ref(null)
const current_page = ref(1)
const total = ref(0)
const todo = ref(0)
const saveVisible = ref(false)
const saveDto=ref({id:null,name:'',userId:null,finishTime:'',publishTime:'',copyrightNo:'',attachment:''})
const pageinfo = ref({colums: [],current: 1,size: 10})
const title=computed(()=>todo.value===0?"新增":"修改")
const res=ref("")
const  getTableData=()=>{
    if(search.value===null){
        pageinfo.value.current=current_page.value
        copyrightPage(pageinfo.value).then(response => {
            if(response.success===true){
                tableData.value=response.data.page.records
                total.value=response.data.page.total
                changedate()
            }else ElMessage('发生错误!')
        }).catch(error => {
            console.log(error)
            ElMessage('发生错误!')
        })
    }else{
        copyrightOne({id:search.value}).then(response => {
            if(response.success===true){
                tableData.value=[]
                tableData.value[0]=response.data.copyright
                total.value=1
                changedate()
            }else ElMessage('发生错误!')
        }).catch(error => {
            console.log(error)
            ElMessage('发生错误!')
        })
    }  
}
const changedate=()=>{
    for(var i=0;i<tableData.value.length;i++){
        tableData.value[i].finishTime=tableData.value[i].finishTime.substring(0,10)
        tableData.value[i].publishTime=tableData.value[i].publishTime.substring(0,10)
    }
}
const handleEdit = (row) => {
  saveDto.value=JSON.parse(JSON.stringify(row))
  todo.value=1
  res.value=""
  saveVisible.value=true
}
const handleDelete = (row) => {}
const insertTableData= () => {
    saveDto.value={id:null,name:'',userId:null,finishTime:'',publishTime:'',copyrightNo:'',attachment:''}
    todo.value=0
    res.value=""
    saveVisible.value=true
}
const onOk=()=>{
    res.value=""
    if(saveDto.value.id===null||saveDto.value.id===""){res.value="编号不能为空!";return}
    if(saveDto.value.name===""){res.value="著作权名称不能为空!";return}
    if(saveDto.value.userId===null||saveDto.value.userId===""){res.value="著作权人编号不能为空!";return}
    if(saveDto.value.finishTime===""){res.value="完成时间不能为空!";return}
    if(saveDto.value.publishTime===""){res.value="首次发表时间不能为空!";return}
    if(saveDto.value.copyrightNo===""){res.value="著作权编号不能为空!";return}
    if(saveDto.value.attachment===""){res.value="佐证材料不能为空!";return}
    if(todo.value===0) insertData()
    else updateData()
}
const insertData=()=>{
    copyrightAdd(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
        }else ElMessage('发生错误!')
    }).catch(error => {
        console.log(error)
        ElMessage('发生错误!')
        res.value='添加数据发生错误!'
    })
}
const updateData=()=>{
    copyrightEdit(saveDto.value).then(response => {
        if(response.success===true){
            getTableData()
            saveVisible.value=false
        }else ElMessage('发生错误!')
    }).catch(error => {
        console.log(error)
        ElMessage('发生错误!')
        res.value='修改数据发生错误!'
    })
}
</script>
<template>
<div style="position: fixed;left: 180px;top: 65px;padding: 20px;border-radius: 5px;border-color: rgb(200, 200, 200);border-width: 1px;border-style:solid;">
<p style="margin-top: 0px;margin-left: 10px;font-weight: 600;color: #00000072;">著作权表</p>
<el-button @click="getTableData" type="primary" style="position: absolute;right: 120px;top: 17px;">刷新</el-button>
<el-button @click="insertTableData" type="success" style="float: right;margin-top: -40px;margin-left: -120px;">添加数据</el-button>
<el-table :data="tableData" :default-sort="{ prop: 'id', order: 'descending' }" border>
    <el-table-column label="编号" prop="id" width="80" sortable/>
    <el-table-column label="著作权名称" width="150">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>著作权名称: {{ scope.row.name }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="著作权编号" prop="copyrightNo" width="180" sortable/>
    <el-table-column label="著作权人编号" prop="userId" width="140" sortable/>
    <el-table-column label="完成时间" width="150" prop="finishTime" sortable>
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.finishTime }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="首次发表时间" width="150" prop="publishTime" sortable>
      <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.publishTime }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="佐证材料" prop="attachment" width="100"/>
    <el-table-column align="right" width="200">
      <template #header>
        <el-input-number :controls="false" v-model="search" size="small" placeholder="按编号查找" style="width: 100px;margin-right: 20px;"/>
        <el-button size="small" type="primary" @click="getTableData">搜索</el-button>
      </template>
      <template #default="scope">
        <el-button disabled size="small" @click="">查看</el-button>
        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button disabled size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="getTableData" style="float: right;margin-top: 20px;" :page-size="pageinfo.size" :pager-count="11" layout="prev, pager, next" v-model:total="total" v-model:current-page="current_page"/>
</div>
<el-dialog v-model="saveVisible" :title="title" width="30%">
    <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="编号" v-if="todo===0">
        <el-input type="number" v-model="saveDto.id" placeholder="请输入编号" clearable />
        </el-form-item>
        <el-form-item label="编号" v-else>
        <el-input type="number" disabled v-model="saveDto.id" placeholder="请输入编号"/>
        </el-form-item>
        <el-form-item label="著作权人编号">
        <el-input type="number" v-model="saveDto.userId" placeholder="请输入著作权人编号"/>
        </el-form-item>
        <el-form-item label="著作权名称">
        <el-input v-model="saveDto.name" placeholder="请输入著作权名称"/>
        </el-form-item>
        <el-form-item label="著作权编号">
        <el-input v-model="saveDto.copyrightNo" placeholder="请输入著作权编号"/>
        </el-form-item>
        <el-form-item label="佐证材料">
        <el-input v-model="saveDto.attachment" placeholder="请输入佐证材料"/>
        </el-form-item>
        <el-form-item label="完成时间">
        <el-date-picker value-format="YYYY-MM-DDT16:00:00.000Z" v-model="saveDto.finishTime" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="首次发表时间">
        <el-date-picker value-format="YYYY-MM-DDT16:00:00.000Z" v-model="saveDto.publishTime" type="date" placeholder="选择日期"/>
        </el-form-item>
    </el-form>
    <p style="float: left;margin-left: 100px;margin-top: 0px;margin-bottom: 0px;color: red;">{{res}}</p>
    <template #footer>
      <span>
        <el-button @click="()=>{saveVisible=false}">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
</el-dialog>
</template>
<style scoped>
</style>