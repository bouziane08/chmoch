import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول - Enterprise Dashboard",
  description: "تسجيل الدخول إلى لوحة التحكم",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          مرحباً بعودتك
        </h1>
        <p className="text-muted-foreground text-sm">
          سجل دخولك للوصول إلى لوحة التحكم
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
