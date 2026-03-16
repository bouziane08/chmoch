"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Role } from "@/types/role";

interface RoleDialogProps {
  open: boolean;
  // تصحيح: الدالة يجب أن تقبل قيمة boolean لتتوافق مع مكونات Shadcn
  onOpenChange: (open: boolean) => void;
  role?: Role;
}

export function RoleDialog({ open, onOpenChange, role }: RoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-right sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>{role ? "تعديل الدور" : "إضافة دور جديد"}</DialogTitle>
          <DialogDescription>
            قم بإدخال تفاصيل الدور هنا. اضغط حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        {/* هنا يوضع نموذج إدخال البيانات (Form) */}
        <div className="py-4">
          <p className="text-muted-foreground text-sm">
            نموذج الصلاحيات سيظهر هنا...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
