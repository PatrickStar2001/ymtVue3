import instance from "./axios";

// 用户登录接口
const userLogin = (data) => {
  return instance.request({
    url: 'api/mobile/elogin',
    method: 'post',
    data,
    headers: {}
  });
};

// 管理员登录接口
const adminLogin2 = function(data) {
  return instance.request({
    url: '', // 添加实际的URL
    method: 'post',
    data
  });
};

// 添加教室接口
const addClassroom = (data) => {
  return instance.request({
    url: "api/classroom/add",
    method: "post",
    data,
  });
};

// 获取所有教室接口
const getAllClassrooms = () => {
  return instance.request({
    url: "api/classroom/all",
    method: "get",
  });
};

// 删除教室接口
const deleteClassroom = (params) => {
  return instance.request({
    url: "api/classroom/delete",
    method: "get",
    params
  });
};

// 编辑教室接口
const editClassroom = (data) => {
  return instance.request({
    url: "api/classroom/edit",
    method: "post",
    data
  });
};

// 获取单个教室接口
const getOneClassroom = (id) => {
  return instance.request({
    url: "api/classroom/one",
    method: "get",
    params: {
      id: id,
    },
  });
};


// 获取所有建筑接口
const getAllBuilding = () => {
  return instance.request({
    url: "api/building/all",
    method: "get",
  });
};

// 获取所有学校接口
const getAllSchool = () => {
  return instance.request({
    url: "api/school/all",
    method: "get",
  });
};


export {
  userLogin,
  adminLogin2,
  addClassroom,
  getAllClassrooms,
  deleteClassroom,
  editClassroom,
  getOneClassroom,
  getAllBuilding,
  getAllSchool,
};