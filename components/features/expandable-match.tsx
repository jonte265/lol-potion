"use client"

import { ReactNode, useState } from "react"
import { Button } from "../ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

type Props = {
  children: ReactNode
  expandedContent: ReactNode
}

export default function ExpandableMatch({ children, expandedContent }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        {children}
        {/* Column 6 */}
        <div className="flex h-full flex-col justify-end">
          <Button
            // className={`${player.win ? "bg-primary/30" : "bg-destructive/20"}`}
            size={"icon-sm"}
            aria-label="Show match details"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </div>
      {open && expandedContent}
    </>
  )
}
