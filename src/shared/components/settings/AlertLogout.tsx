import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";

export function AlertLogout({ handleLogout }: { handleLogout: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="flex justify-between w-full">
          Sair
          <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white font-sans text-2xl font-bold">
            Já vai?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esperamos vê-lo em breve! ʕ•́ᴥ•̀ʔっ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
