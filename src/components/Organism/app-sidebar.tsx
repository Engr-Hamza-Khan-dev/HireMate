"use client";

import { PanelLeftClose, PanelLeftOpen, FileStack } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../Atoms/button";
import { NavGroup } from "../Molecules/nav-group";
import { UpgradeBanner } from "../Molecules/upgrade-banner";
import { UserFooter } from "../Molecules/user-footer";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SIDEBAR_USER = {
  name: "Hamza Khan",
  email: "hamza@example.com",
  avatarUrl: "",
} as const;

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      aria-label="Application sidebar"
      className={cn(
        "flex h-screen flex-col border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* ── Header: Logo + Collapse toggle ── */}
      <div className="flex h-16 items-center justify-between border-b px-3">
        <div className="flex items-center gap-2">
          <FileStack 
            className={cn(
              "h-5 w-5 shrink-0 text-violet-600",
              collapsed ? "" : ""
            )} 
            aria-hidden="true" 
          />
          {!collapsed && (
            <span className="text-sm font-bold tracking-tight">HIREMATE</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="h-8 w-8 shrink-0"
          onClick={handleToggle}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* ── Navigation links ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavGroup collapsed={collapsed} />
      </div>

      <Separator />

      {/* ── Upgrade banner ── */}
      {/* {!collapsed && (
        <div className="px-3 py-4">
          <UpgradeBanner />
        </div>
      )}

      <Separator /> */}

      {/* ── User footer ── */}
      <div className="px-3 py-3">
        <UserFooter {...SIDEBAR_USER} collapsed={collapsed} />
      </div>
    </aside>
  );
}