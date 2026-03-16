import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "إنشاء حساب - Enterprise Dashboard",
  description: "إنشاء حساب جديد في النظام",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          إنشاء حساب جديد
        </h1>
        <p className="text-muted-foreground text-sm">
          أدخل بياناتك للتسجيل في النظام
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
