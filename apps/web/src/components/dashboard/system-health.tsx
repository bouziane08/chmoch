import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, Database } from "lucide-react";

export function SystemHealth() {
  const stats = [
    {
      name: "الخادم (Server)",
      status: "تشغيل",
      icon: Server,
      color: "text-green-500",
    },
    {
      name: "قاعدة البيانات",
      status: "مستقر",
      icon: Database,
      color: "text-blue-500",
    },
    {
      name: "وقت الاستجابة",
      status: "24ms",
      icon: Activity,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium">حالة النظام</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium">{item.status}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
