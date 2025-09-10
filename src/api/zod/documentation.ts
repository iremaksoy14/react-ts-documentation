import { z } from "zod";
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;


// 👉 User tipi otomatik olarak şu hale gelir:
// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

//-------------------------------------------------

const profileSchema = z.object({
  username: z.string(),
  bio: z.string().optional(),
});

type Profile = z.infer<typeof profileSchema>;
/*
type Profile = {
  username: string;
  bio?: string;   // opsiyonel
}
*/


//-------------------------------
const tagsSchema = z.array(z.string());

type Tags = z.infer<typeof tagsSchema>; 
// type Tags = string[]


//-----------------------------------
const postSchema = z.object({
  title: z.string(),
  author: userSchema,   // başka schema iç içe
});

type Post = z.infer<typeof postSchema>;
/*
type Post = {
  title: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
}
*/


//----------------------------
const user = userSchema.parse({
  id: 1,
  name: "Oğuzhan",
  email: "oguz@example.com"
});
console.log(user); 
// ✅ { id: 1, name: "Oğuzhan", email: "oguz@example.com" }

// Hatalı veri
const invalid = userSchema.parse({
  id: "1",   // ❌ number bekliyordu, string geldi
  name: "İrem",
  email: "irem@example.com"
});
// -> ZodError fırlatır





//--------------
//safeParse, parse gibi çalışır ama hata fırlatmaz,onun yerine obje döner
const result = userSchema.safeParse({
  id: "1",  // ❌ yanlış tip
  name: "İrem",
  email: "irem@example.com"
});

if (!result.success) {
  console.log("❌ Hata:", result.error.format());
} else {
  console.log("✅ Data:", result.data);
}
// z.infer → TypeScript tipi çıkarır. (compile-time)

// parse → Doğrulama yapar, hata varsa exception atar.

// safeParse → Doğrulama yapar, sonucu success/error olarak döner.

//Yani z.infer sayesinde şemayı bir kere tanımlıyorsun, hem doğrulama hem tip çıkarma işini Zod hallediyor.

