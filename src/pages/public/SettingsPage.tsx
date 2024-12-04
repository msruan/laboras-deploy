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
import { Snowfall } from "react-snowfall";
import Neve from "react-snowfall";

export function SettingsPage() {
  const { user: profile } = useAuth();
  const { setSigned } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setSigned(false);
    Logout();
    navigate("/login");
  };

  const isDecember = new Date().getMonth() === 11;

  return (
    <div className="flex items-center justify-center pt-6">
      {isDecember && <Neve />}
      <Card className="w-full max-w-lg text-wrap bg-transparant">
        <CardHeader>
          <CardTitle
            id="beggin"
            className="text-2xl font-bold tracking-tighter text-center"
          >
            Configurações
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <section className="flex flex-col justify-between h-full gap-6 items-center">
            <SectionTitle title="Perfil" />
            <SectionProfile profile={profile!} />
          </section>
          <section className="flex flex-col justify-between h-full gap-4 w-full items-center">
            <SectionTitle title="Gerais" />
            <SectionGeneral handleLogout={handleLogout} />
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="w-full h-full text-purple-400 text-xl text-sans text-center font-semibold leading-none tracking-tight">
      {title}
    </h3>
  );
}
