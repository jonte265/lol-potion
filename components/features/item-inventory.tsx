import Image from "next/image"

export default function ItemInventory({ item, size }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="shrink-0 rounded-xs bg-primary/40"
    >
      {item && (
        <Image
          className="rounded-xs"
          src={item.imageUrl}
          width={size}
          height={size}
          alt={`${item.itemInfo.name} icon`}
        />
      )}
    </div>
  )
}
