export function getChampionImageUrl(championName: string) {
  return `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/champion/${championName}.png`
}

export function getSummonerSpellsImageUrl(spellId: number) {
  return `https://ddragon.leagueoflegends.com/cdn/16.16.1/img/spell/${spellId}`
}

export function getRuneImageUrl(runeName: string) {
  return `https://ddragon.leagueoflegends.com/cdn/img/${runeName}`
}

export async function getSummonerSpellsInfo(spellId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/summoner.json",
    {
      cache: "force-cache",
    }
  )

  const spellInfo = await res.json()

  const spellArray = Object.values(spellInfo.data)

  const exactSpellInfo = spellArray.find(
    (spell) => Number(spell.key) === spellId
  )

  return exactSpellInfo
}

export async function getRunesInfo(runeId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/runesReforged.json",
    {
      cache: "force-cache",
    }
  )

  const runeInfo = await res.json()

  const allRunes = runeInfo
    .flatMap((runeTree) => runeTree.slots)
    .flatMap((slot) => slot.runes)

  const foundRune = allRunes.find((rune) => rune.id === runeId)

  return foundRune
}

export async function getRunesStyle(runeStyleId: number) {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.16.1/data/en_US/runesReforged.json",
    {
      cache: "force-cache",
    }
  )

  const runeInfo = await res.json()

  const runeStyle = runeInfo.find((style) => style.id === runeStyleId)

  return runeStyle
}
