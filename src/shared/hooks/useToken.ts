export const useToken = () => {
    const getToken = () => {
        const tokenString : any = sessionStorage.getItem('token')
          const userToken = JSON.parse(tokenString)
          return userToken.tokens
      }

    const saveToken = (userToken: { token: any }) => {
        sessionStorage.setItem('token', JSON.stringify(userToken)) 
    }

    const removeToken = () => {
        sessionStorage.removeItem('token')
    }

    return {
        token: getToken,
        setToken: saveToken,
        removeToken
    }
}
