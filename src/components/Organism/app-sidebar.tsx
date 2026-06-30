"use client";

import { PanelLeftClose, PanelLeftOpen, FileStack, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../Atoms/button";
import { NavGroup } from "../Molecules/nav-group";
import { UserFooter } from "../Molecules/user-footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SIDEBAR_USER = {
  name: "Hamza Khan",
  email: "hamza@example.com",
  avatarUrl: "",
} as const;

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const SidebarContent = () => (
    <>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavGroup collapsed={collapsed} />
      </div>
      <Separator />
      <div className="px-3 py-3">
        <UserFooter {...SIDEBAR_USER} collapsed={collapsed} />
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <aside
              aria-label="Application sidebar"
              className="flex h-full flex-col w-64"
            >
              <div className="flex h-16 items-center justify-between border-b px-3">
                <div className="flex items-center gap-2">
                  <FileStack className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                  <span className="text-sm font-bold tracking-tight">HIREMATE</span>
                </div>
              </div>
              <SidebarContent />
            </aside>
          </SheetContent>
        </Sheet>
      </div>

      <aside
        aria-label="Application sidebar"
        className={cn(
          "hidden lg:flex h-screen flex-col border-r transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-3">
          <div className="flex items-center gap-2">
            <FileStack className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
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
        <SidebarContent />
      </aside>
    </>
  );
}