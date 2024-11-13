// import { Input } from "@chakra-ui/react";
import { CommentPost, CreatePost } from "@/actions/PostAction";
import { GetProfileById } from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";
import { useRef } from "react";
import { ulid } from "ulidx";
import { useToken } from "../hooks/useToken";
import { IPost } from "../models/post";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

type TextBoxProps = {
  linkedTo: string | null;
};
export const TextBox = ({ linkedTo = null }: TextBoxProps) => {
  function handleClick() {
    if (input.current == null || input.current.value === "") {
      return;
    }

    const newPost: any = {
      content: input.current.value,
      token: token(),
      uid: linkedTo,
    };

    if (linkedTo) {
      addNewComment(newPost);
      console.log("novo comment", newPost);
    } else {
      addNewPost(newPost);
      console.log("novo post", newPost);
    }
    input.current.value = "";
  }

  const { token } = useToken();
  const { user: loggedUser } = useAuth();
  const name = loggedUser?.full_name;
  const idLoggedUser = loggedUser?.uid ?? "";

  const { response: profile } = GetProfileById(idLoggedUser);
  const input = useRef<HTMLTextAreaElement>(null);

  const { mutate: addNewPost } = CreatePost();
  const { mutate: addNewComment } = CommentPost();

  return (
    <div>
      <div className="flex flex-col w-full align-middle pb-10 border-b-2  pl-3 pr-3 border-rebeccapurple2">
        <div className="w-full flex flex-row gap-8 items-center">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage
              src={profile?.avatar_link ?? "src/assets/chorro-timido.JPG"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <textarea
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                handleClick();
              }
            }}
            ref={input}
            className="bg-transparent py-5 w-full content-center border-none text-white outline-none resize-none"
            name="text"
            maxLength={400}
            placeholder={`No que voce está pensando ${name}?`}
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
