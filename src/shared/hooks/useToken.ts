export const useToken = () => {
  const getToken = () => {
    const tokenString: string | null = sessionStorage.getItem("token");
    return tokenString;
  };

  const saveToken = (userToken: string) => {
    sessionStorage.setItem("token", userToken);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
  };

  return {
    token: getToken,
    setToken: saveToken,
    removeToken,
  };
};