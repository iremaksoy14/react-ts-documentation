
import { DataTable } from "./index";
type Product = { id: number; name: string; price: number; inStock: boolean };
type User = { id: number; name: string; email: string; active: boolean };
 export const App=()=>{
  //const productData:Product[]=[{ id:1, name:"Book", price:120, inStock:true }]

  const users: User[] = [
    { id: 1, name: "Ada", email: "ada@ex.com", active: true },
  ];
 
  return (
    <DataTable<User>
  data={users}
  columns={[
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Active", accessor: "active", render: (v) => (v ? "Yes" : "No") },
  ]}
/>
//     <DataTable<Product>
//     data={[{ id:1, name:"Book", price:120, inStock:true }]}
//     columns={[
//     { header: "Name", accessor: "name" },
//     { header: "Price", accessor: "price", render: (v) => <i>${v as number}</i> },
//   ]}
// />
  )
}



