"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("ar");
  const [timezone, setTimezone] = useState("Riyadh");
  const [settings, setSettings] = useState({
    autoSave: true,
    compactView: false,
    animations: true,
    sound: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">الإعدادات</h1>
        <p className="text-muted-foreground">
          إعدادات النظام والتفضيلات الشخصية
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>
                إعدادات اللغة والمنطقة والتفضيلات الأساسية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="language">اللغة</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="اختر اللغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="timezone">المنطقة الزمنية</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="اختر المنطقة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Riyadh">الرياض</SelectItem>
                      <SelectItem value="Dubai">دبي</SelectItem>
                      <SelectItem value="Cairo">القاهرة</SelectItem>
                      <SelectItem value="London">لندن</SelectItem>
                      <SelectItem value="NewYork">نيويورك</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSave">الحفظ التلقائي</Label>
                    <p className="text-muted-foreground text-sm">
                      حفظ التغييرات تلقائياً
                    </p>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={() => handleToggle("autoSave")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المظهر</CardTitle>
              <CardDescription>تخصيص مظهر واجهة النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>السمة</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex h-auto flex-col items-center gap-2 py-4"
                      onClick={() => setTheme("light")}
                    >
                      <div className="h-8 w-8 rounded-full bg-yellow-400" />
                      <span>فاتح</span>
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex h-auto flex-col items-center gap-2 py-4"
                      onClick={() => setTheme("dark")}
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-900" />
                      <span>داكن</span>
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="flex h-auto flex-col items-center gap-2 py-4"
                      onClick={() => setTheme("system")}
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-gray-900" />
                      <span>النظام</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compactView">عرض مضغوط</Label>
                    <p className="text-muted-foreground text-sm">
                      عرض العناصر بشكل مضغوط لتوفير المساحة
                    </p>
                  </div>
                  <Switch
                    id="compactView"
                    checked={settings.compactView}
                    onCheckedChange={() => handleToggle("compactView")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">الرسوم المتحركة</Label>
                    <p className="text-muted-foreground text-sm">
                      تفعيل تأثيرات الحركة في الواجهة
                    </p>
                  </div>
                  <Switch
                    id="animations"
                    checked={settings.animations}
                    onCheckedChange={() => handleToggle("animations")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>إعدادات الأمان وحماية الحساب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">المصادقة الثنائية</Label>
                    <p className="text-muted-foreground text-sm">
                      تفعيل طبقة أمان إضافية للحساب
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href="/dashboard/2fa/setup">إعداد</a>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sessions">جلسات العمل</Label>
                    <p className="text-muted-foreground text-sm">
                      إدارة الأجهزة المتصلة بحسابك
                    </p>
                  </div>
                  <Button variant="outline">إدارة</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="backup">النسخ الاحتياطي</Label>
                    <p className="text-muted-foreground text-sm">
                      تصدير نسخة احتياطية من بياناتك
                    </p>
                  </div>
                  <Button variant="outline">تصدير</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تخصيص طريقة استلام الإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound">الصوت</Label>
                    <p className="text-muted-foreground text-sm">
                      تشغيل صوت عند وصول إشعار جديد
                    </p>
                  </div>
                  <Switch
                    id="sound"
                    checked={settings.sound}
                    onCheckedChange={() => handleToggle("sound")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">إلغاء</Button>
        <Button onClick={handleSave}>حفظ التغييرات</Button>
      </div>
    </motion.div>
  );
}
