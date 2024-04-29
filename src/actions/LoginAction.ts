
interface Credentials {
    username: string,
    password: string
}
export const Login = () => {
    const { setToken } = useToken()

    const {data: response,status,mutate} = useMutation("login", async (credentials: Credentials)) => {
        return await axios.post("http://localhost:3000/users", {
            username: credentials.username, password: credentials.password
        })
    }

    console.log(status)
    //todo: settoken caso seja sucesso
    
    return { status, mutate };
}
