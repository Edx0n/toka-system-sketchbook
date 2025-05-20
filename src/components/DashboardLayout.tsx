
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Home, List, LogOut, Motorcycle, Plus, Settings } from "lucide-react";

type NavItemProps = {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
};

const NavItem = ({ icon, text, active, onClick }: NavItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    }`}
  >
    <div className="mr-3">{icon}</div>
    <span>{text}</span>
  </div>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPage }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: "dashboard", icon: <Home size={20} />, text: "Dashboard", path: "/dashboard" },
    { id: "items", icon: <List size={20} />, text: "Itens", path: "/items" },
    { id: "new-item", icon: <Plus size={20} />, text: "Novo Item", path: "/items/new" },
    { id: "maintenance", icon: <Motorcycle size={20} />, text: "Manutenções", path: "/maintenance" },
    { id: "settings", icon: <Settings size={20} />, text: "Configurações", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`bg-sidebar transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {sidebarOpen ? (
            <div className="text-sidebar-foreground text-xl font-bold">TOKA-SYSTEM</div>
          ) : (
            <div className="text-sidebar-foreground text-xl font-bold mx-auto">TS</div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-sidebar-foreground hover:text-primary"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              text={sidebarOpen ? item.text : ""}
              active={currentPage === item.id}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-sidebar-border">
          {sidebarOpen ? (
            <div className="flex flex-col space-y-2">
              <div className="text-sidebar-foreground">
                <span className="block">Olá, {user?.name}</span>
                <span className="block text-sm opacity-70">{user?.email}</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent"
                onClick={logout}
              >
                <LogOut size={16} className="mr-2" /> Sair
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="icon"
                className="text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent" 
                onClick={logout}
              >
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
