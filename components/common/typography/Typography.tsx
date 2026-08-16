type TypographyTypes = {
  children: React.ReactNode
  light?: boolean
  bold?: boolean
  small?: boolean
  sentenceCase?: boolean
}

export default function Typography({
  children,
  light = false,
  bold = false,
  small = false,
  sentenceCase = false,
}: TypographyTypes) {
  return (
    <p
      className={` ${light ? "text-muted-foreground" : ""} ${bold ? "font-bold" : ""} ${small ? "text-xs" : "text-sm"} ${sentenceCase ? "lowercase first-letter:uppercase" : ""} `}
    >
      {children}
    </p>
  )
}
