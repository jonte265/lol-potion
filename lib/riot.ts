import "server-only"

export async function getAccount(gameName: string, tagLine: string) {
  return fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )
}

export async function getMatchIds(puuid: string) {
  return fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )
}

export async function getMatchDetails(matchId: string) {
  return fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
      cache: "force-cache",
    }
  )
}

export async function getSummonerProfile(puuid: string) {
  return fetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )
}

export async function getRankedProfile(puuid: string) {
  return fetch(
    `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )
}

export async function getChampionMasteryProfile(puuid: string) {
  return fetch(
    `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`,
    {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY!,
      },
    }
  )
}
