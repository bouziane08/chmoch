"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Users,
  Lock,
  Unlock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRoles } from "@/hooks/useRoles";
import { Role } from "@/types/role";

interface RolesTableProps {
  onEdit: (role: Role) => void;
}

export function RolesTable({ onEdit }: RolesTableProps) {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    roleId: string;
  }>({
    open: false,
    roleId: "",
  });

  const { roles, isLoading, deleteRole } = useRoles();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">اسم الدور</TableHead>
              <TableHead className="text-right">الوصف</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">المستخدمين</TableHead>
              <TableHead className="text-right">الصلاحيات</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles?.map((role: Role) => (
              <TableRow key={role.id}>
                <TableCell className="text-right font-medium">
                  <div className="flex items-center gap-2">
                    <Shield className="text-muted-foreground h-4 w-4" />
                    {role.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {role.description || "-"}
                </TableCell>
                <TableCell className="text-right">
                  {role.isSystem ? (
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-500"
                    >
                      <Lock className="ml-1 h-3 w-3" /> نظامي
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Unlock className="ml-1 h-3 w-3" /> مخصص
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Users className="text-muted-foreground h-3 w-3" />
                    {role.usersCount || 0}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {role.permissions?.length || 0}
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="text-right">
                      <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(role)}>
                        <Edit className="ml-2 h-4 w-4" /> تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setDeleteDialog({ open: true, roleId: role.id })
                        }
                        disabled={role.isSystem}
                        className="text-red-600"
                      >
                        <Trash2 className="ml-2 h-4 w-4" /> حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <AlertDialogContent className="text-right" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف الدور نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteRole(deleteDialog.roleId);
                setDeleteDialog({ open: false, roleId: "" });
              }}
              className="bg-red-600"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
