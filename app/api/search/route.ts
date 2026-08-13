import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const gameName = params.get("gameName")
  const tagLine = params.get("tagLine")

  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  const data = await res.json()

  return NextResponse.json(data)
}
