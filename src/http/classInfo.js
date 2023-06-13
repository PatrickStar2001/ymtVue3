import instance from "./axios";
const edit=(data)=>{
    return instance.request({
    url:'/api/classinfo/edit',
    method:'post',
    data
})
}
const add=(data)=>{
    return instance.request({
    url:'/api/classinfo/add',
    method:'post',
    data
})
}
const all=(data)=>{
    return instance.request({
    url:'/api/classinfo/all',
    method:'get',
    data
})
}
const delInfo=(params)=>{
    return instance.request({
    url:'/api/classinfo/delete',
    method:'get',
    params
})
}
const getClassinfoBySchoolAndDepartAndMajo=(data)=>{
    return instance.request({
    url:'/api/classinfo/getClassinfoBySchoolAndDepartAndMajor',
    method:'post',
    data
})
}

const getClassinfosForSelectByMajorId=(data)=>{
    return instance.request({
    url:'/api/classinfo/getClassinfosForSelectByMajorId',
    method:'get',
    data
})
}
const getOne=(data)=>{
    return instance.request({
    url:'/api/classinfo/one',
    method:'get',
    data
})
}
const page=(data)=>{
    return instance.request({
    url:'/api/classinfo/page',
    method:'post',
    data
})
}
const school=(data)=>{
    return instance.request({
    url:'/api/classinfo/page/school',
    method:'post',
    data
})
}

export{
    edit,
    add,
    all,
    delInfo,
    getClassinfoBySchoolAndDepartAndMajo,
    getClassinfosForSelectByMajorId,
    getOne,
    page,
    school
}