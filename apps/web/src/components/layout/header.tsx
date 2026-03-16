"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuthStore } from "@/store/auth.store";

export function Header() {
  // استدعاء المستخدم ودالة تسجيل الخروج من المتجر
  const { user, logout } = useAuthStore();

  // حساب الأحرف الأولى للاسم بشكل آمن
  const initials =
    user?.profile?.firstName && user?.profile?.lastName
      ? `${user.profile.firstName[0]}${user.profile.lastName[0]}`
      : user?.email
        ? user.email[0].toUpperCase()
        : "?";

  return (
    <header className="border-border bg-background flex h-16 items-center justify-between border-b px-6">
      {/* قسم البحث - تم ضبط الاتجاه للعربية */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-sm">
          <Search className="text-muted-foreground absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="بحث..."
            className="pr-10 text-right" // pr-10 لترك مساحة للأيقونة على اليمين
          />
        </div>
      </div>

      {/* الأزرار الجانبية */}
      <div className="flex items-center gap-4">
        {/* التنبيهات */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* نقطة التنبيه - تم استخدام ألوان تيلويند v4 */}
          <span className="bg-destructive absolute right-1.5 top-1.5 h-2 w-2 rounded-full" />
        </Button>

        <ThemeToggle />

        {/* قائمة المستخدم */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="border-border h-9 w-9 border">
                <AvatarImage src={user?.avatar} alt={user?.email} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="start">
            {" "}
            {/* align="start" لأن الصفحة RTL */}
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1 text-right">
                <p className="text-sm font-medium leading-none">
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer justify-end">
              <Link href="/dashboard/profile" className="w-full text-right">
                الملف الشخصي
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer justify-end">
              <Link href="/dashboard/settings" className="w-full text-right">
                الإعدادات
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer justify-end"
            >
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
