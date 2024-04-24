import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardContent
} from "./../../shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
  return (

      <div className="flex flex-col">
        <h1>Profile Page</h1>
        <Link to="/posts">BACK TO TIMELINE</Link>
        <Card className="flex flex-row w-fit items-center gap-24 p-10">
          <div className="flex flex-col h-full w-fit items-center justify-center gap-5">
            <Avatar className="h-56 w-56">
              <AvatarImage src="https://i.pinimg.com/originals/b5/81/61/b58161c8a74b05c68eeefae22908ce35.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button className="w-16 bg-rebeccapurple hover:bg-violet-900 text-white rounded-xl">
              Seguir
            </Button>
          </div>

          <div className="flex flex-col w-fit gap-3">

            <CardTitle className="text-2xl font-bold tracking-tighter">
              bianca bezerra
            </CardTitle>

            <CardContent className="flex flex-col gap-6 p-0">

              <div className="flex flex-row w-fit gap-10 p-0">
                <p>300 publicações</p>
                <p>500 seguimores</p>
                <p>400 seguindo</p>
              </div>

              <div className="flex w-96 h-fit text-wrap">
                <p className="break-normal text-ellipsis">
                  Meiga e abusada, faço você se perder!
                  e quem foi que disse que eu estava apaixonada por você?
                  eu só quero saber!
                  linda e perfumada, ah, na tua mente!
                  faz o que quiser comigo na imaginação.
                  homem do teu tipo eu uso
                  mas se chega lá, eu digo não...
                </p>
              </div>

              <Button className="w-16 h-8 bg-slate-700 hover:bg-slate-800 text-white rounded-xl justify-self-center">
              Editar
              </Button>

            </CardContent>

            
          </div>
        </Card>
      </div>
  );
};

export default ProfilePage;
