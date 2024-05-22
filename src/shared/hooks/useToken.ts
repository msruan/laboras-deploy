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

// export const useToken = () => {
//   const getToken = () => {
//     const tokenString: any = sessionStorage.getItem("token");
//     const userToken = JSON.parse(tokenString);
//     return userToken.tokens;
//   };

//   const saveToken = (userToken: { token: any }) => {
//     sessionStorage.setItem("token", JSON.stringify(userToken));
//   };

//   const removeToken = () => {
//     sessionStorage.removeItem("token");
//   };

//   return {
//     token: getToken,
//     setToken: saveToken,
//     removeToken,
//   };
// };
