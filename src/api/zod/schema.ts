import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  body: z.string(),
  userId: z.number(),
});

// Zod şemasından TS tipi üret (elle type yazmana gerek yok):
export type Post = z.infer<typeof PostSchema>;  // { id:number; title:string; body:string; userId:number }

export const PostsSchema = z.array(PostSchema); // Post[] için şema


//Not: z.string().min(1) gibi kurallar runtime doğrulama yapar. TS sadece derlemede kontrol eder; Zod ise gerçekten gelen veriye bakar.