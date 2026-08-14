import { getMatchDetails, getMatchIds } from "./riot"

export async function getProfileData(puuid: string) {
  const matchIdsResponse = await getMatchIds(puuid)

  const matchIds = await matchIdsResponse.json()

  const matchResults = await Promise.all(
    matchIds.map((id) => getMatchDetails(id))
  )

  const matchDetails = await Promise.all(
    matchResults.map((match) => match.json())
  )

  //   console.log("results", matchResults)
  //   console.log("matchDetails", matchDetails)

  return matchDetails
}
