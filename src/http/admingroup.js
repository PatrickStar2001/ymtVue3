import instance from "./axios";

const adminLogin = (data) => {
    return instance.request({
        url: '', 
        method: 'post',
        data
    })
}
const userLogin = (data) => {
    //返回Promise对象
    return instance.request({
        url: 'api/mobile/elogin', 
        method: 'post',
        data,

    })
}
const admingroupEdit = (data) => {
    return instance.request({
        url: '/api/admin-group/edit',
        method: 'post',
        data
    })
}
const admingroupAdd = (data) => {
    return instance.request({
        url: '/api/admin-group/add',
        method: 'post',
        data
    })
}
const admingroupOne = (params) => {
    return instance.request({
        url: '/api/admin-group/one',
        params
    })
}
const admingroupdelete = (params) => {
    return instance.request({
        url: '/api/admin-group/delete',
        method: 'post',
        params
    })
}
const admingroupgetArticleCatsByColums = (params) => {
    return instance.request({
        url: '/api/admin-group/colums',
        method: 'post',
        params
    })
}
const admingroupgall = (params) => {
    return instance.request({
        url: '/api/admin-group/all',
        method: 'post',
        params
    })
}

export {
    adminLogin,
    userLogin,
    admingroupEdit,
    admingroupAdd,
    admingroupOne,
    admingroupdelete,
    admingroupgetArticleCatsByColums,
    admingroupgall,
} 