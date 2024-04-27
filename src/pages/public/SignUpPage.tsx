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
import { Link } from "react-router-dom";

export function SignUpPage() {
  return (
    <Card className="w-full max-w-md text-wrap ">
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
          {/**Todo: partir depois pra pegar o first name */}
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            placeholder="Digite seu nome completo"
            type="text"
          ></Input>
        </div>
        <div>
          {/**Todo: partir depois pra pegar o first name */}
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Digite seu nome de usuário"
            type="text"
          ></Input>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Digite seu melhor email"
            type="email"
          ></Input>
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            placeholder="Digite sua senha mais secreta"
            type="password"
          ></Input>
        </div>

        <Button className="mt-2">Entrar</Button>

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
