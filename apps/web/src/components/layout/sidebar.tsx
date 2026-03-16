"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth.store";
import {
  LayoutDashboard,
  Users,
  Shield,
  Activity,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Key,
  BarChart3,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "المستخدمين",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "الأدوار",
    href: "/dashboard/roles",
    icon: Shield,
  },
  {
    name: "السجلات",
    href: "/dashboard/logs",
    icon: Activity,
  },
  {
    name: "الإشعارات",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "التحليلات",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "المصادقة الثنائية",
    href: "/dashboard/2fa",
    icon: Key,
  },
  {
    name: "الإعدادات",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className={cn(
        "bg-card relative flex h-screen flex-col border-l",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent"
          >
            Enterprise
          </motion.h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("mr-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          if (collapsed) {
            return (
              <TooltipProvider key={item.href}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        "transition-colors duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-4 py-2",
                "transition-colors duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent",
              )}
            >
              <item.icon className="ml-3 h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mx-auto h-10 w-10"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>تسجيل الخروج</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={logout}>
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
