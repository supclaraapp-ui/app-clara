import { Search } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="w-8 h-8 text-primary" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-50" />
      </div>
      <span className="text-2xl font-bold text-primary">CLARA</span>
    </div>
  );
}