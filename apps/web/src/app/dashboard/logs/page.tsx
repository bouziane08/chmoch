'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogsTable } from '@/components/logs/logs-table';
import { LogsFilters } from '@/components/logs/logs-filters';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useLogs, LogFilters } from '@/hooks/useLogs';
import { exportToCSV } from '@/lib/utils';

interface LogEntry {
  createdAt: string | Date;
  userName?: string;
  email?: string;
  action: string;
  details: string;
  severity: string;
  ipAddress?: string;
}

export default function LogsPage() {
  const [filters, setFilters] = useState<LogFilters>({});
  const { logs, isLoading, exportLogs } = useLogs(filters);

  const handleFilterChange = useCallback((newF: Partial<LogFilters>) => {
    setFilters((prev) => {
      const keys = Object.keys(newF) as Array<keyof LogFilters>;
      const isChanged = keys.some((key) => prev[key] !== newF[key]);
      if (!isChanged) return prev;
      return { ...prev, ...newF };
    });
  }, []);

  const handleDateChange = useCallback(
    ({ from, to }: { from?: Date; to?: Date }) => {
      setFilters((prev) => ({
        ...prev,
        startDate: from,
        endDate: to,
      }));
    },
    [],
  );

  const handleExport = async () => {
    try {
      const rawData = await exportLogs(filters);

      const formattedData = rawData.map((log: LogEntry) => ({
        التاريخ: new Date(log.createdAt).toLocaleString('ar-EG'),
        المستخدم: log.userName || log.email || 'غير معروف',
        العملية: log.action,
        التفاصيل: log.details,
        المستوى: log.severity,
        'عنوان IP': log.ipAddress || 'N/A',
      }));

      exportToCSV(
        formattedData,
        `activity-logs-${new Date().toISOString().split('T')[0]}`,
      );
    } catch (error) {
      console.error('خطأ في تصدير السجلات:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 text-right"
      dir="rtl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">سجلات النظام</h1>
          <p className="text-muted-foreground text-sm">
            راقب جميع تحركات المستخدمين والعمليات الحساسة في النظام
          </p>
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="gap-2 self-start"
          disabled={logs.length === 0}
        >
          <Download className="h-4 w-4" />
          تصدير البيانات (CSV)
        </Button>
      </div>

      <div className="bg-card flex flex-wrap items-end gap-4 rounded-xl border p-4 shadow-sm">
        <div className="space-y-2">
          <label className="pr-1 text-sm font-medium">نطاق التاريخ</label>
          <DateRangePicker onChange={handleDateChange} />
        </div>

        <div className="flex-1">
          <LogsFilters onChange={handleFilterChange} />
        </div>
      </div>

      <div className="bg-background overflow-hidden rounded-xl border shadow-sm">
        <LogsTable logs={logs} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
