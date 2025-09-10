import { z } from "zod";

//schema tanımı
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Doğrulama
const result = userSchema.safeParse({
  id: 1,
  name: "İrem",
  email: "test@example.com",
});

if (result.success) {
  console.log("✅ Geçerli:", result.data);
} else {
  console.log("❌ Hatalar:", result.error.format());
}


//TYPESCRIPT İLE TİP ÇIKARMAK
//En güzel yanı: z.infer ile tip türetebiliyorsun 👇


//schema tanımı
const userSchema2 = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// otomatik TypeScript tipi
type User = z.infer<typeof userSchema2>; 
//type User ifadesi aşağıdakine dönüşmüş oluyor
// type User = {
//   id: number;
//   name: string;
//   email: string;
// };
const u: User = { id: 2, name: "İrem", email: "irem@example.com" };

