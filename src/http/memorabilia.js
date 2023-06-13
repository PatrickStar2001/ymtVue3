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
const memorabiliaAdd=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/memorabilia/add',
        method:'post',
        data,
      
    })
}
const memorabiliaGetall=(params)=>{
   return instance.request({
        url:'api/memorabilia/all',
        params
   })
}
const getMemorabiliasByColums=(params)=>{
   return instance.request({
        url:'api/memorabilia/userMemorabilias',
        params
   })
}
const memorabiliaDel=(params)=>{
    return instance.request({
        url:'api/memorabilia/delete',
        params
    })
}
const memorabiliaEdit=(data)=>{
    return instance.request({
        url:'api/memorabilia/edit',
        method:'post',
        data
    })
}
const memorabiliaGetOne=(params)=>{
    return instance.request({
        url:'api/memorabilia/one',
        params
    })
}
const memorabiliaPage=(data)=>{
    return instance.request({
     url:'api/memorabilia/page',
     method:'post',
     data
    })
 }

export {
    userLogin,
    adminLogin,
    memorabiliaAdd,
    memorabiliaDel,
    memorabiliaEdit,
    memorabiliaGetOne,
    memorabiliaGetall,
    memorabiliaPage,
    getMemorabiliasByColums
} 