import instance from "../axios";

const BASE_URL = "api/"

const post=(url,data)=>{
    return instance.request({
        url:BASE_URL + url,
        method:'post',
        data
    })
}



const get=(url,params)=>{
    return instance.request({
        url:BASE_URL + url,
        params
    })
}

export {
    post,
    get
}