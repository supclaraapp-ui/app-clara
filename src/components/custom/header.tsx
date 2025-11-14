"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showAddButton?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
}

export function Header({
  title,
  subtitle,
  showAddButton = true,
  showNotifications = true,
  showSettings = false,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            {title && (
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showNotifications && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => router.push("/notificacoes")}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            )}
            
            {showSettings && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/configuracoes")}
              >
                <Settings className="w-5 h-5" />
              </Button>
            )}

            {showAddButton && (
              <Button
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => router.push("/lancamentos")}
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
