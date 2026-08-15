type TypographyTypes = {
  children: React.ReactNode
  light?: boolean
  bold?: boolean
  small?: boolean
}

export default function Typography({
  children,
  light = false,
  bold = false,
  small = false,
}: TypographyTypes) {
  return (
    <p
      className={` ${light ? "text-muted-foreground" : ""} ${bold ? "font-bold" : ""} ${small ? "text-xs" : "text-sm"} `}
    >
      {children}
    </p>
  )
}
