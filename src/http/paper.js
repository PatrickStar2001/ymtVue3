//统一api管理
import instance from "./axios";
// data json
const paperAdd=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/paper/add',
        method:'post',
        data,
      
    })
}
const paperDel=(params)=>{
    return instance.request({
        url:'api/paper/delete',
        params
    })
}
const paperEdit=(data)=>{
    return instance.request({
        url:'api/paper/edit',
        method:'post',
        data
    })
}
const paperGetOne=(params)=>{
    return instance.request({
        url:'api/paper/one',
        params
    })
}
const paperPage=(data)=>{
    return instance.request({
     url:'api/paper/page',
     method:'post',
     data
    })
 }

export {
    paperAdd,
    paperDel,
    paperEdit,
    paperGetOne,
    paperPage
} 