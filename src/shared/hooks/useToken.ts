export const useToken = () => {
    const getToken = () => {
        const tokenString : any = sessionStorage.getItem('token')
          const userToken = JSON.parse(tokenString)
          return userToken.tokens
      }

    const saveToken = (userToken: { token: any }) => {
        sessionStorage.setItem('token', JSON.stringify(userToken)) 
    }

    return {
        token: getToken,
        setToken: saveToken
    }
}
