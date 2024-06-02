import { DeletePost } from "@/actions/PostAction";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/16/solid";
import { IPost } from "../../models/post";

type PostMenuProps = {
  post: IPost;
  handleEdit: (value: boolean) => void;
};

export function PostMenu({ post, handleEdit }: PostMenuProps) {
  const { mutate: handleDelete } = DeletePost();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisHorizontalIcon
          className="h-4 w-4 text-gray-500 hover:text-gray-100"
          cursor="pointer"
        ></EllipsisHorizontalIcon>
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              handleEdit(true);
            }}
          >
            Editar
            <DropdownMenuShortcut>
              <PencilIcon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-700"
            onClick={() => {
              handleDelete(post._id!);
            }}
          >
            Deletar
            <DropdownMenuShortcut>
              <TrashIcon className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
