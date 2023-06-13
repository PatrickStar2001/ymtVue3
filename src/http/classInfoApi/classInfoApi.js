import { post, get } from "../ymtIndex/ymtIndex"

const SCHOOL_BASE_URL = "classinfo/"

const add = (data) => {
    return post(SCHOOL_BASE_URL + 'add', data)
}
//根据专业Id获取专业下的班级
const getClassinfosForSelectByMajorId = (params) => {
    return get(SCHOOL_BASE_URL + 'getClassinfosForSelectByMajorId', params)
}

//根据学院id获取学院下的专业
const getMajorForSelectByDepartId = (params) => {
    return get("major/getMajorsForSelect/"+ params.departId)
}


//获取所有专业
const getAllMajor = () => {
    return get('major/all')
}

const del = (params) => {
    return get(SCHOOL_BASE_URL + 'delete/' + params.id)
}

const edit = (data) => {
    return post(SCHOOL_BASE_URL + 'edit', data)
}

const al = () => {
    return get(SCHOOL_BASE_URL + 'all')
}

const one = (params) => {
    return get(SCHOOL_BASE_URL + 'one/' + params.id)
}

export {
    al,
    edit,
    del,
    getAllMajor,
    getClassinfosForSelectByMajorId,
    add,
    one,
    getMajorForSelectByDepartId
}