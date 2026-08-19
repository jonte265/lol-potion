import { getAccount } from "@/lib/riot"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const gameName = params.get("gameName")
  const tagLine = params.get("tagLine")

  if (!gameName || !tagLine) {
    return NextResponse.json(
      { error: "Game Name and Tagline are required" },
      { status: 400 }
    )
  }

  const account = await getAccount(gameName, tagLine)

  if (!account) {
    return NextResponse.json(
      { error: "Account doesn't exist" },
      { status: 404 }
    )
  }

  return NextResponse.json(account)
}
