"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CopyButton({ value }: { value: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={() => navigator.clipboard.writeText(value)}
      aria-label="Copy Riot ID"
    >
      <Copy className="size-4" />
    </Button>
  )
}
