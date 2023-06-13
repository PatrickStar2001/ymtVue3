import instance from "./axios";
const roleGetall = (params) => {
  return instance.request({
    url: "api/rolePermission/all",
    params,
  });
};
const roleAdd = (data) => {
  //返回Promise对象
  return instance.request({
    url: "api/rolePermission/add",
    method: "post",
    data,
  });
};

const roleDel = (params) => {
  return instance.request({
    url: "api/rolePermission/delete",
    method: "get",
    params,
  });
};``
const roleEdit = (data) => {
  return instance.request({
    url: "api/rolePermission/edit",
    method: "post",
    data,
  });
};

export { roleGetall, roleAdd, roleDel, roleEdit };
