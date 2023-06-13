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
const communityAdd=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/community/add',
        method:'post',
        data,
      
    })
}
const communityGetall=(params)=>{
   return instance.request({
        url:'api/community/all',
        params
   })
}
const getCommunitiesByColums=(params)=>{
   return instance.request({
        url:'api/community/colums',
        params
   })
}
const communityDel=(params)=>{
    return instance.request({
        url:'api/community/delete',
        params
    })
}
const communityEdit=(data)=>{
    return instance.request({
        url:'api/community/edit',
        method:'post',
        data
    })
}
const communityGetOne=(params)=>{
    return instance.request({
        url:'api/community/one',
        params
    })
}
const communityPage=(data)=>{
    return instance.request({
     url:'api/community/page',
     method:'post',
     data
    })
 }

export {
    userLogin,
    adminLogin,
    communityAdd,
    communityDel,
    communityEdit,
    communityGetOne,
    communityGetall,
    communityPage,
    getCommunitiesByColums
} 