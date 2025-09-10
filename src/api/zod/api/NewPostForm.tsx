import { useState } from "react";
import { createPost } from "./ apiClient";
import type { NewPost } from "./ apiClient";

export function NewPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody]   = useState("");
  const [userId, setUserId] = useState("1");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    try {
      // raw değerler (string vs.) → service içinde safeParse ile doğrulanacak
      const created = await createPost({ title, body, userId } as unknown as NewPost);
      setMsg(`Oluşturuldu: #${created.id} "${created.title}"`);
      setTitle(""); setBody(""); setUserId("1");
    } catch (err) {
      setMsg("Hata: " + (err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <input placeholder="Başlık" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="İçerik" value={body} onChange={e => setBody(e.target.value)} />
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <button type="submit">Gönder</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
