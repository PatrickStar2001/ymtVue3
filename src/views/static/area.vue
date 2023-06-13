<template>
    <div class="areas">
        <div class="area-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="areas" style="width: 100%">
            <!-- <el-table-column fixed prop="id" label="#" width="120" />
            <el-table-column prop="name" label="类型" />
            <el-table-column prop="width" label="宽度" width="120" />
            <el-table-column prop="height" label="高度" width="120" /> -->
            <el-table-column fixed prop="id" label="ID" width="80" />
            <el-table-column prop="pid" label="父id" width="120" />
            <el-table-column prop="shortname" label="简称" width="120" />
            <el-table-column prop="name" label="名称" width="120" />
            <el-table-column prop="mergename" label="全称" width="120" />
            <el-table-column prop="level" label="层级" width="120" />
            <el-table-column prop="pinyin" label="拼音" width="120" />
            <el-table-column prop="code" label="长途区号" width="120" />
            <el-table-column prop="zip" label="邮编" width="120" />
            <el-table-column prop="first" label="首字母" width="120" />
            <el-table-column prop="lng" label="经度" width="120" />
            <el-table-column prop="lat" label="纬度" width="120" />

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, allr, next" :all-size="all.size" :total="all.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="添加">
        <el-form :model="area">
            <!-- <el-form-item label="广告类型" :label-width="formLabelWidth">
                <el-input v-model="adCate.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="width" :label-width="formLabelWidth">
                <el-input v-model="adCate.width" autocomplete="off" />
            </el-form-item>
            <el-form-item label="height" :label-width="formLabelWidth">
                <el-input v-model="adCate.height" autocomplete="off" />
            </el-form-item> -->

            <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="area.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="父id" :label-width="formLabelWidth">
                <el-input v-model="area.pid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="简称" :label-width="formLabelWidth">
                <el-input v-model="area.shortname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="area.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="全称" :label-width="formLabelWidth">
                <el-input v-model="area.mergename" autocomplete="off" />
            </el-form-item>
            <el-form-item label="层级" :label-width="formLabelWidth">
                <el-input v-model="area.level" autocomplete="off" />
            </el-form-item>
            <el-form-item label="拼音" :label-width="formLabelWidth">
                <el-input v-model="area.pinyin" autocomplete="off" />
            </el-form-item>
            <el-form-item label="长途区号" :label-width="formLabelWidth">
                <el-input v-model="area.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮编" :label-width="formLabelWidth">
                <el-input v-model="area.zip" autocomplete="off" />
            </el-form-item>
            <el-form-item label="首字母" :label-width="formLabelWidth">
                <el-input v-model="area.first" autocomplete="off" />
            </el-form-item>
            <el-form-item label="经度" :label-width="formLabelWidth">
                <el-input v-model="area.lng" autocomplete="off" />
            </el-form-item>
            <el-form-item label="纬度" :label-width="formLabelWidth">
                <el-input v-model="area.lat" autocomplete="off" />
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
import { 
    //areaPage, 
    areaAll,
    areaDelId, 
    areaAdd, 
    areaEdit } from "../../http/area";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            areas: [],
            all: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            area: {
                // "height": "",
                // "id": 0,//标志点 0添加 >0 更新
                // "name": "",
                // "width": ""

                "id": 0,//0,//标志点 0添加 >0 更新
                "pid": "",
                "shortname": "",
                "name": "",
                "mergename": "",
                "level": "",
                "pinyin": "",
                "code": "",
                "zip": "",
                "first": "",
                "lng": "",
                "lat": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAreasAll(1)//getAreasPage
    },
    methods: {
        toEdit(area) {
            console.log(area);
            this.dialogFormVisible=true;
            this.area=cloneDeep(area);    
        },
        getAreasAll(current) {
          
            areaAll().then(res => {
                console.log(res);
                const all = res.data.areas;
                this.areas = all;
                
                
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAreasAll(current);
            this.all.current = current;//数据更新目前显示的页面
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
            areaDelId(params).then(res => {
                if (res.success) {
                    this.getAreasAll(this.all.current)
                    // //当前分页数据只剩一条时删除返回上一页
                    // if (this.page.total % this.page.size == 1)
                    //     this.getAdCatesPage(this.page.current - 1)
                    // else {
                    //     this.getAdCatesPage(this.page.current)
                    // }
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
            this.area = {  
                "id": 0,//0,//标志点 0添加 >0 更新
                "pid": "",
                "shortname": "",
                "name": "",
                "mergename": "",
                "level": "",
                "pinyin": "",
                "code": "",
                "zip": "",
                "first": "",
                "lng": "",
                "lat": ""
            };
        },
        save() {
            const area = this.area;
            if (area.id == 0) {
                areaAdd(area).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAreasAll(this.all.current)
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
                areaEdit(area).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAreasAll(this.all.current)
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
