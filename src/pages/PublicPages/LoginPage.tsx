import { useRef, useState } from "react";
import style from "./Login.module.css";

export const LoginPage = () => {
  const [loginMode, setLoginMode] = useState(false);
  const loginButtonRef = useRef(null);

  function handleStartLogin() {
    setLoginMode(true);
    loginButtonRef.current.disabled = true;
  }

  return (
    <div className={style.container}>
      <header>
        <h1>LABORAS</h1>
      </header>
      <main>
        <button ref={loginButtonRef} onClick={handleStartLogin}>
          Login
        </button>
        <button>Criar conta</button>
      </main>
    </div>
  );
};
