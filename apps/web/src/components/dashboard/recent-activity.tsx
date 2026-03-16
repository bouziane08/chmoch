"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardApi } from "@/lib/api/dashboard";
import { ActivityLog } from "@/types/log";

export function RecentActivity() {
  const { data: activities, isLoading } = useQuery<ActivityLog[]>({
    queryKey: ["recent-activity"],
    queryFn: () => dashboardApi.getRecentActivity(10),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-right text-lg font-medium">آخر النشاطات</h3>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-row-reverse items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2 text-right">
              <Skeleton className="ml-auto h-4 w-[140px]" />
              <Skeleton className="ml-auto h-3 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getActionColor = (action: string) => {
    const act = action.toUpperCase();
    if (act.includes("LOGIN"))
      return "bg-green-500/10 text-green-500 border-green-500/20";
    if (act.includes("DELETE"))
      return "bg-red-500/10 text-red-500 border-red-500/20";
    if (act.includes("CREATE"))
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    if (act.includes("UPDATE"))
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-right text-lg font-medium">آخر النشاطات</h3>
      <div className="space-y-4">
        {activities?.map((activity: ActivityLog) => {
          // حل مشكلة السطر 68: استخراج الرسالة بأمان دون استخدام any
          const detailMessage =
            typeof activity.details?.message === "string"
              ? activity.details.message
              : activity.action;

          return (
            <div
              key={activity.id}
              className="flex flex-row-reverse items-start gap-4 text-right"
            >
              <Avatar className="border-border h-9 w-9 border">
                <AvatarImage src={activity.user?.profile?.avatar} />
                <AvatarFallback className="bg-primary/5 text-primary text-xs">
                  {activity.user?.email?.[0].toUpperCase() || "S"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex flex-row-reverse items-center justify-start gap-2">
                  <p className="truncate text-sm font-semibold">
                    {activity.user?.profile?.firstName
                      ? `${activity.user.profile.firstName} ${activity.user.profile.lastName || ""}`
                      : activity.user?.email || "نظام آلي"}
                  </p>
                  <Badge
                    variant="outline"
                    className={getActionColor(activity.action)}
                  >
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {detailMessage}
                </p>
                <p className="text-muted-foreground/70 text-[10px]">
                  {formatDistanceToNow(new Date(activity.createdAt), {
                    addSuffix: true,
                    locale: ar,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
