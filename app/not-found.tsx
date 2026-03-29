"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-card border border-border rounded-sm">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-muted-foreground">error.sh</span>
          </div>
          <div className="p-8 space-y-4">
            <p className="text-destructive text-xl font-bold">404</p>
            <p className="text-muted-foreground">
              <span className="text-primary">$</span> Page not found
            </p>
            <p className="text-muted-foreground text-sm">
              The requested resource could not be located.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-background transition-colors"
            >
              [Return Home]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
