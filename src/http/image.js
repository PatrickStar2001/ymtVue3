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
const adminLogin = function(data) {
  return instance.request({
    url: '', 
    method: 'post',
    data
  });
};

//增加业务
const addimage = (data) => {
    return instance.request({
      url: "api/image/add",
      method: "post",
      data,
    });
  };

//查询业务
const getAllimage = () => {
  return instance.request({
    url: "api/image/all",
    method: "get",
  });
};



//删除业务
const deleteimage = (params) => {
  return instance.request({
    url: "api/image/delete",
    method: "get",
    params
  });
};

//编辑业务
const editimage = (data) => {
  return instance.request({
    url: "api/image/edit",
    method: "post",
    data
  });
};

//回显业务
const getOneimage = (id) => {
  return instance.request({
    url: "api/image/one",
    method: "get",
    params: {
      id: id,
    },
  });
};

//分页业务
const imagePage=(data)=>{
    return instance.request({
     url:'api/image/page',
     method:'post',
     data
    });
};



export {
  userLogin,
  adminLogin,
  addimage,
  getAllimage,
  deleteimage,
  editimage,
  getOneimage,
  imagePage
};