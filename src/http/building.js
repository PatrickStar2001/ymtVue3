//统一api管理
import instance from "./axios";
// data json

const getallbuilding=(data)=>{
    return instance.request({
     url:'api/building/all', //url=baseURL+url
     method:'post',
         data
    })
 }
 const buildingpage=(data)=>{
    return instance.request({
     url:'api/building/page', 
     method:'post',
         data
    })
 }
 const deletebuilding=(params)=>{
    return instance.request({
     url:'api/building/delete', //url=baseURL+url
        params
    })
 }
 const addbuilding=(data)=>{
    return instance.request({
     url:'api/building/add', //url=baseURL+url
         method:'post',
         data
    })
 }
 const editbuilding=(data)=>{
    return instance.request({
     url:'api/building/edit', //url=baseURL+url
         method:'post',
         data
    })
 }






export {
    
   buildingpage,
    getallbuilding,
    deletebuilding,
    addbuilding,
    editbuilding,

} 