import { ModeToggle } from "./ModeToggle";
import { AlertLogout } from "./AlertLogout";
import { AlertDelete } from "./AlertDelete";

export function SectionGeneral({ handleLogout }: { handleLogout: () => void }) {
  return (
    <div className="w-full border border-t-purple-00 rounded-sm border-r-0 border-l-0 border-b-0">
      <ModeToggle />

      <AlertLogout handleLogout={handleLogout}></AlertLogout>
      <AlertDelete handleDelete={handleLogout}></AlertDelete>
    </div>
  );
}
