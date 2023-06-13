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
const competitionAdd=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/competition/add',
        method:'post',
        data,
      
    })
}
const competitionGetall=(params)=>{
   return instance.request({
        url:'api/competition/all',
        params
   })
}
const getcompetitionsByColums=(params)=>{
   return instance.request({
        url:'api/competition/colums',
        params
   })
}
const competitionDel=(params)=>{
    return instance.request({
        url:'api/competition/delete',
        params
    })
}
const competitionEdit=(data)=>{
    return instance.request({
        url:'api/competition/edit',
        method:'post',
        data
    })
}
const competitionGetOne=(params)=>{
    return instance.request({
        url:'api/competition/one',
        params
    })
}
const competitionPage=(data)=>{
    return instance.request({
     url:'api/competition/page',
     method:'post',
     data
    })
 }

export {
    userLogin,
    adminLogin,
    competitionAdd,
    competitionDel,
    competitionEdit,
    competitionGetOne,
    competitionGetall,
    competitionPage,
    getcompetitionsByColums
} 