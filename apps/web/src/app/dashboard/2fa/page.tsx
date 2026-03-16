"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// تم إزالة AlertTriangle لإصلاح خطأ ESLint
import { Shield, Key, CheckCircle, Copy, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/auth.store";
import { useTwoFactor } from "@/hooks/useTwoFactor";
import { toast } from "sonner";

export default function TwoFactorPage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const { disable2FA, regenerateBackupCodes, backupCodes, isLoading } =
    useTwoFactor();
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDisable2FA = async () => {
    try {
      await disable2FA(token);
      updateUser({ isTwoFactorEnabled: false });
      setShowDisableDialog(false);
      setToken("");
      toast.success("تم تعطيل المصادقة الثنائية بنجاح");
    } catch (_) {
      // استخدام _ لإصلاح خطأ unused-vars
      toast.error("رمز التحقق غير صحيح أو انتهت صلاحيته");
    }
  };

  const handleRegenerateCodes = async () => {
    try {
      await regenerateBackupCodes();
      setShowRegenerateDialog(false);
      toast.success("تم إنشاء رموز استرجاع جديدة");
    } catch (_) {
      // استخدام _ لإصلاح خطأ unused-vars
      toast.error("فشل إنشاء رموز الاسترجاع، حاول مرة أخرى");
    }
  };

  const handleCopyCodes = () => {
    const codes = backupCodes.map((c) => c.code).join("\n");
    navigator.clipboard.writeText(codes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("تم نسخ رموز الاسترجاع للمحافظة");
  };

  const handleDownloadCodes = () => {
    const content = backupCodes.map((c) => c.code).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-codes-${user?.email || "user"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تحميل الملف بنجاح");
  };

  // واجهة العرض في حال عدم التفعيل
  if (!user?.isTwoFactorEnabled) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 p-6"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">
            المصادقة الثنائية
          </h1>
          <p className="text-muted-foreground">
            أضف طبقة أمان إضافية لحماية حسابك
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-full p-3">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <div className="text-right">
                <CardTitle>المصادقة الثنائية غير مفعلة</CardTitle>
                <CardDescription>
                  قم بتفعيل الميزة لحماية حسابك من الوصول غير المصرح به
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="mb-2 font-semibold">مميزات التفعيل:</h3>
              <ul className="text-muted-foreground rtl list-inside list-disc space-y-1 text-sm">
                <li>حماية حسابك حتى لو تسربت كلمة المرور</li>
                <li>توفير رموز استرجاع لاستعادة الوصول للطوارئ</li>
                <li>توافق تام مع تطبيقات Google Authenticator و Authy</li>
              </ul>
            </div>

            <Button
              onClick={() => router.push("/dashboard/2fa/setup")}
              className="w-full gap-2"
            >
              <Key className="h-4 w-4" />
              تفعيل المصادقة الثنائية الآن
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex flex-col gap-1 text-right">
        <h1 className="text-3xl font-bold tracking-tight">إعدادات الأمان</h1>
        <p className="text-muted-foreground">
          إدارة المصادقة الثنائية ورموز الاسترجاع
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* حالة التفعيل */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-right">
                <CardTitle>حالة الحماية: نشط</CardTitle>
                <CardDescription>
                  حسابك محمي حالياً بخطوتين للتحقق
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => setShowDisableDialog(true)}
              className="w-full"
            >
              تعطيل الحماية الإضافية
            </Button>
          </CardContent>
        </Card>

        {/* رموز الاسترجاع */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-right">رموز الاسترجاع</CardTitle>
            <CardDescription className="text-right">
              احفظ هذه الرموز في مكان آمن لاستخدامها عند فقدان هاتفك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {backupCodes.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.slice(0, 6).map((code, index) => (
                    <code
                      key={index}
                      className="bg-muted border-border rounded border p-2 text-center font-mono text-sm"
                    >
                      {code.code}
                    </code>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCodes}
                    className="flex-1 gap-2"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "تم النسخ" : "نسخ الكل"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCodes}
                    className="flex-1 gap-2"
                  >
                    <Download className="h-4 w-4" />
                    تحميل TXT
                  </Button>
                </div>
              </>
            )}

            <Button
              variant="outline"
              onClick={() => setShowRegenerateDialog(true)}
              className="w-full border-dashed"
              disabled={isLoading}
            >
              تجديد رموز الاسترجاع
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* حوار تعطيل 2FA */}
      <AlertDialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <AlertDialogContent className="text-right">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من تعطيل الحماية؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا سيجعل حسابك أقل أماناً. يجب إدخال الرمز من تطبيق المصادقة
              للمتابعة.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="token" className="block w-full">
              رمز التحقق المكون من 6 أرقام
            </Label>
            <Input
              id="token"
              placeholder="000000"
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              className="text-center text-2xl font-bold tracking-[0.5em] focus:ring-red-500"
            />
          </div>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisable2FA}
              disabled={token.length !== 6 || isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              تأكيد التعطيل
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* حوار تجديد الرموز */}
      <AlertDialog
        open={showRegenerateDialog}
        onOpenChange={setShowRegenerateDialog}
      >
        <AlertDialogContent className="text-right">
          <AlertDialogHeader>
            <AlertDialogTitle>تجديد الرموز الاحتياطية</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم إبطال مفعول الرموز القديمة فوراً. هل قمت بحفظ الرموز الجديدة؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRegenerateCodes}
              className="bg-primary"
            >
              إنشاء رموز جديدة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
