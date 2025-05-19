import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  School,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon: Icon, label, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isCollapsed ? "justify-center" : "",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )
    }
  >
    <Icon className="h-5 w-5" />
    {!isCollapsed && <span>{label}</span>}
    {isCollapsed && <span className="sr-only">{label}</span>}
  </NavLink>
);

export const SidebarNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();

  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-msgames-500 flex items-center justify-center text-white font-bold">
              MS
            </div>
            <span className="font-semibold text-lg">MSGames Admin</span>
          </div>
        ) : (
          <div className="mx-auto h-8 w-8 rounded-md bg-msgames-500 flex items-center justify-center text-white font-bold">
            MS
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto py-6 px-3 space-y-1">
        <NavItem
          to="/"
          icon={LayoutDashboard}
          label="Dashboard"
          isCollapsed={collapsed}
        />
        <NavItem
          to="/institutes"
          icon={School}
          label="Institutes"
          isCollapsed={collapsed}
        />
        <NavItem
          to="/simulations"
          icon={Gamepad2}
          label="Simulations"
          isCollapsed={collapsed}
        />
        <NavItem
          to="/users"
          icon={Users}
          label="Users"
          isCollapsed={collapsed}
        />
      </div>

      <div className="border-t border-sidebar-border p-3 space-y-1">
        {!collapsed && user && (
          <div className="px-3 py-2 text-sm">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-sidebar-foreground/70">
              {user.email}
            </div>
          </div>
        )}

        <NavItem
          to="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={collapsed}
        />
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2",
            collapsed ? "justify-center" : "justify-start"
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn("mt-2", collapsed ? "mx-auto" : "ml-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
