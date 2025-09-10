import { useState } from "react";
import { deflate } from "zlib";

const users = [
  { name: "Sarah", age: 20 },
  { name: "Alex", age: 20 },
  { name: "Michael", age: 20 },
];

const UserSearch: React.FC = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  const onClick = () => {
    const finduser = users.find((item) => {
      return item.name === name;
    });
    setUser(finduser);
  };
  return (
    <div>
      User Search
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onClick}>Find user</button>
      {user && `${user.name} ${user.age}`}
    </div>
  );
};

export default UserSearch;
