// import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import style from "./textbox.module.css";
import { ulid } from "ulidx";
import { IPost } from "../../models/post";

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
    <div>
      <div className={style.box}>
        <div className={style.header}>
          <img
            className={style.img}
            src="src/assets/chorro-timido.JPG"
            alt=""
          />
          <textarea
            ref={input}
            className={style.input}
            name="text"
            maxlength="400"
            placeholder="No que voce está pensando?"
          ></textarea>
        </div>
        <div className={style.btn}>
          <button onClick={handleClick}>POST</button>
        </div>
      </div>
    </div>
  );
}
