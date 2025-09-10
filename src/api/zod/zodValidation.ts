//B) Zod ile (runtime şema doğrulama, en güçlü)
//Amacımız: API’den gelen/giden veriyi çalışırken doğrulayıp, uygulama içinde tam tip güvenliğiyle kullanmak.
import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});
export type Post = z.infer<typeof PostSchema>;  
// type Post = {
  //   id: number;
  //   title: string;
  //   body: string;
  //   userId:number
  // };

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Network error");

  const data: unknown = await res.json(); // ← unknown
  return PostSchema.parse(data); // ← doğrula + daralt → Post  yani verdiğin şemaya bağlı veriyi kontrol et doğruysa veriyi döner,yanlışsa hata fırlatır
}
