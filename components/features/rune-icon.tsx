import Image from "next/image"

export default function RuneIcon({ runeInfo, size }) {
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
