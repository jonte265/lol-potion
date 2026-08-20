import { formatRegion } from "./region"
import {
  getChampionMasteryProfile,
  getMatchDetails,
  getMatchIds,
  getRankedProfile,
  getSummonerProfile,
} from "./riot"

export async function getProfileData(region: string, puuid: string) {
  const routingRegion = formatRegion(region)

  if (!routingRegion) {
    throw new Error("Invalid region")
  }

  // Matches
  const matchIds = await getMatchIds(routingRegion, puuid)

  const matchDetails = await Promise.all(
    matchIds.map((id) => getMatchDetails(routingRegion, id))
  )

  // Profile

  const [summonerProfileData, rankedProfileData, masteryProfileData] =
    await Promise.all([
      getSummonerProfile(region, puuid),
      getRankedProfile(region, puuid),
      getChampionMasteryProfile(region, puuid),
    ])

  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/profileicon/${summonerProfileData.profileIconId}.png`

  return {
    profile: {
      profileIconUrl,
      summonerProfileData,
      rankedProfileData,
    },
    matches: matchDetails,
    masteryProfileData,
  }
}
