import { useEffect, useState } from "react";
import { getPosts } from "./ apiClient";
import type { Post } from "./ apiClient";

export function Posts() {
  const [data, setData] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getPosts()
      .then((d) => { if (alive) setData(d); })
      .catch((e) => { if (alive) setError(String(e)); });
    return () => { alive = false; };
  }, []);

  if (error) return <p>Hata: {error}</p>;
  if (!data) return <p>Yükleniyor…</p>;

  return (
    <ul>
      {data.slice(0, 5).map(p => (
        <li key={p.id}>
          <b>{p.title}</b>
          <div>{p.body}</div>
        </li>
      ))}
    </ul>
  );
}
