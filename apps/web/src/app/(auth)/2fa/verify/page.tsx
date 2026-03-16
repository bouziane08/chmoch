"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTwoFactor } from "@/hooks/useTwoFactor";
// أزلنا استدعاء useAuthStore هنا لأننا لا نحتاجه في هذه الصفحة حالياً
// طالما أن الـ hook الخاص بالتحقق يعالج النتيجة.

export default function TwoFactorVerifyPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { verifyToken } = useTwoFactor();

  const handleVerify = async () => {
    if (token.length !== 6) {
      toast.error("يرجى إدخال رمز صحيح من 6 أرقام");
      return;
    }

    setIsLoading(true);
    try {
      const isValid = await verifyToken(token);
      if (isValid) {
        toast.success("تم التحقق بنجاح");
        router.push("/dashboard");
      } else {
        toast.error("رمز التحقق غير صحيح");
      }
    } catch (err) {
      // تم تغييرها من error إلى err لتجنب تعارض الأسماء إذا لزم
      console.error("2FA Verification Error:", err);
      toast.error("حدث خطأ أثناء التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex min-h-screen max-w-md items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-6"
      >
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <Shield className="text-primary h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">التحقق بخطوتين</CardTitle>
            <CardDescription>
              أدخل رمز التحقق من تطبيق Google Authenticator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="000000"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                maxLength={6}
                className="h-16 text-center font-mono text-3xl tracking-[0.5em]"
                autoFocus
              />
              <p className="text-muted-foreground text-center text-xs">
                الرمز مكون من 6 أرقام ويتجدد كل 30 ثانية
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              onClick={handleVerify}
              disabled={token.length !== 6 || isLoading}
              className="h-12 w-full text-lg"
              size="lg"
            >
              {isLoading ? "جاري التحقق..." : "تحقق"}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm"
              onClick={() => router.push("/login")}
            >
              العودة لتسجيل الدخول
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
