const setAuthTokenInterceptor = (token) => {
  return (url, config) => {
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
};

export default setAuthTokenInterceptor;
