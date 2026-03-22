import { cn } from "@/lib/utils";

type MobileShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function MobileShell({ children, className }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-surface-secondary px-0 sm:px-6 sm:py-4">
      <div
        className={cn(
          "relative mx-auto min-h-screen max-w-[430px] bg-surface-secondary pb-[max(env(safe-area-inset-bottom),5rem)]",
          "sm:min-h-[860px] sm:rounded-[28px] sm:border sm:border-zinc-200 sm:shadow-xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
