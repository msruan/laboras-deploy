import { useLocation, useNavigate } from "react-router-dom";

import { useToken } from "./shared/hooks/useToken";
import { useEffect } from "react";

export default function Middleware() {
    const { token } = useToken();
    const local = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isOnAuthRoutes = local.pathname === "/signup" || local.pathname === "login";

        if (token() && isOnAuthRoutes) {
            navigate("/");
        }
        else if (!token() && !isOnAuthRoutes) {
            navigate("/login");
        }
    }, [])

    return (<></>)
}