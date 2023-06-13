<template>
    <div class="big">
        <div class="up">

            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" mode="horizontal" :router="true">
                <el-menu-item index="/ymt/schoolManage">校园管理</el-menu-item>
                <el-menu-item index="/ymt/departmentManage">学院管理</el-menu-item>
                <el-menu-item index="/ymt/classManage">班级管理</el-menu-item>
                <el-menu-item index="/ymt/studentManage">学生管理</el-menu-item>
                <el-menu-item index="/ymt/subjectManage">科研管理</el-menu-item>
            </el-menu>
        </div>

        <div class="down">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/ymt/schoolManage'
        }
    },
    methods: {
    },
}
</script>
<style  scoped>
.up {
    width: 100%;
    height: 20%;
    
}

.down {
    width: 100%;
    height: 800%;
    overflow-y: auto;
}

.big {
    width: 100%;
    height: 100%;
    padding: 0px;
}
</style>
