export type Post = { id: number; title: string; body: string; userId: number };

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Network error");

  const data = await res.json() as Post; // ← direkt Post varsayımı (riskli)
  return data;
}
