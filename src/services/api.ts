import axios, { AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL as string | undefined;

const api = axios.create({
  baseURL,
});

const token = localStorage.getItem('token');

api.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${token}`
  return config;
})

/**
 * Refresh token com axios
 * https://www.schoolofnet.com/forum/topico/reactjs-como-implementar-refresh-token-12948
 * 
 * Gist
 * https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c
 */

async function refreshToken(error: any) {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');

      api
        .post('/refresh-token', { refresh_token })
        .then(async (res) => {
          localStorage.setItem(
            'token',
            res.data.token,
          );
          localStorage.setItem(
            'refresh_token',
            res.data.refreshToken.id,
          );
          // Fazer algo caso seja feito o refresh token
          return resolve(res);
        })
        .catch((err) => {
          // Fazer algo caso não seja feito o refresh token
          return reject(error);
        });
    } catch (err: any) {
      return reject(err);
    }
  });
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const refresh_token = localStorage.getItem('refresh_token');
    if (error.response.status === 401 && refresh_token) {
      const originalRequest = error.config;
      const response = await refreshToken(error) as AxiosResponse;

      originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;

      return axios(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
