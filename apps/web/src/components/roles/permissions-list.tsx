"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PermissionsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right text-lg">
          قائمة الصلاحيات المتاحة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-right text-sm">
          سيتم عرض جميع صلاحيات النظام هنا (مثال: users.read, post.delete).
        </div>
      </CardContent>
    </Card>
  );
}
