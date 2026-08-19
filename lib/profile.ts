import {
  getChampionMasteryProfile,
  getMatchDetails,
  getMatchIds,
  getRankedProfile,
  getSummonerProfile,
} from "./riot"

export async function getProfileData(puuid: string) {
  // Matches
  const matchIds = await getMatchIds(puuid)

  const matchDetails = await Promise.all(
    matchIds.map((id) => getMatchDetails(id))
  )

  // Profile

  const summonerProfileData = await getSummonerProfile(puuid)
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/profileicon/${summonerProfileData.profileIconId}.png`

  const rankedProfileData = await getRankedProfile(puuid)

  const masteryProfileData = await getChampionMasteryProfile(puuid)

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
