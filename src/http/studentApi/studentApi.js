import { post, get } from "../ymtIndex/ymtIndex"

const SCHOOL_BASE_URL = "student/"

const add = (data) => {
    return post(SCHOOL_BASE_URL + 'add', data)
}

const getStudentByStudentName = (params) => {
    return get(SCHOOL_BASE_URL + 'name', params)
}

const del = (params) => {
    return get(SCHOOL_BASE_URL + 'delete', params)
}

const edit = (data) => {
    return post(SCHOOL_BASE_URL + 'edit', data)
}

const al = () => {
    return get(SCHOOL_BASE_URL + 'all')
}

const one = (params) => {
    return get(SCHOOL_BASE_URL + 'one', params)
}

const allSchool = () =>{
    return get('school/all')
}

export {
    al,
    edit,
    del,
    getStudentByStudentName,
    add,
    one,
    allSchool
}