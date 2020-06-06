import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    timeout: 20000,
    baseURL: 'http://localhost:3333',
})





// import { Message } from 'element-ui';
// import store from '@/store';

// service.interceptors.response.use(
//   (response) => {
//     const res = response.data;
//     if (res.code !== 200) {
//       // Message({
//       //   message: res.message || 'Error',
//       //   type: 'error',
//       //   duration: 5 * 1000,
//       // });
//       return Promise.reject(new Error(res.message || 'Error'));
//     }
//     return res;
//   },
//   (error) => {
//     // if (error.response.status === 401) {
//       // store.dispatch('user/expired').then(() => {
//       //   window.location.reload();
//       // });
//     // } else {
//       // Message({
//       //   message: error.response.data.message,
//       //   type: 'error',
//       //   duration: 5 * 1000,
//       // });
//     // }
//
//     return Promise.reject(error);
//   },
// );

export default instance;
