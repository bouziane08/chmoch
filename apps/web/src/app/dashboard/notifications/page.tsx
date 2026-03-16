"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsList } from "@/components/notifications/notifications-list";
import { NotificationSettings } from "@/components/notifications/notification-settings";

export default function NotificationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-right"
      dir="rtl"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">مركز الإشعارات</h1>
        <p className="text-muted-foreground">
          عرض وإدارة جميع الإشعارات الخاصة بك
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-start">
          <TabsList>
            <TabsTrigger value="all">جميع الإشعارات</TabsTrigger>
            <TabsTrigger value="unread">غير مقروءة</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4 outline-none">
          <NotificationsList filter="all" />
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 outline-none">
          <NotificationsList filter="unread" />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 outline-none">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
