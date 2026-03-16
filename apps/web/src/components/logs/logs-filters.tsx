"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LogFilters {
  startDate?: Date;
  endDate?: Date;
  action?: string;
  userId?: string;
}

interface LogsFiltersProps {
  onChange: (filters: Partial<LogFilters>) => void;
}

export function LogsFilters({ onChange }: LogsFiltersProps) {
  // 1. استخدام حالة محلية لمنع التحديث اللحظي مع كل حرف يكتبه المستخدم
  const [searchTerm, setSearchTerm] = useState("");

  // 2. دالة مستقرة لتغيير القيم باستخدام useCallback
  const handleActionChange = useCallback((value: string) => {
    // إرسال "all" أو قيمة فارغة إذا أراد المستخدم إلغاء الفلتر
    const actionValue = value === "all" ? undefined : value;
    onChange({ action: actionValue });
  }, [onChange]);

  // 3. التعامل مع إدخال النص (يفضل إضافة debounce لاحقاً)
  const handleUserSearch = (val: string) => {
    setSearchTerm(val);
    onChange({ userId: val });
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="بحث باسم المستخدم..."
        value={searchTerm}
        onChange={(e) => handleUserSearch(e.target.value)}
        className="text-right"
      />

      <Select onValueChange={handleActionChange}>
        <SelectTrigger className="text-right" dir="rtl">
          <SelectValue placeholder="نوع العملية" />
        </SelectTrigger>
        <SelectContent dir="rtl">
          <SelectItem value="all">كل العمليات</SelectItem>
          <SelectItem value="LOGIN">تسجيل دخول</SelectItem>
          <SelectItem value="UPDATE">تحديث بيانات</SelectItem>
          <SelectItem value="DELETE">حذف</SelectItem>
          <SelectItem value="CREATE">إنشاء</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
