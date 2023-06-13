import instance from "./axios";

const add = (data) => {
    return instance.request({
       url:'api/interview/add',
       method:'post',
       data
    })
 }

const remove = (data) => {
   return instance.request({
      url: 'api/interview/delete',
      method: 'get',
      params: data
   })
}

const update = (data) => {
   return instance.request({
      url:'api/interview/edit',
      method:'post',
      data
   })
}

const select = (data) => {
   return instance.request({
      url:'api/interview/one',
      method:'get',
      params:data
   })
}

const entire = () => {
    return instance.request({
       url:'api/interview/all',
       method:'get',
       
    })
 }

const getInterviewWithTypeByPage = (data) => {
    return instance.request({
        url:'api/interview/getInterviewWithTypeByPage',
        method:'post',
        data
     })
}

const getInterviewWithTypeByPageAndUser = (data) => {
    return instance.request({
        url:'api/interview/getInterviewWithTypeByPageAndUser',
        method:'post',
        data
     })
}

const getInterviewWithTypeNameVOById = (data) => {
    return instance.request({
        url:'api/interview/getInterviewWithTypeNameVOById',
        method:'get',
        data
     })
}

const getInterviewsPageByUserId = (data) => {
    return instance.request({
        url:'api/interview/getInterviewsPageByUserId',
        method:'post',
        data
     })
}

const colums = (data) => {
    return instance.request({
        url:'api/interview/colums',
        method:'get',
        data
     })
}

const getInterviewByUserId = (data) => {
    return instance.request({
        url:'api/interview/getInterviewByUserId',
        method:'get',
        data
     })
}


export default {
    add,
    remove,
    update,
    select,
    entire,
    getInterviewsPageByUserId,
    getInterviewWithTypeNameVOById,
    getInterviewWithTypeByPageAndUser,
    getInterviewWithTypeByPage,
    colums,
    getInterviewByUserId
 }


