import { getMatchDetails, getMatchIds, getSummonerProfile } from "./riot"

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

  console.log("summonerProfileData", summonerProfileData)

  return {
    profile: {
      summonerProfileData,
      profileIconUrl,
    },
    matches: matchDetails,
  }
}
