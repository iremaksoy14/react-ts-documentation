import { z } from "zod";

//validation için schema tanımla
const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});


try {
  const data: unknown = await (await fetch("/posts/1")).json();
 //parse: Veriyi şemaya göre doğrular,
  const post = PostSchema.parse(data); // ← Post, senkron döner
  console.log(post.title);
} catch (e) {
  // ZodError veya network hatası
}

// const res = PostSchema.safeParse(data);
// if (res.success) {
//   // res.data: Post
// } else {
//   // res.error: ZodError
// }