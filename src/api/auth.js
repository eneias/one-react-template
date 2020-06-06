import request from './request';

const login = (data) => request({
  url: '/login',
  method: 'post',
  data,
});

const register = (data) => request({
  url: '/register',
  method: 'post',
  data,
});

const logout = () => request({
  url: '/logout',
  method: 'post',
});

export default {
  login,
  logout,
  register,
};
