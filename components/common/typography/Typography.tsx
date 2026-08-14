type TypographyTypes = {
  children: React.ReactNode
  light?: boolean
  bold?: boolean
}

export default function Typography({
  children,
  light = false,
  bold = false,
}: TypographyTypes) {
  return (
    <p
      className={` ${light ? "text-muted-foreground" : ""} ${bold ? "font-bold" : ""} text-sm`}
    >
      {children}
    </p>
  )
}
