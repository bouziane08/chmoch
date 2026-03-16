"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, User as UserIcon, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth.store";
import { useProfile } from "@/hooks/useUsers";

// 1. تعريف المخططات (Schemas)
const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "الاسم الأول مطلوب")
    .optional()
    .or(z.literal("")),
  lastName: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  bio: z.string().max(500, "الحد الأقصى 500 حرف").optional().or(z.literal("")),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(8, "كلمة المرور يجب أن لا تقل عن 8 أحرف"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const {
    updateProfile,
    changePassword,
    uploadAvatar,
    isUpdating,
    isChangingPassword,
    isUploading,
  } = useProfile();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.profile?.firstName || "",
      lastName: user?.profile?.lastName || "",
      phone: user?.profile?.phone || "",
      bio: user?.profile?.bio || "",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile(data);
      if (user) {
        updateUser({
          ...user,
          profile: {
            ...user.profile,
            firstName: data.firstName || user.profile?.firstName,
            lastName: data.lastName || user.profile?.lastName,
            phone: data.phone || user.profile?.phone,
            bio: data.bio || user.profile?.bio,
          },
        });
      }
      toast.success("تم تحديث الملف الشخصي بنجاح");
    } catch (_error) {
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      passwordForm.reset();
      toast.success("تم تغيير كلمة المرور بنجاح");
    } catch (_error) {
      toast.error("كلمة المرور الحالية غير صحيحة");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024)
        return toast.error("حجم الملف كبير جداً (أقصى حد 2MB)");
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    try {
      await uploadAvatar(avatarFile);
      toast.success("تم تحديث الصورة الشخصية");
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (_error) {
      toast.error("فشل تحميل الصورة");
    }
  };

  const initials =
    user?.profile?.firstName && user?.profile?.lastName
      ? `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase()
      : user?.email?.[0]?.toUpperCase() || "U";

  // --- حل مشكلة السطر 140 النهائي ---
  // نقوم بالوصول لـ avatar من الكائن الأصلي للمستخدم وليس من الـ profile المرتبط بالـ Schema
  const userAvatar =
    user?.profile && "avatar" in user.profile
      ? (user.profile as { avatar?: string }).avatar
      : user?.avatar;

  const currentAvatarUrl = avatarPreview || userAvatar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4 text-right md:p-8"
      dir="rtl"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">إعدادات الحساب</h1>
        <p className="text-muted-foreground">
          قم بتحديث معلوماتك الشخصية وتأمين حسابك
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="border-border/50 h-fit md:col-span-4">
          <CardHeader className="text-right">
            <CardTitle className="text-lg">الصورة الشخصية</CardTitle>
            <CardDescription>
              ستظهر هذه الصورة في جميع صفحات النظام
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="group relative">
              <Avatar className="border-background h-40 w-40 border-4 shadow-xl">
                <AvatarImage src={currentAvatarUrl} className="object-cover" />
                <AvatarFallback className="bg-primary/5 text-primary text-4xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="bg-primary text-primary-foreground absolute bottom-1 left-1 cursor-pointer rounded-full p-3 shadow-lg transition-transform hover:scale-110"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            {avatarFile && (
              <div className="flex w-full gap-2">
                <Button
                  onClick={handleAvatarUpload}
                  disabled={isUploading}
                  className="flex-1"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "حفظ"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAvatarFile(null);
                    setAvatarPreview(null);
                  }}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 md:col-span-8">
          <Tabs defaultValue="profile" className="w-full">
            <CardHeader className="border-border/40 border-b">
              <div className="flex items-center justify-between">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="profile" className="gap-2">
                    <UserIcon className="h-4 w-4" /> الملف الشخصي
                  </TabsTrigger>
                  <TabsTrigger value="password" className="gap-2">
                    <ShieldCheck className="h-4 w-4" /> الأمان
                  </TabsTrigger>
                </TabsList>
                <CardTitle className="hidden text-xl font-semibold md:block">
                  تعديل البيانات
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <TabsContent value="profile" className="mt-0">
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="text-right">
                            <FormLabel>الاسم الأول</FormLabel>
                            <FormControl>
                              <Input {...field} className="text-right" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="text-right">
                            <FormLabel>الاسم الأخير</FormLabel>
                            <FormControl>
                              <Input {...field} className="text-right" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="text-right">
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="text-right"
                              dir="ltr"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem className="text-right">
                          <FormLabel>نبذة تعريفية</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              className="resize-none text-right"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="w-full px-8 md:w-auto"
                    >
                      {isUpdating && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                      حفظ التغييرات
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="password">
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem className="text-right">
                          <FormLabel>كلمة المرور الحالية</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="text-right">
                          <FormLabel>كلمة المرور الجديدة</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="text-right">
                          <FormLabel>تأكيد كلمة المرور</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full px-8 md:w-auto"
                    >
                      {isChangingPassword && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                      تحديث الأمان
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </motion.div>
  );
}
