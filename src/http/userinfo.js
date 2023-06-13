/*
 * @Descripttion: 
 * @version: 6.6
 * @Author: 汪开林
 * @Date: 2023-05-23 21.56
 */
import instance from "./axios";
import request from "./axios"

//分页查询业务
const getUserinfosPage = (data) => {
   return instance.request({
      url: 'api/userinfo/page', //url=baseURL+url
      method: 'post',
      data
   })
}


//删除业务
const deleteById = (data) => {
   return instance.request({
      url: 'api/userinfo/delete',
      method: 'get',
      params: data
   })
}

//编辑业务
const updateById = (data) => {
   return instance.request({
      url:'api/userinfo/edit',
      method:'post',
      data
   })
}

//数据回显
const queryById = (data) => {
   return instance.request({
      url:'api/building/one',
      method:'get',
      params:data
   })
}

//添加业务
const addOne = (data) => {
   return instance.request({
      url:'api/userArticle/add',
      method:'post',
      data
   })
}
// 登录
const login = (data) => {
   return instance.request({
      url:'api/userinfo/login',
      method:'post',
      data
   })
}
// 注册
const register = (data) => {
   return instance.request({
      url:'api/userinfo/register',
      method:'post',
      data
   })
}
// 修改密码
const changePassword = (data) => {
   return instance.request({
      url:'api/userinfo/changpassword',
      method:'post',
      data
   })
}

//根据schoolid与usertype查询
const getAssitentFoSelectByUserTypeBySchoolId = (data) => {
   return instance.request({
       url:'api/userRole/getRoleIdsByUserId',
       method:'get',
       params:data
    })
}
//
const getCommunitiesByColums = (data) => {
   return instance.request({
       url:'api/userinfo/colums',
       method:'get',
       params:data
    })
}
//
const getBindStudentVosPage = (data) => {
   return instance.request({
       url:'api/userinfo/page/getBindStudentVos',
       method:'post',
       params:data
    })
}
//
const getBindTeacherVosPage = (data) => {
   return instance.request({
       url:'api/userinfo/page/getBindTeacherVos',
       method:'post',
       params:data
    })
}
const getSelectByOne = (data) => {
   return instance.request({
       url:'api/userinfo/one',
       method:'get',
       params:data
    })
}





export default {
   getUserinfosPage,
   deleteById,
   updateById,
   queryById,
   addOne,
   getBindTeacherVosPage,
   getBindStudentVosPage,
   getCommunitiesByColums,
   getAssitentFoSelectByUserTypeBySchoolId,
   changePassword,
   register,
   login,
   getSelectByOne

   
}