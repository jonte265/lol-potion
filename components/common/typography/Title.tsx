import { ReactNode } from "react"

type TitleProp = {
  children: ReactNode
}

export default function Title({ children }: TitleProp) {
  return <h2 className="text-xl font-bold">{children}</h2>
}
