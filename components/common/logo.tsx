import Link from "next/link"
import React from "react"

export default function Logo() {
  return (
    <Link href={"/"}>
      <h2 className="text-2xl font-bold">LoLPotion</h2>
    </Link>
  )
}
