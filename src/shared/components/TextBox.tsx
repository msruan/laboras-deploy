// import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import style from "./textbox.module.css";
import { ulid } from "ulidx";
import { IPost } from "../models/post";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type TextBoxProps = {
  idLoggedUser: string;
  addNewPost: (newPost: IPost) => void;
}
export const TextBox = ({ idLoggedUser, addNewPost }: TextBoxProps) => {
  const input = useRef<HTMLTextAreaElement>(null);

  function handleClick() {
    if (input.current == null ||input.current.value === "") {
      return;
    }

    const newPost: IPost = {
      id: ulid(),
      user_id: idLoggedUser,
      content: input.current.value,
      created_at: `${new Date()}`,
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    addNewPost(newPost);
    input.current.value = "";
  }

  return (
    
    <div>
      <div className="flex flex-col w-full align-middle pb-10 border-b-2 pt-5 pl-3 pr-3 border-rebeccapurple2">
        <div className="w-full flex flex-row gap-8 items-center">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage src="src/assets/chorro-timido.JPG" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <textarea
            ref={input}
            className="bg-transparent items-center"
            name="text"
            maxLength="400"
            placeholder="No que voce está pensando?"
          ></textarea>
        </div>
        <div className="self-end justify-self-end w-fit h-fit">
          <Button onClick={handleClick} className=" bg-rebeccapurple2 hover:bg-rebeccapurple w-full h-full rounded-full transition-all duration-400">POST</Button>
        </div>
      </div>
    </div>
  );
}

// .input {
//   padding: 20px 0px 20px;
//   background-color: transparent;
//   width: 615px;
//   align-items: center;
//   border: none;
//   color: white;
//   outline: none;
//   font-size: 16px;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   resize: none;
  
// }