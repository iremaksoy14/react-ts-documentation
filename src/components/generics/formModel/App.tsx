import { useFormModel } from "./index";
type Profile = { name: string; age: number; newsletter: boolean };


export const App=()=>{
  const { model, setField } = useFormModel<Profile>({
    name: "",
    age: 18,
    newsletter: false,
  });
  setField("age", 19);        // ✅ number
// setField("age", "19");   // ❌ string verilemez

  return(
<div></div>
  )
}



