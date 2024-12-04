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
import { Textarea } from "../ui/textarea";
import { UpdateProfile } from "@/actions/ProfileAction";
import { useInput } from "@/shared/hooks/useInput";
import useDebounce from "@/shared/hooks/useDebounce";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";

import { useNavigate } from "react-router-dom";
import { Logout } from "@/actions/AuthAction";
import { filterUndefinedOrEmptyStringProperties } from "@/shared/lib/utils";

export function SectionProfile({ profile }: { profile: ProfileDetailed }) {
  const { mutate: changeProfile, status: changeProfileStatus } =
    UpdateProfile();
  const { mutate: changePassword, status: changePasswordStatus } =
    UpdateProfile();

  const nameInput = useInput(profile.full_name);
  const bioInput = useInput(profile.bio);
  const avatarInput = useInput(profile.avatar_link);
  const previousPasswordInput = useInput("");
  const newPasswordInput = useInput("");
  const avatarLinkDebounced = useDebounce(avatarInput.value, 500);
  const { user, setSigned } = useAuth();
  const handleLogout = () => {
    setSigned(false);
    Logout();
    navigate("/login");
  };

  const navigate = useNavigate();

  if (changeProfileStatus === "success") {
    navigate(`/users/${user?.username}`);
  } else if (changePasswordStatus === "success") {
    handleLogout();
  }

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
              Clique em <i>Salvar mudanças</i> quando acabar.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" {...nameInput} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="bg-transparent"
                id="bio"
                placeholder="Conte ao mundo sobre você"
                {...bioInput}
              />
            </div>

            <div className="flex h-full w-full justify-between items-center">
              <div className="space-y-1 w-full">
                <Label htmlFor="name">Foto de perfil</Label>
                <Input id="name" placeholder="Seu avatar" {...avatarInput} />
              </div>

              <figure className="pl-4 flex h-full justify-center items-center">
                <Avatar className="w-16 h-16 rounded-full cursor-pointer flex items-center justify-center">
                  <AvatarImage src={avatarLinkDebounced} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </figure>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              onClick={() => {
                const changeBody = {
                  full_name: nameInput.value,
                  bio: bioInput.value,
                  avatar_link: avatarInput.value,
                };
                changeProfile({
                  ...filterUndefinedOrEmptyStringProperties(changeBody),
                  userId: user!.uid,
                });
              }}
            >
              Salvar mudanças
            </Button>
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
              <Input id="current" type="password" {...previousPasswordInput} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Nova senha</Label>
              <Input id="new" type="password" {...newPasswordInput} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() =>
                changePassword({
                  userId: user!.uid,
                  password: newPasswordInput.value,
                })
              }
            >
              Salvar senha
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
