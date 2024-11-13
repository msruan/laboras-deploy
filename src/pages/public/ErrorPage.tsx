import { Button } from "@/shared/components/ui/button";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { Link } from "react-router-dom";


export const ErrorPage = () => {
    return (
        <div className="h-screen items-center flex flex-col justify-center gap-10">

          
          <Card className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-6xl font-bold pt-10">PAGE NOT FOUND</h1>
            <div className="relative inline-block">
              <img width={600} src="src/assets/404.jpg"/>
              <Link to="/">
                <Button className="font-bold absolute top-1/2 left-1/2 transform -translate-x-72 translate-y-32 px-4 py-2 text-white cursor-pointer rounded-full">GO HOME</Button>
              </Link>
            </div>
              <h1 className="text-3xl pb-10">are you <strong>lost</strong> baby bunny?...but don't worry! <br /> they're are here to guide you</h1>
          </Card>
        </div>
    );
  };

export default ErrorPage