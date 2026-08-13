type TypographyTypes = {
  children: React.ReactNode
  light?: boolean
}

export default function Typography({
  children,
  light = false,
}: TypographyTypes) {
  return (
    <p className={` ${light ? "text-muted-foreground" : ""} `}>{children}</p>
  )
}
