"use client";

import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { hasPermission } from "@/lib/mockData";
import type { Permission } from "@/lib/mockData";
import type { Role } from "@/lib/mockData";
import type { RoleBaseProfileMenuItem } from "@/lib/menu";

function canShowItem(
  item: RoleBaseProfileMenuItem,
  userRole: Role,
  userPermissions: Permission[]
): boolean {
  if (item.type === "separator" || item.type === "label") return true;
  const roles = "roles" in item ? item.roles : undefined;
  const permissions = "permissions" in item ? item.permissions : undefined;
  if (roles != null && roles.length > 0 && !roles.includes(userRole)) return false;
  if (permissions != null && permissions.length > 0) {
    const hasAny = permissions.some((p) => hasPermission(userPermissions, p));
    if (!hasAny) return false;
  }
  return true;
}

export interface CustomDropdownMenuProps {
  menu: RoleBaseProfileMenuItem[];
  children: React.ReactNode;
  /** Called for button items with an id (e.g. "logout") when no onClick is on the item */
  onAction?: (id: string) => void;
  contentClassName?: string;
}

const CustomDropdownMenu = ({
  menu,
  children,
  onAction,
  contentClassName,
}: CustomDropdownMenuProps) => {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return null;

  const role = user.role;
  const permissions = user.permissions;

  const visibleItems = menu.filter((item) => canShowItem(item, role, permissions));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName ?? "w-48"} align="end">
        {visibleItems.map((item, index) => {
          if (item.type === "separator") {
            return <DropdownMenuSeparator key={`sep-${index}`} />;
          }
          if (item.type === "label") {
            return (
              <DropdownMenuLabel key={`lbl-${index}`}>{item.label}</DropdownMenuLabel>
            );
          }
          if (item.type === "link") {
            const Icon = item.icon;
            return (
              <DropdownMenuItem key={`link-${item.href}-${index}`} asChild>
                <Link href={item.href} className="flex cursor-pointer items-center gap-2">
                  {Icon != null && <Icon className="size-4 shrink-0" />}
                  <span>{item.label}</span>
                  {item.shortcut != null && (
                    <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          }
          if (item.type === "button") {
            const Icon = item.icon;
            const handleSelect = () => {
              if (item.onClick) {
                item.onClick();
              } else if (item.id != null && onAction) {
                onAction(item.id);
              }
            };
            return (
              <DropdownMenuItem
                key={`btn-${item.id ?? item.label}-${index}`}
                onSelect={handleSelect}
                className="flex cursor-pointer items-center gap-2"
              >
                {Icon != null && <Icon className="size-4 shrink-0" />}
                <span>{item.label}</span>
                {item.shortcut != null && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            );
          }
          return null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdownMenu;
