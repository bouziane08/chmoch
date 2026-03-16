"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  Activity,
  Shield,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last30days");

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard", "stats", dateRange],
    queryFn: () => dashboardApi.getStats(dateRange),
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="space-y-2 text-right">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  const userGrowthData =
    stats?.timeline.labels.map((label, index) => ({
      name: label,
      users: stats.timeline.users[index] ?? 0,
      registrations: stats.timeline.registrations[index] ?? 0,
    })) || [];

  const roleDistributionData = Object.entries(
    stats?.roles.usersPerRole || {},
  ).map(([name, value]) => ({ name, value }));

  const geographicData = Object.entries(stats?.geography.countries || {}).map(
    ([name, value]) => ({ name, value }),
  );

  const activeUsers = stats?.users.active ?? 0;
  const totalUsers = stats?.users.total ?? 1;
  const activePercentage = ((activeUsers / totalUsers) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 text-right"
    >
      {/* Header */}
      <div className="flex flex-row-reverse items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            التحليلات المتقدمة
          </h1>
          <p className="text-muted-foreground">رؤية شاملة لأداء المنصة</p>
        </div>
        <div className="flex flex-row-reverse items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className={cn("w-[180px] flex-row-reverse gap-2")}>
              <Calendar className="h-4 w-4" />
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="last7days">آخر 7 أيام</SelectItem>
              <SelectItem value="last30days">آخر 30 يوم</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex-row-reverse gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "المستخدمين",
            value: stats?.users.total,
            sub: `+${stats?.users.newThisMonth}`,
            icon: Users,
          },
          {
            title: "النشطين",
            value: activeUsers,
            sub: `${activePercentage}%`,
            icon: Activity,
          },
          {
            title: "النمو",
            value: `${stats?.users.growthRate.toFixed(1)}%`,
            sub: "شهرياً",
            icon: TrendingUp,
          },
          {
            title: "الدخول اليومي",
            value: stats?.activity.averagePerDay,
            sub: `الذروة: ${stats?.activity.peakHour}:00`,
            icon: Activity,
          },
        ].map((item, i) => (
          <Card key={i} className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row-reverse items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(item.value ?? 0).toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="users" className="space-y-4" dir="rtl">
        <TabsList className="bg-muted/50 border-border border">
          <TabsTrigger value="users">النمو</TabsTrigger>
          <TabsTrigger value="activity">النشاط</TabsTrigger>
          <TabsTrigger value="roles">الأدوار</TabsTrigger>
          <TabsTrigger value="geography">الجغرافيا</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="border-border shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>نمو القاعدة الجماهيرية</CardTitle>
              <CardDescription>
                مقارنة بين إجمالي المستخدمين والتسجيلات الجديدة
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      backgroundColor: "var(--color-card)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-primary)"
                    fill="var(--color-primary)"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="registrations"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border">
              <CardHeader className="text-right">
                <CardTitle>توزيع الأدوار</CardTitle>
                <CardDescription>
                  نسبة المستخدمين لكل رتبة في النظام
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                    >
                      {roleDistributionData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="text-right">
                <CardTitle>ملخص الصلاحيات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex flex-row-reverse items-center justify-between">
                  <div className="text-primary flex flex-row-reverse items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span className="text-foreground font-medium">
                      إجمالي الأدوار
                    </span>
                  </div>
                  <span className="text-xl font-bold">
                    {stats?.roles.total ?? 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <Card className="border-border shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>التوزيع الجغرافي</CardTitle>
              <CardDescription>أكثر الدول تفاعلاً مع المنصة</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geographicData} layout="vertical">
                  <XAxis type="number" stroke="var(--color-muted-foreground)" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="var(--color-muted-foreground)"
                    width={100}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="var(--color-primary)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
