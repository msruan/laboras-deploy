import { Login } from "@/actions/AuthAction";
import { useAuth } from "@/context/AuthContext";
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
import { ChangeEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Seo from "@/shared/components/Seo";
import { LoginRequest } from "@/shared/models/auth";

type CredentialsLogin = {
  username: string;
  password: string;
};

export function LoginPage() {
  const { Login, signed } = useAuth();

  const [isEntering, setIsEntering] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputValues, setInputValues] = useState<CredentialsLogin>({
    username: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value } as LoginRequest);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement> | null = null) => {
    if (e) {
      e.preventDefault();
    }
    // mutate(inputValues);
    setIsEntering(true);
    const { ok } = await Login(inputValues);
    if (!ok) {
      setIsError(true)
      setIsEntering(false);
    }
  };

  if (signed) {
    return <Navigate to="/" />;
  }

  const validarParametros = (): boolean => {
    return inputValues?.username !== "" && inputValues?.password !== "";
  };

  return (
    // <Helmet>
    // <title>vsf</title>
    <Card
      className="w-full max-w-md text-wrap"
      onKeyDown={(e) => {
        if (e.key === "Enter" && validarParametros()) {
          e.preventDefault();
          onSubmit();
        }
      }}
    >
      <Seo title="Laboras" />
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter">
          Entre por sua conta em risco
        </CardTitle>
        <CardDescription className="text-purple-300">
          Não possui conta ainda?{" "}
          <Link className="underline" to={"/signup"}>
            Criar nova conta
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            placeholder="Digite seu nome de usuário"
            type="text"
            name="username"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            placeholder="Digite sua melhor senha"
            type="password"
            name="password"
            onChange={handleOnChange}
          ></Input>
        </div>

        {isEntering ? (
          <Button className="mt-2" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </Button>
        ) : (
          <Button className="mt-2" onClick={onSubmit}>
            {isError ? "Tentar novamente?" : " Entrar"}
          </Button>
        )}
        {isError &&
          <span className="text-xs text-center">Falha durante o login.</span>
        }

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
    // </Helmet>
  );
}
