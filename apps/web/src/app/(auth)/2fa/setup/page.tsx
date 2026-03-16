"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Copy, Check, Download, Loader2 } from "lucide-react";
// تم حذف استيراد Link لأنه غير مستخدم

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTwoFactor } from "@/hooks/useTwoFactor";
import { useAuthStore } from "@/store/auth.store";

export default function TwoFactorSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "qr" | "verify" | "backup">(
    "intro",
  );
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCodes, setShowCodes] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const {
    generateSecret,
    enable2FA,
    getBackupCodes,
    secret,
    qrCode,
    isLoading,
  } = useTwoFactor();
  const { user, updateUser } = useAuthStore();

  // إصلاح خطأ exhaustive-deps بإضافة generateSecret للمصفوفة
  useEffect(() => {
    if (step === "qr") {
      generateSecret();
    }
  }, [step, generateSecret]);

  const handleGenerateQR = async () => {
    setStep("qr");
  };

  const handleVerify = async () => {
    try {
      await enable2FA(token);
      const codes = await getBackupCodes();
      setBackupCodes(codes.codes.map((c) => c.code));
      setStep("backup");
      updateUser({ isTwoFactorEnabled: true });
      toast.success("تم تفعيل المصادقة الثنائية بنجاح");
    } catch (_error) {
      // تم تغيير error إلى _error لحل خطأ eslint
      toast.error("رمز التحقق غير صحيح");
    }
  };

  const handleCopyCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("تم نسخ رموز الاسترجاع");
  };

  const handleDownloadCodes = () => {
    const content = backupCodes.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-codes-${user?.email}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تحميل رموز الاسترجاع");
  };

  return (
    <div className="container max-w-2xl py-10" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            المصادقة الثنائية (2FA)
          </h1>
          <p className="text-muted-foreground">
            أضف طبقة أمان إضافية لحماية حسابك من الوصول غير المصرح به
          </p>
        </div>

        {step === "intro" && (
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>تفعيل المصادقة الثنائية</CardTitle>
              <CardDescription>
                المصادقة الثنائية تضيف طبقة أمان إضافية. ستحتاج إلى إدخال رمز من
                تطبيق التحقق (مثل Google Authenticator) عند تسجيل الدخول.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
              <div className="bg-muted/50 border-border/40 rounded-lg border p-4">
                <h3 className="text-primary mb-2 font-semibold">
                  لماذا يجب تفعيلها؟
                </h3>
                <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
                  <li>حماية حسابك حتى لو تم تسريب كلمة المرور.</li>
                  <li>منع الدخول من أجهزة غير معروفة.</li>
                  <li>توفير رموز استرجاع للطوارئ.</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row-reverse justify-between">
              <Button
                onClick={handleGenerateQR}
                disabled={isLoading}
                className="px-8"
              >
                ابدأ الإعداد
              </Button>
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="ml-2 h-4 w-4" />
                إلغاء
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === "qr" && qrCode && (
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>ربط التطبيق</CardTitle>
              <CardDescription>
                امسح رمز QR باستخدام تطبيق Google Authenticator أو Authy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="border-border rounded-xl border bg-white p-4 shadow-inner">
                  <Image
                    src={qrCode}
                    alt="2FA QR Code"
                    width={220}
                    height={220}
                    priority
                    className="smooth-render"
                  />
                </div>

                <div className="w-full max-w-sm space-y-3">
                  <p className="text-muted-foreground text-center text-xs">
                    إذا لم تتمكن من مسح الرمز، أدخل هذا المفتاح يدوياً:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted border-border/50 flex-1 rounded-md border p-2.5 text-center font-mono text-sm tracking-widest">
                      {secret}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(secret || "");
                        toast.success("تم نسخ المفتاح");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <div className="space-y-2 text-right">
                  <label className="pr-1 text-sm font-medium">
                    رمز التحقق المكون من 6 أرقام
                  </label>
                  <Input
                    type="text"
                    placeholder="000000"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    maxLength={6}
                    className="h-14 text-center text-2xl font-bold tracking-[0.5em]"
                  />
                </div>
                <Button
                  onClick={handleVerify}
                  disabled={token.length !== 6 || isLoading}
                  className="h-12 w-full text-lg"
                >
                  {isLoading ? (
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  ) : (
                    "تفعيل المصادقة"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "backup" && (
          <Card className="border-yellow-500/20 bg-yellow-50/5 shadow-lg shadow-yellow-500/5 dark:bg-yellow-500/5">
            <CardHeader className="text-right">
              <CardTitle className="flex items-center justify-end gap-2 text-yellow-600 dark:text-yellow-500">
                <span>رموز الاسترجاع الاحتياطية</span>
                <ShieldCheck className="h-6 w-6" />
              </CardTitle>
              <CardDescription className="text-yellow-700/80 dark:text-yellow-500/70">
                هذه الرموز هي طريقك الوحيد للدخول في حال فقدت هاتفك. احفظها الآن
                في مكان آمن جداً.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {backupCodes.map((code, index) => (
                  <code
                    key={index}
                    className="bg-background border-border rounded-md border p-3 text-center font-mono text-sm shadow-sm"
                  >
                    {code}
                  </code>
                ))}
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleCopyCodes}
                  className="flex-1"
                >
                  {copied ? (
                    <Check className="ml-2 h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="ml-2 h-4 w-4" />
                  )}
                  نسخ الكل
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadCodes}
                  className="flex-1"
                >
                  <Download className="ml-2 h-4 w-4" />
                  تحميل (TXT)
                </Button>
              </div>

              <AlertDialog open={!showCodes} onOpenChange={setShowCodes}>
                <AlertDialogContent dir="rtl" className="text-right">
                  <AlertDialogHeader>
                    <AlertDialogTitle>تنبيه أمان هام</AlertDialogTitle>
                    <AlertDialogDescription>
                      بمجرد إغلاق هذه النافذة، لن تتمكن من رؤية هذه الرموز مرة
                      أخرى. تأكد من نسخها أو تحميلها قبل المتابعة.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row-reverse gap-2">
                    <AlertDialogAction
                      onClick={() => router.push("/dashboard")}
                    >
                      نعم، قمت بحفظ الرموز
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}

// استيراد ShieldCheck المفقود في الكود الأصلي
import { ShieldCheck } from "lucide-react";
