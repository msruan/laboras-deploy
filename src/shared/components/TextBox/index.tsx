// import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import style from "./textbox.module.css";
import { ulid } from "ulidx";
import { IPost } from "../../models/post";
import { Textarea } from "../ui/textarea";

type TextBoxProps = {
  idLoggedUser: string;
  addNewPost: (newPost: IPost) => void;
}
export const TextBox = ({ idLoggedUser, addNewPost }: TextBoxProps) => {
  const input = useRef<HTMLTextAreaElement>(null);

  function handleClick() {
    if (!input.current) {
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
  //   .box {
  //     display: flex;
  //     flex-direction: column;
  //     width: 100%;
  //     align-items: center;
  //     border-bottom: 2px solid #7B1AF2;
  //     border-top: 2px solid #7B1AF2;
  //     border-top-right-radius: 2px ;
  //     border-top-left-radius: 2px ;
  //     padding-bottom: 10px;
  //     margin-bottom: 10px;
  // }
    
    <div>
      <div className="flex flex-col w-full align-middle">
        <div className={style.header}>
          <img
            className={style.img}
            src="src/assets/chorro-timido.JPG"
            alt=""
          />
          <Textarea
            ref={input}
            className={style.input}
            name="text"
            maxLength="400"
            placeholder="No que voce está pensando?"
          ></Textarea>
        </div>
        <div className={style.btn}>
          <button onClick={handleClick}>POST</button>
        </div>
      </div>
    </div>
  );
}
