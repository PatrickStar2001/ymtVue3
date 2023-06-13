//统一api管理
import instance from "./axios";
const getalltree=(data)=>{
  //返回Promise对象
 return instance.request({
      url:'/api/menu/tree', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
      method:'get',
      data,
})}
export {
  getalltree
}