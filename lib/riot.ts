import "server-only"

export type RankedEntry = {
  queueType: string
  tier: string
  rank: string
  puuid: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export type ChampionMastery = {
  puuid: string
  championId: number
  championLevel: number
  championPoints: number
}

export type MatchParticipant = {
  puuid: string
  teamId: number
  win: boolean
  championName: string
  champLevel: number
  summonerLevel: number
  riotIdGameName: string
  riotIdTagline: string
  teamPosition: string

  kills: number
  deaths: number
  assists: number
  pentaKills: number

  goldEarned: number
  totalMinionsKilled: number
  neutralMinionsKilled: number
  totalDamageDealtToChampions: number
  visionScore: number
  wardsPlaced: number
  wardsKilled: number
  detectorWardsPlaced: number

  summoner1Id: number
  summoner2Id: number
  summoner1Casts: number
  summoner2Casts: number

  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number

  challenges: {
    kda: number
    goldPerMinute: number
  }

  perks: {
    styles: {
      style: number
      selections: {
        perk: number
      }[]
    }[]
  }
}

export type MatchData = {
  metadata: {
    matchId: string
  }
  info: {
    queueId: number
    gameDuration: number
    gameEndTimestamp: number
    participants: MatchParticipant[]
  }
}

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

export async function getMatchIds(
  continent: string,
  puuid: string
): Promise<string[]> {
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

export async function getMatchDetails(
  continent: string,
  matchId: string
): Promise<MatchData> {
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

export async function getRankedProfile(
  region: string,
  puuid: string
): Promise<RankedEntry[]> {
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

export async function getChampionMasteryProfile(
  region: string,
  puuid: string
): Promise<ChampionMastery[]> {
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

export async function getAccountByPuuid(continent: string, puuid: string) {
  const response = await fetch(
    `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`,
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

type ChallengerEntry = {
  puuid: string
  leaguePoints: number
  rank: string
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export async function getTopChallengerPlayers(
  region: string,
  continent: string
) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`,

    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Riot API request failed: ${response.status}`)
  }

  const responseChallenger: ChallengerEntry[] = (
    await response.json()
  ).entries.slice(0, 5)

  const accountProfile = await Promise.all(
    responseChallenger.map((item) => getAccountByPuuid(continent, item.puuid))
  )

  const summonerProfile = await Promise.all(
    responseChallenger.map((item) => getSummonerProfile(region, item.puuid))
  )

  const profileIconUrl = summonerProfile.map(
    (item) =>
      `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/profileicon/${item.profileIconId}.png`
  )

  return responseChallenger.map((player, index) => ({
    ...player,
    accountProfile: accountProfile[index],
    summonerProfile: summonerProfile[index],
    profileIconUrl: profileIconUrl[index],
  }))
}
