import { useState, useRef } from "react";
// import style from './Login.module.css'
export function Login() {
  const [loginMode, setLoginMode] = useState(false);
  const loginButtonRef = useRef(null);

  function handleStartLogin() {
    setLoginMode(true);
    // loginButtonRef.current.disabled = true;
  }

  return (
    <div className="border-gray-900 border-8">
      <header>
        <h1 className="text-3xl font-bold underline">LABORAS</h1>
      </header>
      <main>
        <button ref={loginButtonRef} onClick={handleStartLogin}>
          Login
        </button>
        <button>Criar conta</button>
      </main>
    </div>
  );
}
