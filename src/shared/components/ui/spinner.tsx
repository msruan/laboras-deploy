import { LoaderCircle } from 'lucide-react'

export default function Spinner(){
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoaderCircle className="animate-spin" color="#663399" />
      </div>
    );
}