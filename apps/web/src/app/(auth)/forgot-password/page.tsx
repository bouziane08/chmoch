"use client";

import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center text-right"
      dir="rtl"
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">نسيت كلمة المرور؟</h1>
        <p className="text-muted-foreground">
          أدخل بريدك الإلكتروني لاستعادة الوصول إلى حسابك.
        </p>
        {/* سيتم إضافة النموذج لاحقاً */}
      </div>
    </div>
  );
}
