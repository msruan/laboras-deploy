import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { SettingsTabs } from "./SettingsTabs"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"


export function SettingsMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DotsHorizontalIcon cursor="pointer" color="white" />
      </DialogTrigger>
      <DialogContent className="w-[425px] flex items-center justify-center h-[450px]">{/*Tava 425 sm:max-w-[425px] */}
        <SettingsTabs/>
      </DialogContent>
    </Dialog>
  )
}