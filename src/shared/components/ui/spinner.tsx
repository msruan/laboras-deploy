import { Ban, LoaderCircle } from 'lucide-react'

type Props = {
  error?: boolean
}
export default function Spinner(props: Props) {

  const LoaderIcon = props.error ? Ban : LoaderCircle;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoaderIcon className="animate-spin" color="#663399" />
    </div>
  );
}