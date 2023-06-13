import instance from "./axios";
// 资源分类请求接口封装
const getRolesPage = (data) => {
    return instance.request({
        url: '/api/role/page',
        method: 'POST',
        data
    })
}

const getOne = (params) =>{
    return instance.request({
        url:'/api/role/one',
        method:'GET',
        data
    })
}

const add = (data) =>{
    return instance.request({
        url:'/api/role/add',
        method:'POST',
        data
    })
}

const del = (params) =>{
    return instance.request({
        url:'/api/role/delete',
        method:'GET',
        params
    })
}

const edit = (data) => {
    return instance.request({
        url: '/api/role/edit',
        method: 'POST',
        data
    })
}

const getAll = (data) => {
    return instance.request({
        url: 'api/role/all',
        method:'get',
        data
    })
}
const getRolesByColums =(data)=>{
    return instance.request({
        url: 'api/role/colums',
        method:'GET',
        data
    })
}
export{
    getRolesPage,
    getAll,
    getOne,
    edit,
    add,
    del,
    getRolesByColums
}