"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Plus, Home, CreditCard, Target, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Plus, label: "Lançamentos", path: "/lancamentos" },
    { icon: CreditCard, label: "Cartões", path: "/cartoes" },
    { icon: Target, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 z-50 shadow-lg">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex-col gap-1 h-auto py-2 ${
                isActive 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => router.push(item.path)}
            >
              <Icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
