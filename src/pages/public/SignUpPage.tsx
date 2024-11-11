import { SignUp } from "@/actions/AuthAction";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, ChangeEvent } from "react";

import { Link, Navigate } from "react-router-dom";

export function SignUpPage() {
  const { status, mutate: handleSignUp } = SignUp();
  const [isEntering, setIsEntering] = useState(false);

  const [inputValues, setInputValues] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement> | null = null) => {
    e?.preventDefault();
    handleSignUp(inputValues);
    setIsEntering(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  if (status == "success") {
    return <Navigate to="/" />;
  }

  const validarParametros = (): boolean => {
    return (
      inputValues.full_name !== "" &&
      inputValues.username !== "" &&
      inputValues.email !== "" &&
      inputValues.password !== ""
    );
  };

  return (
    <Card
      className="w-full max-w-md text-wrap "
      onKeyDown={(e) => {
        if (e.key === "Enter" && validarParametros()) onSubmit();
      }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter">
          Cadastrar-se
        </CardTitle>
        <CardDescription className="text-purple-300">
          Já possui uma conta?{" "}
          <Link className="underline" to={"/"}>
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label htmlFor="full_name">Nome</Label>
          <Input
            placeholder="Type your full name"
            type="text"
            name="full_name"
            id="full_name"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          {/**Todo: partir depois pra pegar o first name */}
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="DIgite seu username"
            type="text"
            name="username"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Digite seu melhor email"
            type="email"
            name="email"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            placeholder="Digite sua senha mais discreta"
            type="password"
            name="password"
            onChange={handleOnChange}
          ></Input>
        </div>
        {isEntering ? (
          <Button className="mt-2" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Criando conta...
          </Button>
        ) : (
          <Button className="mt-2" onClick={onSubmit}>
            Criar conta
          </Button>
        )}

        {/* <div className="flex justify-center items-center gap-6 mt-2">
              <Separator></Separator>
              <span className="text-xs text-muted-foreground">OU</span>
              <Separator></Separator>
            </div>
            <Button variant="outline" className="mt-2">
              <GitHubLogoIcon className="mr-2" />
              Entrar com o GitHub
            </Button> */}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-center text-wrapp">
          Ao entrar em nossa plataforma, você concorda que roubemos todos os
          seus dados.
        </p>
      </CardFooter>
    </Card>
  );
}
