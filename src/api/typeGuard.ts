//A) Type guard (kütüphanesiz, güvenli)
// 1) Tipi tanımla
export type Post = { id: number; title: string; body: string; userId: number };

// 2) Doğrulayıcı (type guard)
function isPost(x: unknown): x is Post {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as any).id === "number" &&
    typeof (x as any).title === "string" &&
    typeof (x as any).body === "string" &&
    typeof (x as any).userId === "number"
  );
}

// 3) API fonksiyonu: sınırda unknown, sonra daralt
export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Network error");

  const data: unknown = await res.json(); // ← önce unknown
  if (!isPost(data)) throw new Error("Invalid shape"); // ← daralt
  return data; // ← artık Post
}
