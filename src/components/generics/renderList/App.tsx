import { List } from "./index";

// 1) Sade kullanım: T çıkarımı otomatik
type User = { id: number; name: string; email: string };

// 2) Başka bir tip
type Product = { id: string; title: string; price: number };
export const App = () => {
  return (
    <>
      <List
        items={[{ id: 1, name: "Ada", email: "a@b.com" }]}
        render={(u) => <b>{u.name}</b>} // u: User
        onItemClick={(u) => console.log(u.email)} // u: User
      />
      <List
        items={[{ id: "p1", title: "Book", price: 120 }]}
        render={(p) => (
          <span>
            {p.title} – {p.price}
          </span>
        )}
      />
   
      {/* <List
        items={[{ id: 1, name: "Ada", email: "a@b.com" }]}
        // @ts-expect-error: "fullname" User'da yok
        render={(u) => <b>{u.fullname}</b>}
      /> */}
    </>
  );
};
