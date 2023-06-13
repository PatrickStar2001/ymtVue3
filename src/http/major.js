import instance from "./axios";

const request = (config) => {
   return instance.request(config);
}

const api = {
   getMajorByPage: (data) => {
      return request({
         url: 'api/major/page',
         method: 'post',
         data
      });
   },
   deleteById: (data) => {
      return request({
         url: 'api/major/delete',
         method: 'get',
         params: data
      });
   },
   updateById: (data) => {
      return request({
         url: 'api/major/edit',
         method: 'post',
         data
      });
   },
   queryById: (data) => {
      return request({
         url: 'api/major/one',
         method: 'get',
         params: data
      });
   },
   addOne: (data) => {
      return request({
         url: 'api/major/add',
         method: 'post',
         data
      });
   },
   getMajorForSelectByDepartId: (data) => {
      return request({
         url: 'api/major/getMajorForSelectByDepartId',
         method: 'get',
         params: data
      });
   },
   getMajorsForSelectBySchoolId: (data) => {
      return request({
         url: 'api/major/getMajorsForSelectBySchoolId',
         method: 'get',
         params: data
      });
   },
   getMajorsForSelectByDepart: (data) => {
      return request({
         url: 'api/major/getMajorsForSelectByDepart',
         method: 'get',
         params: data
      });
   },
   getColumns: (data) => {
      return request({
         url: 'api/major/colums',
         method: 'get',
         params: data
      });
   },
   getAll: () => {
      return request({
         url: 'api/major/all',
         method: 'get'
      });
   }
};

export default api;
