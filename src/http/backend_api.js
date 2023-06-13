import { ElLoading } from 'element-plus'
import api from './axios.js'
import { useUserStore } from '../store/user.js'
const userStore = useUserStore() // 获取用户 store
const token = userStore.token // 获取 token
const headers = {
  Authorization: 'Bearer ' + token, // 添加 Authorization 头部字段
}

let loadingInstance // 定义加载实例

const showLoading = () => {
  // 创建加载实例并显示加载动画
  loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中...', // 可自定义加载提示文本
  })
}

const hideLoading = () => {
  // 关闭加载实例，隐藏加载动画
  if (loadingInstance) {
    loadingInstance.close()
  }
}

const requestWithLoading = async (config) => {
  showLoading() // 显示加载动画

  try {
    return await api.request(config) // 发起接口请求
  } finally {
    hideLoading() // 隐藏加载动画
  }
}

const addData = async (data) => {
  return await requestWithLoading({
    url: '/api/backendApi/add',
    method: 'post',
    headers,
    data,
  })
}

const getAllData = async () => {
  return await requestWithLoading({
    url: '/api/backendApi/all',
    method: 'get',
    headers,
  })
}

const editData = async (data) => {
  return await requestWithLoading({
    url: '/api/backendApi/edit',
    method: 'post',
    headers,
    data,
  })
}

const delData = async (id) => {
  return await requestWithLoading({
    url: '/api/backendApi/delete?id=' + id,
    method: 'get',
    headers,
  })
}

const getOneData = async (id) => {
  return await requestWithLoading({
    url: '/api/backendApi/one?id=' + id,
    method: 'get',
    headers,
  })
}

const getPageData = async (data) => {
  return await requestWithLoading({
    url: '/api/backendApi/page',
    method: 'post',
    headers,
    data,
  })
}

export default {
  addData,
  getAllData,
  editData,
  delData,
  getOneData,
  getPageData,
}
