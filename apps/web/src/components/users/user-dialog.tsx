"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDialog({ open, onOpenChange }: UserDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا نضع منطق الـ API لاحقاً
    console.log("تم إرسال البيانات");
    onOpenChange(false); // إغلاق النافذة بعد الحفظ
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-right" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة مستخدم جديد</DialogTitle>
          <DialogDescription className="text-right">
            أدخل تفاصيل المستخدم الجديد هنا. اضغط على حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right block">
              الاسم الكامل
            </Label>
            <Input
              id="name"
              placeholder="أدخل اسم المستخدم"
              className="text-right"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right block">
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@domain.com"
              className="text-right"
              required
            />
          </div>

          <DialogFooter className="flex-row-reverse gap-2 pt-4">
            <Button type="submit" className="w-full">
              حفظ البيانات
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
