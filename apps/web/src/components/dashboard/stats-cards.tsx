"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Activity, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// تعريف واجهة البيانات لضمان عدم استخدام any وتحسين دعم TypeScript
interface StatsData {
  users?: {
    total: number;
    active: number;
    suspended: number;
    growthRate: number;
  };
  activity?: {
    totalLogins: number;
  };
  roles?: {
    total: number;
  };
  notifications?: {
    unread: number;
  };
}

interface StatsCardsProps {
  stats?: StatsData;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "إجمالي المستخدمين",
      value: stats?.users?.total || 0,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      change: stats?.users?.growthRate || 0,
    },
    {
      title: "المستخدمين النشطين",
      value: stats?.users?.active || 0,
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      // حساب النسبة المئوية للنشاط
      change: stats?.users?.total
        ? (stats.users.active / stats.users.total) * 100
        : 0,
      isPercentage: true,
    },
    {
      title: "المستخدمين الموقوفين",
      value: stats?.users?.suspended || 0,
      icon: UserX,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      change: 0,
    },
    {
      title: "تسجيلات الدخول اليوم",
      value: stats?.activity?.totalLogins || 0,
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      change: 0,
    },
    {
      title: "الأدوار",
      value: stats?.roles?.total || 0,
      icon: Shield,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      change: 0,
    },
    {
      title: "الإشعارات غير المقروءة",
      value: stats?.notifications?.unread || 0,
      icon: Bell,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      change: 0,
    },
  ];

  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      dir="rtl"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-none shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-xs font-bold">
                {card.title}
              </CardTitle>
              <div className={cn("rounded-lg p-1.5", card.bgColor)}>
                <card.icon className={cn("h-4 w-4", card.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold tracking-tight">
                {card.value.toLocaleString()}
              </div>
              {card.change > 0 && (
                <p className="mt-1 flex items-center gap-1 text-[10px]">
                  <span className="font-medium text-green-500">
                    +{card.change.toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground">
                    {card.isPercentage ? "نسبة النشاط" : "نمو شهري"}
                  </span>
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
