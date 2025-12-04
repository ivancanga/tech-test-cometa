import React from "react";

export function TerrainBadge({ children }: { children: string }) {
  return (
    <span className="px-2 py-1 rounded-md text-xs bg-violet-100 text-violet-700 font-medium font-semibold">
      {children}
    </span>
  );
}
