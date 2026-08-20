import Image from "next/image"

type RuneIconProps = {
  runeInfo: {
    name: string
    imageUrl: string
  } | null
  size: number
}

export default function RuneIcon({ runeInfo, size }: RuneIconProps) {
  if (!runeInfo) return null

  return (
    <div>
      <Image
        className="rounded-xs"
        src={runeInfo.imageUrl}
        width={size}
        height={size}
        alt={`${runeInfo.name} icon`}
      />
    </div>
  )
}
