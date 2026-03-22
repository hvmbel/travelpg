import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-surface-secondary/95 px-4 py-4 backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700">
        AN
      </div>
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-primary shadow-sm transition-colors hover:bg-zinc-100"
        aria-label="Уведомления"
      >
        <Bell className="h-5 w-5 text-text-primary" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}
