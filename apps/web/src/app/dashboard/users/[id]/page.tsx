"use client";

import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ArrowLeft, Mail, Calendar, Shield, Activity } from "lucide-react";


interface UserRole {
  id: string;
  name: string;
}


export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div className="flex h-100 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-100 flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">المستخدم غير موجود</h2>
        <Button onClick={() => router.push("/dashboard/users")}>
          <ArrowLeft className="ml-2 h-4 w-4" />
          العودة إلى المستخدمين
        </Button>
      </div>
    );
  }

  // دوال مساعدة للتعامل مع الحالة
  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE": return "نشط";
      case "INACTIVE": return "غير نشط";
      case "SUSPENDED": return "موقوف";
      case "PENDING_VERIFICATION": return "بانتظار التحقق";
      case "LOCKED": return "مقفل";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-green-500/10 text-green-500";
      case "INACTIVE": return "bg-yellow-500/10 text-yellow-500";
      case "SUSPENDED": return "bg-red-500/10 text-red-500";
      case "PENDING_VERIFICATION": return "bg-blue-500/10 text-blue-500";
      case "LOCKED": return "bg-orange-500/10 text-orange-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/users")}
          >
            <ArrowLeft className="ml-2 h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">تفاصيل المستخدم</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* بطاقة المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
            <CardDescription>بيانات المستخدم الشخصية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {user.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {user.profile?.firstName} {user.profile?.lastName}
                </h3>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="text-muted-foreground h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span>
                  تاريخ التسجيل:{" "}
                  {format(new Date(user.createdAt), "dd MMMM yyyy", {
                    locale: ar,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* بطاقة الحالة والأدوار */}
        <Card>
          <CardHeader>
            <CardTitle>حالة الحساب والأدوار</CardTitle>
            <CardDescription>حالة المستخدم وصلاحياته</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">الحالة:</span>
              <Badge
                variant="outline"
                className={getStatusColor(user.status)}
              >
                {getStatusText(user.status)}
              </Badge>
            </div>

            <div>
              <span className="text-sm font-medium">الأدوار:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {/* ✅ استخدام as UserRole[] لتجنب any */}
                {(user.roles as unknown as UserRole[] | undefined)?.map((role) => (
                  <Badge key={role.id} variant="secondary">
                    {role.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات إضافية */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">
            <Activity className="ml-2 h-4 w-4" />
            النشاطات
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="ml-2 h-4 w-4" />
            الأمان
          </TabsTrigger>
          <TabsTrigger value="sessions">الجلسات</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>سجل النشاطات</CardTitle>
              <CardDescription>آخر نشاطات المستخدم</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                قريباً - سجل النشاطات قيد التطوير
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>خيارات الأمان والمصادقة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                قريباً - إعدادات الأمان قيد التطوير
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sessions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>الجلسات النشطة</CardTitle>
              <CardDescription>أجهزة تسجيل الدخول النشطة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                قريباً - الجلسات النشطة قيد التطوير
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}