import { getMatchIds } from "@/lib/riot"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const puuid = params.get("puuid")

  if (!puuid) {
    return NextResponse.json({ error: "PUUID is required" }, { status: 400 })
  }

  const resMatches = await getMatchIds(puuid)

  if (resMatches.status === 404) {
    return NextResponse.json({ error: "Match doesn't exist" }, { status: 404 })
  }

  if (!resMatches.ok) {
    return NextResponse.json(
      { error: "Something wrong with Riot API" },
      { status: resMatches.status }
    )
  }

  const data = await resMatches.json()

  return NextResponse.json(data)
}
