import { useState, useRef } from "react";
import { Button } from "../@/components/ui/button";
import style from "./Login.module.css";
export function Login() {
  const [loginMode, setLoginMode] = useState(false);
  const loginButtonRef = useRef(null);

  return (
    <div className="bg-[#0F0B1C] min-h-screen ">
      <header className="border-2 w-full flex justify-center border-red-600">
        <h1 className="text-3xl text-white font-bold">LABORAS</h1>
      </header>

      <main className="min-h-full flex flex-col justify-center items-center   h-4/5 border-2 border-green-600 w-full">
        <button className="w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Login
        </button>
        <button className="w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Criar conta
        </button>
      </main>
    </div>
  );
}
