// import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import style from "./textbox.module.css";
import { ulid } from "ulidx";
import { IPost } from "../models/post";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CreatePost } from "@/actions/PostAction";

type TextBoxProps = {
  idLoggedUser: string;
  linkedTo: string | null;
};
export const TextBox = ({ idLoggedUser, linkedTo = null }: TextBoxProps) => {
  const input = useRef<HTMLTextAreaElement>(null);

  function handleClick() {
    if (input.current == null || input.current.value === "") {
      return;
    }

    const newPost: IPost = {
      id: ulid(),
      user_id: idLoggedUser,
      content: input.current.value,
      created_at: `${new Date().toISOString()}`,
      likes: 0,
      deslikes: 0,
      linked_to: linkedTo,
    };

    addNewPost(newPost);
    input.current.value = "";
  }

  const { mutate: addNewPost } = CreatePost();

  return (
    <div>
      <div className="flex flex-col w-full align-middle pb-10 border-b-2  pl-3 pr-3 border-rebeccapurple2">
        <div className="w-full flex flex-row gap-8 items-center">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage src="src/assets/chorro-timido.JPG" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <textarea
            onKeyDown={(e) => {
              e.key == "Enter" && handleClick();
            }}
            ref={input}
            className="bg-transparent py-5 w-full content-center border-none text-white outline-none resize-none"
            name="text"
            maxLength={400}
            placeholder="No que voce está pensando?"
          ></textarea>
        </div>
        <div className="self-end justify-self-end w-fit h-fit">
          <Button
            onClick={handleClick}
            className=" bg-rebeccapurple2 hover:bg-rebeccapurple w-full h-full rounded-full font-bold"
          >
            POST
          </Button>
        </div>
      </div>
    </div>
  );
};
