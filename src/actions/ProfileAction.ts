export const getLoggedId = (): string => {
  return sessionStorage.getItem("idLoggedUser") ?? "";
};
