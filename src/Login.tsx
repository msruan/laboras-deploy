import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Autoplay from "embla-carousel-autoplay";

import img1 from "./assets/img1.svg";
import img2 from "./assets/img2.svg";
import img3 from "./assets/img3.svg";
import img4 from "./assets/img4.svg";

type LoginCarouselItemProps = {
  img: string;
};
function LoginCarouselItem({ img }: LoginCarouselItemProps) {
  return (
    <CarouselItem>
      <div className="flex aspect-square bg-background rounded p-8">
        <img src={img} alt="" />
      </div>
    </CarouselItem>
  );
}

export function Login() {
  // const [loginMode, setLoginMode] = useState(false);
  // const loginButtonRef = useRef(null);

  // function handleStartLogin() {
  //   setLoginMode(true);
  //   // loginButtonRef.current.disabled = true;
  // }

  return (
    <main className=" h-screen  flex justify-center items-center  w-full">
      <div className="bg-primary-foreground w-full h-full flex justify-center items-center p-16">
        <Carousel
          className="w-full max-w-xl"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            <LoginCarouselItem img={img1} />
            <LoginCarouselItem img={img2} />
            <LoginCarouselItem img={img3} />
            <LoginCarouselItem img={img4} />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> */}
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Entre por sua conta em risco
            </CardTitle>
            <CardDescription>Use a senha boco</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Digite seu email"
                type="email"
              ></Input>
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                placeholder="Digite sua senha"
                type="password"
              ></Input>
            </div>

            <Button className="mt-2">Entrar</Button>
            <div className="flex justify-center items-center gap-6 mt-2">
              <Separator></Separator>
              <span className="text-xs text-muted-foreground">OU</span>
              <Separator></Separator>
            </div>
            <Button variant="outline" className="mt-2">
              <GitHubLogoIcon className="mr-2" />
              Entrar com o GitHub
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center text-wrapp">
              Ao entrar em nossa plataforma, você concorda que roubemos todos os
              seus dados.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
