import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = "terminal", children, className }: TerminalWindowProps) => {
  return (
    <div className={cn("terminal-window", className)}>
      <div className="terminal-header">
        <div className="terminal-dot bg-destructive" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-2 text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;