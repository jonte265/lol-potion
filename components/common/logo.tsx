import { getItemImageUrl } from "@/lib/ddragon"
import Image from "next/image"
import Link from "next/link"
import Title from "./typography/Title"

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex flex-row items-center justify-center gap-1">
        <Image
          className="rounded-xs"
          src={getItemImageUrl("2003.png")}
          width={25}
          height={25}
          alt={`Health potion icon`}
        />
        <div className="sm:hidden">
          <Title>LP</Title>
        </div>

        <div className="hidden sm:block">
          <Title>LoL Potion</Title>
        </div>
      </div>
    </Link>
  )
}
