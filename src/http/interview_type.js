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

const adtypePage=(data)=>{
   return instance.request({
    url:'api/interviewType/all',
    method:'get',
    data
   })
}
const adtypeDelId=(params)=>{
    return instance.request({
        url:'api/interviewType/delete',
        params
    })
}
const adtypeAdd=(data)=>{
    return instance.request({
        url:'/api/interviewType/add',
        method:'post',
        data
    })
}
const adtypeEdit=(data)=>{
    return instance.request({
        url:'api/interviewType/edit',
        method:'post',
        data
    })
}

// const isEven = n => n % 2 === 0;


export {
    userLogin,
    adminLogin,
    adtypePage,
    adtypeDelId,
    adtypeAdd,
    adtypeEdit,
} 