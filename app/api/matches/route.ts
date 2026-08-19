import { getMatchIds } from "@/lib/riot"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const puuid = params.get("puuid")

  if (!puuid) {
    return NextResponse.json({ error: "PUUID is required" }, { status: 400 })
  }

  const resMatches = await getMatchIds(puuid)

  return NextResponse.json(resMatches)
}
