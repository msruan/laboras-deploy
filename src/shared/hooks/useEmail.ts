export const useEmail = () => {
  const getToken = () => {
    const tokenString: string | null = sessionStorage.getItem("token");
    return tokenString;
  };

  const saveToken = (token: string) => {
    sessionStorage.setItem("token", token);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
  };

  return {
    email: getToken,
    setEmail: saveToken,
    removeEmail: removeToken,
  };
};
