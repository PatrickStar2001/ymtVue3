//引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList = [
    "/",
    "/login"
]
import { useUserStore } from '../store/user'



import ymt from "../views/admin/ymtHomePage/ymtHomePage.vue"
import shcoolManage from "../views/admin/schoolManage/schoolManage.vue"
import departmentManage from "../views/admin/departmentManage/departmentManage.vue"
import classManage from "../views/admin/classManage/classManage.vue"
import studentManage from "../views/admin/studentManage/studentManage.vue"
import subjectManage from "../views/admin/subjectManage/subjectManage.vue"

//路由表
const routes = [
    {
        path: '/',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
        name: 'home', //命名路由
        component: Index,   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
    },
    {
        path: '/ymt',
        name: 'ymt',
        component: ymt,
        children: [
            {
                path: 'schoolManage',
                name: 'schoolManage',
                component: shcoolManage
            },
            {
                path: 'departmentManage',
                name: 'departmentManage',
                component: departmentManage
            },
            {
                path: 'classManage',
                name: 'classManage',
                component: classManage
            },
            {
                path: 'studentManage',
                name: 'studentManage',
                component: studentManage
            },
            {
                path: 'subjectManage',
                name: 'subjectManage',
                component: subjectManage
            },
        ]
    },
    {
        path: '/adcate',
        name: 'adCate',
        component: () => import('../views/static/adCate.vue')// 懒加载
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/static/login.vue')// 懒加载
    },
    {
        path: '/admin',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            {
                path: '',
                name: 'admin-index',
                component: () => import('@/views/admin/index.vue')
            },
            {
                path: '/classroom',
                name: 'classroom',
                component: () => import('../views/admin/classroom.vue') //懒加载 
            },
            {
                path: '/image',
                name: 'admin-image',
                component: () => import('../views/admin/image.vue')
            },
            {
                path: 'info',
                name: 'admin-info',
                component: () => import('@/views/admin/info.vue')
            },
            {
                path: 'logout',
                name: 'admin-logout',
                component: () => import('@/views/admin/logout.vue')
            }, {
                path: 'changepassword',
                name: 'admin-changepassword',
                component: () => import('@/views/admin/changepassword.vue')
            },
            {
                path: 'forgetpassword',
                name: 'admin-forgetpassword',
                component: () => import('@/views/admin/forgetpassword.vue')
            },
            {
                path: '/school',
                name: 'admin-school',
                component: () => import('@/views/admin/school.vue')
            },
            {
                path: '/userinfo',
                name: 'userinfo',
                component: () => import('../views/admin/userinfo.vue')
            },
            {
                path: '/interview_type', name: 'interview_type', component: () => import('../views/admin/interview_type.vue') //懒加载 
            },

        ]
    },
    {
        path: '/interview',
        name: 'interview',
        component: () => import('../views/admin/interview.vue')// 懒加载  
    },
    {
        path: '/student',
        name: 'student',
        component: () => import('../views/admin/student.vue')// 懒加载
    },
    {
        path: '/menu',
        name: 'menu',
        component: () => import('../views/static/menu.vue')// 懒加载
    },
    {
        path: '/department',
        name: 'department',
        component: () => import('@/views/admin/department.vue')// 懒加载
    },
    {
        path: '/major',
        name: 'admin-major',
        component: () => import('../views/admin/major.vue')
    },
    {
        path: '/pantent',
        name: 'pantent',
        component: () => import('../views/admin/pantent.vue')
    },
    {
        path: '/dormitory',
        name: 'admin-dormitory',
        component: () => import('../views/admin/dormitory.vue')
    },
    {
        path: '/role',
        name: 'role',
        component: () => import('@/views/static/role.vue')
    },
    {
        path: '/course',
        name: 'course',
        component: () => import('../views/static/course.vue') //懒加载 
    },
    {
        path: '/admingroup',
        name: 'admingroup',
        component: () => import('../views/static/admingroup.vue')// 懒加载
    },
    {
        path: '/config',
        name: 'config',
        component: () => import('@/views/static/config.vue')
    },
    {
        path: '/area',
        name: 'area',
        component: () => import('../views/static/area.vue')// 懒加载
    },

    {
        path: '/community',
        name: 'community',
        component: () => import('@/views/static/community.vue')
    },
    {
        path: '/memorabilia',
        name: 'memorabilia',
        component: () => import('../views/static/memorabilia.vue')
    },
    {
        path: '/copyright',
        name: 'copyright',
        component: () => import('../views/static/copyright.vue')
    },
    {
        path: '/paper',
        name: 'paper',
        component: () => import('../views/static/paper.vue')
    },
    {
        path: '/region',
        name: 'region',
        component: () => import('../views/static/region.vue')
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/static/teacher.vue')
    },
    {
        path: '/subject',
        name: 'subject',
        component: () => import('../views/static/subject.vue')
    },
    {
        path: '/rolePermission',
        name: 'rolePermission',
        component: () => import('@/views/static/rolePermission.vue')
    },
    {
        path: '/competition',
        name: 'competition',
        component: () => import('../views/static/competition.vue')
    },
    {
        path: '/classInfo',
        name: 'classInfo',
        component: () => import('../views/static/classInfo.vue')
    },
    {
        path: '/building',
        name: 'building',
        component: () => import('../views/static/building.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')// 懒加载  
    },
    {
        path: '/article_cat',
        name: 'article_cat',
        component: () => import('../views/static/article_cat.vue')
    },
    {
        path: '/permission',
        name: 'permission',
        component: () => import('../views/static/permission.vue')
    },
    {
        path: '/user_controller',
        name: 'user_controller',
        component: () => import('../views/static/user_controller.vue')
    },
]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (whiteList.includes(to.path)) {
        next();
    }
    else {

        next();
        // if(userStore.token&&userStore.token.length>0){
        //     next()
        // }
        // else{
        //    next({name:"login"}) 
        // }

    }


})
export default router;