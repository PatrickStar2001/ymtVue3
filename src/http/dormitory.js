import instance from "./axios";

const getPage = (data) => {
  return instance.request({
    url: 'api/major/page',
    method: 'post',
    data
  });
};

const add = (data) => {
  return instance.request({
    url: 'api/dormitory/add',
    method: 'post',
    data
  });
};

const remove = (data) => {
  return instance.request({
    url: 'api/dormitory/delete',
    method: 'get',
    params: data
  });
};

const update = (data) => {
  return instance.request({
    url: 'api/dormitory/edit',
    method: 'post',
    data
  });
};

const select = (data) => {
  return instance.request({
    url: 'api/dormitory/one',
    method: 'get',
    params: data
  });
};

const entire = () => {
  return instance.request({
    url: 'api/dormitory/all',
    method: 'get'
  });
};

export default {
  getPage,
  add,
  remove,
  update,
  select,
  entire
};

