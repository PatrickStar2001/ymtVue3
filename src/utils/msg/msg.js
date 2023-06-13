import { ElMessage } from "element-plus";

const index = (msg, type,duration) => {
    ElMessage({
        showClose: true,
        message: msg,
        type: type,
        duration:duration || 1500
    })
}

const success = (msg,duration) => {
    index(msg, 'success',duration)
}

const fail = (msg,duration) => {
    index(msg, 'error',duration)
}

export {
    success,
    fail
}
