import {
  getMatchDetails,
  getMatchIds,
  getRankedProfile,
  getSummonerProfile,
} from "./riot"

export async function getProfileData(puuid: string) {
  // Matches
  const matchIdsResponse = await getMatchIds(puuid)

  const matchIds = await matchIdsResponse.json()

  const matchResults = await Promise.all(
    matchIds.map((id) => getMatchDetails(id))
  )

  const matchDetails = await Promise.all(
    matchResults.map((match) => match.json())
  )

  // Profile

  const summonerReponse = await getSummonerProfile(puuid)
  const summonerProfileData = await summonerReponse.json()
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/profileicon/${summonerProfileData.profileIconId}.png`

  const rankedReponse = await getRankedProfile(puuid)
  const rankedProfileData = await rankedReponse.json()

  //   console.log("rankedProfileData", rankedProfileData)

  //   console.log("summonerProfileData", summonerProfileData)

  return {
    profile: {
      profileIconUrl,
      summonerProfileData,
      rankedProfileData,
    },
    matches: matchDetails,
  }
}
