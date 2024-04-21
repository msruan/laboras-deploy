import style from './main.module.css'

import { Post } from "../Post";
import { TextBox } from "../TextBox";
import { useEffect, useRef, useState } from 'react';
import { IPost } from '../../models/post';

interface MainPostsProps {
    idLoggedUser: string;
}

export function MainPosts({idLoggedUser} : MainPostsProps){

    const [posts, setPosts] = useState<IPost[]>([]);

    async function auxSetPosts(){
        setPosts(await getPosts());
    }  

    function addNewPost(newPost : IPost){
        setPosts([...posts, newPost]);
    }


    useEffect(() => {
        console.log("Oxi, montei");
        auxSetPosts();
    }, []);        

    return (
        <div className={style.main}>
            <TextBox idLoggedUser={idLoggedUser} addNewPost={addNewPost}/>
            {posts.map((post) => <Post post={post}/>)}
        </div>
    );
}

async function getPosts() : Promise<IPost[]> {
    const response = await fetch(`http://localhost:3000/posts`);
    const jsonPosts: IPost[] = await response.json();
    console.log(jsonPosts);
    return jsonPosts;
}   