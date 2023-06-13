import instance from "./axios";

// 页面page展示接口
const coursePage = (data) => {
    return instance.request({
        url: 'api/course/page',
        method: 'post',
        data
    })
}
// 增
const courseAdd = (data) => {
    return instance.request({
        url: 'api/course/add',
        method: 'post',
        data
    })
}
// 删
const courseDelId = (params) => {
    return instance.request({
        url: 'api/course/delete',
        params
    })
}
// 改
const courseEdit = (data) => {
    return instance.request({
        url: 'api/course/edit',
        method: 'post',
        data
    })
}
//1
const getbycolums = (params) => {
    return instance.request({
        url: 'api/course/colums',
        method: 'get',
        params
    })
}


export {
    coursePage,
    courseAdd,
    courseEdit,
    courseDelId,
    getbycolums
} 