import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Separator } from "@/shared/components/ui/separator";
import { SectionGeneral } from "@/shared/components/settings/SectionGeneral";
import { SectionProfile } from "@/shared/components/settings/SectionProfile";

import { Logout } from "@/actions/AuthAction";
import { GetProfileById } from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function SettingsPage() {
  const { user: context, signed } = useAuth();
  const idLoggedUser = context?._id;
  const { setSigned } = useAuth();
  const navigate = useNavigate();
  if (!signed) {
    return <div></div>;
  }

  const {
    response: profile,
    isSuccess,
    isLoading,
  } = GetProfileById(idLoggedUser ?? "");

  const handleLogout = () => {
    setSigned(false);
    Logout();
    navigate("/");
  };

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
                <SectionGeneral handleLogout={handleLogout} />
              </section>
            </CardContent>
          </Card>
        </div>
      )}
      {isLoading && <h1>Pending...</h1>}
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="w-full h-full text-purple-400 text-xl text-sans text-center font-semibold leading-none tracking-tight">
      {title}
    </h3>
  );
}
