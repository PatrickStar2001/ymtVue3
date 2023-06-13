import instance from "./axios";
const copyrightEdit=(data)=>{
    return instance.request({
        url:'api/copyright/edit',
        method:'post',
        data
    })
}
const copyrightAdd=(data)=>{
    return instance.request({
        url:'api/copyright/add',
        method:'post',
        data
    })
}
const copyrightOne=(params)=>{
    return instance.request({
        url:'api/copyright/one',
        params
    })
}
const copyrightPage=(data)=>{
    return instance.request({
        url:'api/copyright/page',
        method:'post',
        data
    })
}
export {
    copyrightEdit,
    copyrightAdd,
    copyrightOne,
    copyrightPage
} 