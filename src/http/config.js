//统一api管理
import instance from "./axios";
// data json
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
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
const configAdd=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/config/add',
        method:'post',
        data,
      
    })
}
const configDel=(params)=>{
    return instance.request({
        url:'api/config/delete',
        params
    })
}
const configEdit=(data)=>{
    return instance.request({
        url:'api/config/edit',
        method:'post',
        data
    })
}
const configGetOne=(params)=>{
    return instance.request({
        url:'api/config/one',
        params
    })
}
const configPage=(data)=>{
    return instance.request({
     url:'api/config/page',
     method:'post',
     data
    })
 }

export {
    userLogin,
    adminLogin,
    configAdd,
    configDel,
    configEdit,
    configGetOne,
    configPage
} 