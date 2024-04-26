import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:3000/posts`);
    const jsonPosts: IPost[] = await response.json();
    console.log(jsonPosts);
    return jsonPosts;
}

function handleDelete(id: string) {
    const newPosts = posts.filter((post) => post.id !== id);

    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setPosts(newPosts);
    });
  }
  
export function usePostDate(){

}