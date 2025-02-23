"use client";

import { IdCard } from "lucide-react";

export default function UserIdDisplay({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-2">
      <IdCard />
      <span className="font-semibold">{id}</span>
    </div>
  );
}
