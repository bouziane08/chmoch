'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { UsersChart } from '@/components/dashboard/charts/users-chart';
import { ActivityChart } from '@/components/dashboard/charts/activity-chart';
import { SystemHealth } from '@/components/dashboard/system-health';
import { dashboardApi } from '@/lib/api/dashboard';

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardApi.getStats(),
  });

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-right text-3xl font-bold tracking-tight">
          لوحة التحكم
        </h1>
        <p className="text-muted-foreground text-right">
          مرحباً بك في لوحة تحكم النظام الموحدة
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <UsersChart data={stats?.timeline} />
        </div>
        <div className="space-y-6">
          <SystemHealth />
          <RecentActivity />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* التصحيح هنا: مررنا timeline بدلاً من activity لأن الرسم البياني يحتاج مصفوفات */}
        <ActivityChart data={stats?.timeline} />
      </div>
    </motion.div>
  );
}
