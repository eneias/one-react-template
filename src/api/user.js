import request from './request';

const userInfo = (data) => request({
  url: '/v1/user',
  method: 'get',
  data,
});



const updateUser = (data) => request({
  url: '/v1/user',
  method: 'post',
  data,
});

const deleteUser = (data) => request({
  url: '/v1/user',
  method: 'delete',
  data,
});

export default {
  userInfo,
  updateUser,
  deleteUser,
};
