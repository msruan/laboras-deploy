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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Separator } from "@/shared/components/ui/separator";
import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { ModeToggle } from "@/shared/components/settings/ModeToggle";
import { Logout } from "@/actions/AuthAction";
import { GetProfileById } from "@/actions/ProfileAction";
import { IProfile } from "@/shared/models/profile";
import { useContext } from "react";
import { useAuth } from "@/context/AuthContext";

export function SettingsPage() {
  const { user: context } = useAuth();
  const idLoggedUser = context?.id;

  const {
    response: profile,
    isSuccess,
    isLoading,
  } = GetProfileById(idLoggedUser ?? "");

  return (
    <>
      {isSuccess && (
        <div className="flex items-center justify-center pt-6">
          <Card className="w-full max-w-lg text-wrap bg-transparant">
            <CardHeader>
              <CardTitle
                id="beggin"
                className="text-2xl font-bold tracking-tighter text-center"
              >
                Settings
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              <section className="flex flex-col justify-between h-full gap-6 items-center">
                <SectionTitle title="Profile" />
                <SectionProfile profile={profile!} />
              </section>
              <section className="flex flex-col justify-between h-full gap-4 w-full items-center">
                <SectionTitle title="General" />
                <SectionGeneral />
              </section>
            </CardContent>
          </Card>
        </div>
      )}
      {isLoading && <h1>Pending...</h1>}
    </>
  );
}

function SectionGeneral() {
  return (
    <div className="w-full border border-t-purple-00 rounded-sm border-r-0 border-l-0 border-b-0">
      <ModeToggle />
      <Button
        onClick={Logout}
        variant="ghost"
        className="flex justify-between w-full"
      >
        Logout
        <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        className="flex justify-between w-full text-red-700"
      >
        Delete account
        <ArchiveBoxXMarkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
type SectionTitleProps = {
  title: string;
};
function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h3 className="w-full h-full text-purple-400 text-xl text-sans text-center font-semibold leading-none tracking-tight">
      {title}
    </h3>
  );
}
type SectionProfileProps = {
  profile: IProfile;
};
function SectionProfile({ profile }: SectionProfileProps) {
  return (
    <Tabs defaultValue="account" className="w-[400px] mb-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={`${profile.first_name} ${profile.last_name}`}
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
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
