import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== "/auth/login" &&
      originalConfig.url !== "/auth/logout" &&
      err.response
    ) {
      // Access Token was expired

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await axios.post(
            originalConfig.baseURL + "/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          return instance(originalConfig);
        } catch (_error) {
          console.log("refresh failed");
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
