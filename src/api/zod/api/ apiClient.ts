import { z } from "zod";

// API'nin DÖNDÜĞÜ kayıt
export const PostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Başlık zorunlu"),
  body: z.string().min(1, "İçerik zorunlu"),
  userId: z.number().int().positive(),
});
export const PostsSchema = z.array(PostSchema);
export type Post = z.infer<typeof PostSchema>;

// API'ye GÖNDERDİĞİMİZ yeni kayıt (id yok)
export const NewPostSchema = z.object({
  title: z.string().min(1, "Başlık zorunlu"),
  body: z.string().min(1, "İçerik zorunlu"),
  userId: z.coerce.number().int().positive(), // "1" → 1
});
export type NewPost = z.infer<typeof NewPostSchema>;

export class ApiError extends Error {
  constructor(message: string, public status: number, public info?: unknown) {
    super(message);
  }
}

// Sınırda unknown döndür (asla 'any' değil)
export async function fetchJson(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  const text = await res.text();
  const data: unknown = text ? JSON.parse(text) : undefined;
  if (!res.ok) throw new ApiError(res.statusText || "API Error", res.status, data);
  return data;
}

const BASE = "https://jsonplaceholder.typicode.com";


// LISTE — API'den geleni parse (geçmezse ZodError fırlar)
export async function getPosts(): Promise<Post[]> {
  const data = await fetchJson(`${BASE}/posts`);
  return PostsSchema.parse(data); // → Post[]
}


// TEK KAYIT
export async function getPost(id: number): Promise<Post> {
  const data = await fetchJson(`${BASE}/posts/${id}`);
  return PostSchema.parse(data); // → Post
}

// OLUŞTUR — önce giden veriyi safeParse ile doğrula (form hatası göstermek için ideal)
// sonra API cevabını parse ile doğrula (contract bozulursa patlasın)

export async function createPost(raw: unknown): Promise<Post> {
 //göndermeden önce doğrula
  const parsed = NewPostSchema.safeParse(raw);
  if (!parsed.success) {
    // Form hatalarını üst katmana nazikçe ilet
    const errs = parsed.error.flatten().fieldErrors;
    throw new Error("Form hatası: " + JSON.stringify(errs));
  }

  //veriyi gönder
  const data = await fetchJson(`${BASE}/posts`, {
    method: "POST",
    body: JSON.stringify(parsed.data), // tipli ve temiz data
  });

  //dönen veriyi doğrulayıp öyle return et
  return PostSchema.parse(data); // → Post (backend saçmalarsa burada yakalanır)
}


