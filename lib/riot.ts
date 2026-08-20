import "server-only"

export async function getAccount(
  continent: string,
  gameName: string,
  tagLine: string
) {
  const response = await fetch(
    `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  return response.json()
}

export async function getMatchIds(continent: string, puuid: string) {
  const response = await fetch(
    `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=3`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  return response.json()
}

export async function getMatchDetails(continent: string, matchId: string) {
  const response = await fetch(
    `https://${continent}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
      cache: "force-cache",
    }
  )

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  return response.json()
}

export async function getSummonerProfile(region: string, puuid: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  return response.json()
}

export async function getRankedProfile(region: string, puuid: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  return response.json()
}

export async function getChampionMasteryProfile(region: string, puuid: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  return response.json()
}
