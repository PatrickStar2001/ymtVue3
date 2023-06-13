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
const perPage=(data)=>{
   return instance.request({
    url:'api/permission/page',
    method:'post',
    data
   })
}
const perDelId=(params)=>{
    return instance.request({
        url:'api/permission/delete',
        params
    })
}
const perAdd=(data)=>{
    return instance.request({
        url:'api/permission/add',
        method:'post',
        data
    })
}
const perEdit=(data)=>{
    return instance.request({
        url:'api/permission/edit',
        method:'post',
        data
    })
}

const Search = (params) => {
    return instance.request({
      url: 'api/permission/one',
      method: 'get',
      params
    })
  }



// const isEven = n => n % 2 === 0;


export {
    userLogin,
    adminLogin,
    perPage,
    perDelId,
    perAdd,
    perEdit,
    Search
} 