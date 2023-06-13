import { post, get } from "../ymtIndex/ymtIndex"

const SCHOOL_BASE_URL = "subject/"

const add = (data) => {
    return post(SCHOOL_BASE_URL + 'add', data)
}


const edit = (data) => {
    return post(SCHOOL_BASE_URL + 'edit', data)
}

const one = (params) => {
    return get(SCHOOL_BASE_URL + 'one', params)
}

const page = (data) => {
    return post(SCHOOL_BASE_URL + 'page',data)
}


export {
    edit,  
    add,
    one,
    page
}