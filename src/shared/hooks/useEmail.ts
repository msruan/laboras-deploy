export const useEmail = () => {
  const getEmail = () => {
    const tokenString: string | null = sessionStorage.getItem("email");
    return tokenString;
  };

  const saveEmail = (token: string) => {
    sessionStorage.setItem("email", token);
  };

  const removeEmail = () => {
    sessionStorage.removeItem("email");
  };

  return {
    email: getEmail,
    setEmail: saveEmail,
    removeEmail: removeEmail,
  };
};
