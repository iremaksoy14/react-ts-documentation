import React from "react";
import { Select } from "./index";
type Status = "pending" | "approved" | "rejected";



//kısa tanım: satisfies = “Bu değeri şu tipe göre KONTROL ET ama türe dokunma.”
const statusOptions = [
  { label: "Pending",  value: "pending"  },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
] as const satisfies ReadonlyArray<{ label: string; value: Status }>;

function App() {
  const [status, setStatus] = React.useState<Status | "">("");
  return (
    <Select
      options={statusOptions}
      value={status}
      onChange={setStatus}
      placeholder="Choose status"
    />
  );
}





