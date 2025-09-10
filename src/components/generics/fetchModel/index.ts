import { useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  // ...
  // setData(await res.json() as T);
  return { data };



  // Kullanım
type Post = { id: number; title: string };

const { data: posts } = useFetch<Post[]>("/api/posts");   

type User = { id: string; name: string };
const { data: users } = useFetch<User[]>("/api/users");  
}