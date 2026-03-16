"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  MoreHorizontal,
  Shield,
  Trash2,
  Eye,
  Ban,
  CheckCircle,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useUsers } from "@/hooks/useUsers";

type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "PENDING_VERIFICATION"
  | "LOCKED";

// ✅ تعريف نوع الدور بشكل صحيح
interface UserRole {
  id: string;
  name: string;
}

// ✅ تعريف المستخدم بشكل صحيح
interface User {
  id: string;
  email: string;
  status: UserStatus;
  roles: UserRole[];  // ✅ roles هي مصفوفة من objects
  createdAt: string | Date;
  avatar?: string;
  profile?: {
    firstName: string;
    lastName: string;
  };
}

const statusColors: Record<UserStatus, string> = {
  ACTIVE: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  INACTIVE: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  SUSPENDED: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  PENDING_VERIFICATION: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  LOCKED: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
};

interface UsersTableProps {
  search?: string;
  status?: string;
  role?: string;
}

export function UsersTable({  }: UsersTableProps) {
  const router = useRouter();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    userId: string;
  }>({
    open: false,
    userId: "",
  });

  const { users, isLoading, deleteUser, updateStatus } = useUsers();

  const handleDelete = (userId: string) => {
    setDeleteDialog({ open: true, userId });
  };

  const confirmDelete = () => {
    deleteUser(deleteDialog.userId);
    setDeleteDialog({ open: false, userId: "" });
  };

  if (isLoading) {
    return (
      <div className="flex h-100 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="border-border rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المستخدم</TableHead>
              <TableHead className="text-right">البريد الإلكتروني</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الأدوار</TableHead>
              <TableHead className="text-right">تاريخ التسجيل</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {user.profile?.firstName} {user.profile?.lastName}
                      </p>
                      <p className="text-muted-foreground font-mono text-xs">
                        {user.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${statusColors[user.status]} border-none`}
                  >
                    {user.status === "ACTIVE" && "نشط"}
                    {user.status === "INACTIVE" && "غير نشط"}
                    {user.status === "SUSPENDED" && "موقوف"}
                    {user.status === "PENDING_VERIFICATION" && "بانتظار التحقق"}
                    {user.status === "LOCKED" && "مقفل"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {/* ✅ هنا التعديل المهم - role object */}
                    {user.roles?.map((role) => (
                      <Badge
                        key={role.id} 
                        variant="secondary"
                        className="px-1 py-0 text-[10px]"
                      >
                        {role.name}  
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {user.createdAt
                    ? format(new Date(user.createdAt), "dd/MM/yyyy", {
                        locale: ar,
                      })
                    : "-"}
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="rtl">
                      <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/dashboard/users/${user.id}`)
                        }
                      >
                        <Eye className="ml-2 h-4 w-4" />
                        عرض التفاصيل
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/dashboard/users/${user.id}/edit`)
                        }
                      >
                        <Shield className="ml-2 h-4 w-4" />
                        تعديل الصلاحيات
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "ACTIVE" ? (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus({ id: user.id, status: "SUSPENDED" })
                          }
                          className="text-yellow-600"
                        >
                          <Ban className="ml-2 h-4 w-4" />
                          تعليق الحساب
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus({ id: user.id, status: "ACTIVE" })
                          }
                          className="text-green-600"
                        >
                          <CheckCircle className="ml-2 h-4 w-4" />
                          تفعيل الحساب
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 focus:bg-red-50"
                      >
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              هل أنت متأكد؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المستخدم وجميع بياناته
              بشكل نهائي من النظام.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              تأكيد الحذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}