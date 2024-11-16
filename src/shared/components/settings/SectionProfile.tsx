import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ProfileDetailed } from "@/shared/models/profile";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "../ui/button";

export function SectionProfile({ profile }: { profile: ProfileDetailed }) {
  return (
    <Tabs defaultValue="account" className="w-full mb-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="password">Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>
              Faça mudanças em sua conta aqui. Clique em Salvar quando acabar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                defaultValue={`${profile.full_name}`}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={profile.username} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={profile.email} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar mudanças</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Senha</CardTitle>
            <CardDescription>
              Troque sua senha aqui. Após salvar, você será deslogado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Senha atual</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Nova senha</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar senha</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
