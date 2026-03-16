"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolesTable } from "@/components/roles/roles-table";
import { RoleDialog } from "@/components/roles/role-dialog";
import { PermissionsList } from "@/components/roles/permissions-list";
import { Role } from "@/types/role";

function RolesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingRole(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 text-right"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة الأدوار</h1>
          <p className="text-muted-foreground">
            إدارة أدوار المستخدمين وتحديد الصلاحيات
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          دور جديد
        </Button>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="bg-muted/50 border-border border">
          <TabsTrigger value="roles">الأدوار</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <RolesTable onEdit={handleEdit} />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <PermissionsList />
        </TabsContent>
      </Tabs>

      <RoleDialog
        open={dialogOpen}
        onOpenChange={handleDialogChange}
        role={editingRole || undefined}
      />
    </motion.div>
  );
}

// التصدير في سطر منفصل لضمان تعرف Next.js عليه
export default RolesPage;
