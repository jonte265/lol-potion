import { ReactNode } from "react"

type TitleProp = {
  children: ReactNode
  light?: boolean
}

export default function Title({ children, light = false }: TitleProp) {
  return (
    <h2
      className={`text-xl font-bold ${light ? "text-muted-foreground" : ""} `}
    >
      {children}
    </h2>
  )
}
