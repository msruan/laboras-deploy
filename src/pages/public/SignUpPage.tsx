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
import { useState, ChangeEvent } from "react";

import { Link, Navigate } from "react-router-dom";

export function SignUpPage() {

  const {status, mutate : handleSignUp} = SignUp()

  const [inputValues, setInputValues] = useState({
    firstName: "",lastName:"",username: "", email: "", password: ""
   })

   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setInputValues({...inputValues, [name]: value})
   }

  const onSubmit = () => {
    handleSignUp(inputValues)
  }

  if(status == "success"){
    
  }

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
          <Label htmlFor="nome">First name</Label>
          <Input
            
            placeholder="Type your first name"
            type="text"
            name="firstName"
            onChange={handleOnChange}
          ></Input>
           <Label htmlFor="nome">Last name</Label>
          <Input
            
            placeholder="Type your last name"
            type="text"
            name="lastName"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          {/**Todo: partir depois pra pegar o first name */}
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Type your username"
            type="text"
            name="username"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Type your best email"
            type="email"
            name="email"
            onChange={handleOnChange}
          ></Input>
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            placeholder="Type your most discreet password"
            type="password"
            name="password"
            onChange={handleOnChange}
          ></Input>
        </div>

  
        <Button className="mt-2" onClick={()=>{handleSignUp(inputValues)}}>Sign Up</Button>

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
