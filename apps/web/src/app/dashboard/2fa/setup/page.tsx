"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTwoFactor } from "@/hooks/useTwoFactor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Check, Shield, Smartphone, KeyRound } from "lucide-react";
import Image from "next/image";
import { ApiError } from "@/hooks/useTwoFactor";

export default function TwoFactorSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"generate" | "verify" | "backup">("generate");
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const { 
    secret, 
    qrCode, 
    backupCodes, 
    isLoading, 
    generateSecret, 
    enable2FA 
  } = useTwoFactor();

  // توليد الـ QR Code
  const handleGenerate = useCallback(async () => {
    setError("");
    try {
      await generateSecret();
      setStep("verify");
    } catch (err) {
      setError("فشل في توليد رمز المصادقة");
      console.error(err);
    }
  }, [generateSecret]);

  // التحقق من الرمز وتفعيل 2FA
  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("الرجاء إدخال رمز مكون من 6 أرقام");
      return;
    }

    setIsVerifying(true);
    setError("");
    try {
      // استخدام mutate مع callbacks - مع الأنواع الصحيحة
      await new Promise<void>((resolve, reject) => {
        enable2FA.mutate(otp, {
          onSuccess: (data) => {
            if (data?.backupCodes) {
              setStep("backup");
            }
            resolve();
          },
          onError: (error: ApiError) => {
            reject(error);
          },
        });
      });
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.message || "الرمز غير صحيح. الرجاء المحاولة مرة أخرى");
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  // نسخ رموز النسخ الاحتياطي
  const copyBackupCodes = () => {
    const codesText = backupCodes.map((bc) => bc.code).join("\n");
    navigator.clipboard.writeText(codesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // تحميل رموز النسخ الاحتياطي كملف نصي
  const downloadBackupCodes = () => {
    const codesText = backupCodes.map((bc) => bc.code).join("\n");
    const blob = new Blob([codesText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // بدء التوليد تلقائياً عند فتح الصفحة
  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  // عرض حالة التحميل
  if (isLoading && step === "generate") {
    return (
      <div className="container mx-auto max-w-2xl py-10">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/2fa")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">إعداد المصادقة الثنائية</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              جاري تجهيز المصادقة الثنائية
            </CardTitle>
            <CardDescription>
              الرجاء الانتظار بينما نقوم بتوليد رمز المصادقة...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-64 items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/2fa")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">إعداد المصادقة الثنائية</h1>
      </div>

      {/* خطوات التفعيل */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge 
            variant={step === "generate" ? "default" : "secondary"} 
            className="h-8 w-8 rounded-full p-0 flex items-center justify-center"
          >
            1
          </Badge>
          <span className={step === "generate" ? "font-bold" : "text-muted-foreground"}>
            توليد الرمز
          </span>
        </div>
        <div className="h-px w-16 bg-border" />
        <div className="flex items-center gap-2">
          <Badge 
            variant={step === "verify" ? "default" : "secondary"} 
            className="h-8 w-8 rounded-full p-0 flex items-center justify-center"
          >
            2
          </Badge>
          <span className={step === "verify" ? "font-bold" : "text-muted-foreground"}>
            التحقق
          </span>
        </div>
        <div className="h-px w-16 bg-border" />
        <div className="flex items-center gap-2">
          <Badge 
            variant={step === "backup" ? "default" : "secondary"} 
            className="h-8 w-8 rounded-full p-0 flex items-center justify-center"
          >
            3
          </Badge>
          <span className={step === "backup" ? "font-bold" : "text-muted-foreground"}>
            رموز الطوارئ
          </span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* الخطوة 2: التحقق من الرمز */}
      {step === "verify" && qrCode && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                امسح رمز QR
              </CardTitle>
              <CardDescription>
                استخدم تطبيق Google Authenticator أو Microsoft Authenticator لمسح الرمز
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="relative h-48 w-48 overflow-hidden rounded-lg border">
                <Image
                  src={qrCode}
                  alt="QR Code for 2FA"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <div className="w-full space-y-2 rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">أو أدخل المفتاح يدوياً:</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="flex-1 rounded bg-background px-3 py-2 text-sm font-mono break-all">
                    {secret}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(secret || "");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                أدخل رمز التحقق
              </CardTitle>
              <CardDescription>
                أدخل الرمز المكون من 6 أرقام من تطبيق المصادقة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                onClick={handleVerify}
                disabled={isVerifying || otp.length !== 6}
                className="w-full"
              >
                {isVerifying ? "جاري التحقق..." : "تفعيل المصادقة الثنائية"}
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* الخطوة 3: رموز النسخ الاحتياطي */}
      {step === "backup" && backupCodes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Shield className="h-5 w-5" />
              رموز الطوارئ
            </CardTitle>
            <CardDescription>
              احفظ هذه الرموز في مكان آمن. يمكنك استخدامها مرة واحدة فقط إذا فقدت الوصول إلى تطبيق المصادقة.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-4 font-mono">
              {backupCodes.map((code, index) => (
                <div key={index} className="text-sm">
                  {code.code}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={copyBackupCodes}
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Check className="ml-2 h-4 w-4" />
                    تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="ml-2 h-4 w-4" />
                    نسخ الكل
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={downloadBackupCodes}
                className="flex-1"
              >
                تحميل كملف
              </Button>
            </div>

            <Alert>
              <AlertDescription className="text-sm">
                ⚠️ هذه الرموز لن تظهر مرة أخرى. تأكد من حفظها قبل المتابعة.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => router.push("/dashboard/2fa")}
              className="w-full"
            >
              تم الحفظ - العودة إلى إعدادات 2FA
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}