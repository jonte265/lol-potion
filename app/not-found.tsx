import Typography from "@/components/common/typography/Typography"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Typography>Profile not found</Typography>
      <Link className="underline" href="/">
        Go home
      </Link>
    </div>
  )
}
