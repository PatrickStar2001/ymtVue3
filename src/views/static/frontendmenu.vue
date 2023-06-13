<template>
    <el-scrollbar>
      <el-aside  position="fixed" width="20%">
      <!--侧边栏区域-->
      <el-menu  background-color="#333744" text-color="#fff" active-text-color="#409EFF" router :default-active="statepath" 
      unique-opened>
      <!--一级菜单-->
     <el-sub-menu :index="item.id+''" v-for="item in menulist" :key="item.id" :style="{ height: sidebarHeight }">
      <!--一级菜单区域模板-->
            <template #title>
              <!--图标-->
              <el-icon><Grid /></el-icon>
              <!--文本-->
              <span>{{item.menuName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item  :index="item1.menuUrl+''" v-for="item1 in item.children" :key="item1.id" @click="save('/'+item1.menuUrl)">
              <!--二级菜单模板区域-->
              <template #title>
              <!--图标-->
              <el-icon><Position/></el-icon>
              <!--文本-->
              <span>{{item1.menuName}}</span>
            </template>
              </el-menu-item>  
  </el-sub-menu>
  </el-menu>
</el-aside>
  </el-scrollbar>
</template>
<script>
import { defineComponent } from "vue"
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { getalltree} from "../../http/frontend";
export default defineComponent({
  data(){
    return{
     //左侧菜单数据列表
     menulist:[],
     // 侧边栏高度
      //菜单栏激活状态
      statepath:'',
  }},
    created(){
     this.getmenulist();
     this.statepath=window.sessionStorage.getItem('statepath');
    },
    methods :{
    getmenulist(){
      const data=[]
      getalltree(data).then( res =>{
              this.menulist=res.data.secondLevelMenuVos
              console.log(this.menulist)
            }).catch(err => {
                console.log(err);})  },
    //点击二级菜单切换高亮方法
    savesate(statepath){
      window.sessionStorage.setItem('statepath',statepath);
      this.statepath=statepath;
    },}})
</script>
<style scoped>
 .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
 .toolbar{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
span{
  font-size: 19px;
}
</style>