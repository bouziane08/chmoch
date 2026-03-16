"use client";

import { useState } from "react";
import { Bell, Mail, Shield, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    loginAlerts: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save settings to API
    toast.success("تم حفظ إعدادات الإشعارات");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الإشعارات</CardTitle>
          <CardDescription>
            تحكم في كيفية استلامك للإشعارات والتنبيهات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-5 w-5" />
                <div>
                  <Label htmlFor="email">الإشعارات عبر البريد الإلكتروني</Label>
                  <p className="text-muted-foreground text-sm">
                    استلام الإشعارات على بريدك الإلكتروني
                  </p>
                </div>
              </div>
              <Switch
                id="email"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="text-muted-foreground h-5 w-5" />
                <div>
                  <Label htmlFor="push">الإشعارات الفورية</Label>
                  <p className="text-muted-foreground text-sm">
                    استلام الإشعارات مباشرة في المتصفح
                  </p>
                </div>
              </div>
              <Switch
                id="push"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-muted-foreground h-5 w-5" />
                <div>
                  <Label htmlFor="security">تنبيهات الأمان</Label>
                  <p className="text-muted-foreground text-sm">
                    إشعارات حول تسجيل الدخول والتغييرات الأمنية
                  </p>
                </div>
              </div>
              <Switch
                id="security"
                checked={settings.securityAlerts}
                onCheckedChange={() => handleToggle("securityAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-muted-foreground h-5 w-5" />
                <div>
                  <Label htmlFor="digest">الملخص الأسبوعي</Label>
                  <p className="text-muted-foreground text-sm">
                    ملخص أسبوعي للنشاطات والإشعارات
                  </p>
                </div>
              </div>
              <Switch
                id="digest"
                checked={settings.weeklyDigest}
                onCheckedChange={() => handleToggle("weeklyDigest")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-muted-foreground h-5 w-5" />
                <div>
                  <Label htmlFor="login">تنبيهات تسجيل الدخول</Label>
                  <p className="text-muted-foreground text-sm">
                    إشعار عند تسجيل الدخول من جهاز جديد
                  </p>
                </div>
              </div>
              <Switch
                id="login"
                checked={settings.loginAlerts}
                onCheckedChange={() => handleToggle("loginAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-5 w-5" />
                <div>
                  <Label htmlFor="marketing">العروض والتسويق</Label>
                  <p className="text-muted-foreground text-sm">
                    استلام عروض ورسائل تسويقية
                  </p>
                </div>
              </div>
              <Switch
                id="marketing"
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            حفظ الإعدادات
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
