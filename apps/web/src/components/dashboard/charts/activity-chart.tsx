"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/dashboard";

// تعريف الواجهة لتجنب خطأ "any"
interface ActivityChartProps {
  data?: DashboardStats["timeline"];
}

export function ActivityChart({ data }: ActivityChartProps) {
  // تحويل البيانات لشكل يفهمه Recharts مع قيم افتراضية لمنع الأخطاء
  const chartData =
    data?.labels?.map((label, index) => ({
      name: label,
      logins: data.logins[index] || 0,
    })) || [];

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold tracking-tight">
          نشاط تسجيل الدخول
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              {/* شبكة خلفية ناعمة - تستخدم حدود الثيم من v4 */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-border)"
              />

              <XAxis
                dataKey="name"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />

              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              {/* تخصيص التلميح ليدعم الوضع الليلي واللغة العربية */}
              <Tooltip
                cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
                contentStyle={{
                  backgroundColor: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "right",
                }}
                itemStyle={{ color: "var(--color-primary)", fontSize: "12px" }}
              />

              <Bar
                dataKey="logins"
                // استخدام لون البريماري المعرف في globals.css
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                barSize={32}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
