import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/Authcontext";

interface UserFooterProps {
  name: string;
  email: string;
  avatarUrl?: string;
  collapsed?: boolean;
}
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserFooter({ name, email, avatarUrl, collapsed = false }: UserFooterProps) {
  const { logout } = useAuth();

  // Show a skeleton while user data hasn't arrived yet
  if (!name) {
    return (
      <div className="flex items-center gap-3 rounded-lg px-3 py-2">
        <div className="h-8 w-8 shrink-0 rounded-full bg-muted animate-pulse" />
        {!collapsed && (
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            <div className="h-2.5 w-36 rounded bg-muted animate-pulse" />
          </div>
        )}
      </div>
    );
  }

  const content = (
    <button
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
      aria-label="User menu"
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="text-xs bg-brand-100 text-brand-600">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {!collapsed && (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{name}</p>
            <p className="truncate text-xs text-sidebar-foreground/70">{email}</p>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </>
      )}
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {content}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-52">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Account Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={logout}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
