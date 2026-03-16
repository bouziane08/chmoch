"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Permission {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

interface PermissionsTreeProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onToggle: (permissionId: string) => void;
  readOnly?: boolean;
}

export function PermissionsTree({
  permissions,
  selectedPermissions,
  onToggle,
  readOnly = false,
}: PermissionsTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      const category = permission.category || "آخر";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "users":
        return "👥";
      case "roles":
        return "🛡️";
      case "permissions":
        return "🔑";
      case "dashboard":
        return "📊";
      case "system":
        return "⚙️";
      default:
        return "📁";
    }
  };

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {Object.entries(groupedPermissions).map(([category, perms]) => (
          <div key={category} className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start font-medium"
              onClick={() => toggleCategory(category)}
            >
              {expandedCategories.has(category) ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}
              <span className="ml-2">{getCategoryIcon(category)}</span>
              {category}
              <span className="text-muted-foreground mr-auto text-xs">
                {perms.length}
              </span>
            </Button>

            {expandedCategories.has(category) && (
              <div className="mr-6 space-y-1">
                {perms.map((permission) => {
                  const isSelected = selectedPermissions.includes(
                    permission.id,
                  );

                  return (
                    <button
                      key={permission.id}
                      onClick={() => !readOnly && onToggle(permission.id)}
                      disabled={readOnly}
                      className={cn(
                        "flex w-full items-center rounded-lg px-3 py-2 text-sm",
                        "transition-colors duration-200",
                        !readOnly && "hover:bg-accent",
                        isSelected && "bg-accent",
                        readOnly && "cursor-default",
                      )}
                    >
                      <div
                        className={cn(
                          "ml-3 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground",
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <div className="flex-1 text-right">
                        <p className="font-medium">
                          {permission.name.split(":")[1] || permission.name}
                        </p>
                        {permission.description && (
                          <p className="text-muted-foreground text-xs">
                            {permission.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
