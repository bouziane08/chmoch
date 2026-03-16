"use client";

import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Log } from "@/hooks/useLogs";

interface LogsTableProps {
  logs: Log[];
  isLoading: boolean;
}

export function LogsTable({ logs, isLoading }: LogsTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600 hover:bg-red-600";
      case "ERROR":
        return "bg-red-500 hover:bg-red-500";
      case "WARN":
        return "bg-orange-500 hover:bg-orange-500";
      default:
        return "bg-blue-500 hover:bg-blue-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">التاريخ</TableHead>
          <TableHead className="text-right">المستخدم</TableHead>
          <TableHead className="text-right">العملية</TableHead>
          <TableHead className="text-right">التفاصيل</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">IP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-muted-foreground py-10 text-center"
            >
              لا توجد سجلات مطابقة للبحث
            </TableCell>
          </TableRow>
        ) : (
          logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap font-mono text-xs">
                {format(new Date(log.createdAt), "yyyy-MM-dd HH:mm", {
                  locale: ar,
                })}
              </TableCell>
              <TableCell className="font-medium">{log.userName}</TableCell>
              <TableCell className="text-xs">{log.action}</TableCell>
              <TableCell className="text-muted-foreground max-w-[200px] truncate text-xs">
                {log.details}
              </TableCell>
              <TableCell>
                <Badge className={getSeverityColor(log.severity)}>
                  {log.severity}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">
                {log.ipAddress}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
