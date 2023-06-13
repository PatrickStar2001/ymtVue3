//统一api管理
import instance from "./axios";
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/subject/add', //fullpath=baseURL+url  http://api.jqrjq.cn//api/subject/add
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const dataAdd=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/subject/add',
        method:'post',
        data,
      
    })
}
const dataGetall=(params)=>{
   return instance.request({
        url:'api/subject/all',
        params
   })
}
const getCommunitiesByColums=(params)=>{
   return instance.request({
        url:'api/subject/colums',
        params
   })
}
const dataDel=(params)=>{
    return instance.request({
        url:'api/subject/delete',
        params
    })
}
const dataEdit=(data)=>{
    return instance.request({
        url:'api/subject/edit',
        method:'post',
        data
    })
}
const dataGetOne=(params)=>{
    return instance.request({
        url:'api/subject/one',
        params
    })
}
const dataPage=(data)=>{
    return instance.request({
     url:'api/subject/page',
     method:'post',
     data
    })
 }

export {
    userLogin,
    adminLogin,
    dataAdd,
    dataDel,
    dataEdit,
    dataGetOne,
    dataGetall,
    dataPage,
    getCommunitiesByColums
} 