export const getToken = () =>
  localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;
