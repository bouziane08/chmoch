"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
          <Icon className="text-muted-foreground h-10 w-10" />
        </div>
      )}

      <h3 className="mt-4 text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">
          {description}
        </p>
      )}

      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
