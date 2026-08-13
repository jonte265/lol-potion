import type { ReactNode } from "react"

type H2Props = {
  children: ReactNode
}

export default function H2({ children }: H2Props) {
  return <h2 className="font-bold">{children}</h2>
}
