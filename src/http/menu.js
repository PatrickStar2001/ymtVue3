import instance from "./axios";

const menuadd = (data) => {
  return instance.request({
    url: '/api/menu-rule/add',
    method: 'post',
    data,
  });
};

const menudel = (id) => {
  return instance.request({
    url: `/api/menu-rule/del/${id}`,
    method: 'get',
  });
};

const menuone = (id) => {
  return instance.request({
    url: `/api/menu-rule/one/${id}`,
    method: 'get',
  });
};

const menuedit = (data) => {
  return instance.request({
    url: '/api/menu-rule/edit',
    method: 'post',
    data,
  });
};

const menuepage = (data) => {
  return instance.request({
    url: '/api/menu-rule/page',
    method: 'post',
    data,
  });
};

export {
  menuepage,
  menuedit,
  menuone,
  menudel,
  menuadd
};
