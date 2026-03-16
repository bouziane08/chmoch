//apps/web/src/app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "./(marketing)/page";

export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    redirect("/dashboard"); // 👈 إذا كنت مسجلاً، اذهب للوحة التحكم
  }

  return <HomePage />; // 👈 إذا لم تكن مسجلاً، شاهد صفحة التسويق
}
