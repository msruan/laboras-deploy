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
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {

  const { mutate, status } = Login();
  const { token } = useToken();

  const [inputValues, setInputValues] = useState({
    username: '',password: ''
  })

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setInputValues({ ...inputValues, [name]: value })
  }

  const onSubmit = () => {
    mutate(inputValues)
  }
 
  return (
    <Card className="w-full max-w-md text-wrap">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter">
          Entre por sua conta em risco
        </CardTitle>
        <CardDescription className="text-purple-300">
          Não possui conta ainda? <Link className="underline" to={"/signup"}>Criar nova conta</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Login</Label>
          <Input
            id="email"
            placeholder="Digite seu e-mail ou nome de usuário"
            type="email"
            name="email"
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

        <Button className="mt-2" onClick={onSubmit}>Entrar</Button>

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