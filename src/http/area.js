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
const areaAdd=(data)=>{
    return instance.request({
        url:'api/area/add',
        method:'post',
        data
    })
}
const areaAll=(params)=>{
    return instance.request({
        url:'api/area/all',
        params
    })
}
const areaByColums=(params)=>{
    return instance.request({
        url:'api/area/colums',
        params
    })
}
const areaDelId=(params)=>{
    return instance.request({
        url:'api/area/delete',
        params
    })
}
const areaEdit=(data)=>{
    return instance.request({
        url:'api/area/edit',
        method:'post',
        data
    })
}
const areaOne=(data)=>{
    return instance.request({
        url:'api/area/one',
        method:'post',
        data
    })
}

// const isEven = n => n % 2 === 0;


export {
    userLogin,
    adminLogin,
    areaAdd,
    areaAll,
    areaByColums,
    areaDelId,
    areaEdit,
    areaOne 
} 