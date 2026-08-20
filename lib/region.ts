export const regions = [
  { value: "euw1", region: "europe", label: "EUW" },
  { value: "eun1", region: "europe", label: "EUNE" },
  { value: "na1", region: "americas", label: "NA" },
  { value: "kr", region: "asia", label: "KR" },
  { value: "br1", region: "americas", label: "BR" },
  { value: "la1", region: "americas", label: "LAN" },
  { value: "la2", region: "americas", label: "LAS" },
  { value: "tr1", region: "europe", label: "TR" },
  { value: "ru", region: "europe", label: "RU" },
  { value: "jp1", region: "asia", label: "JP" },
  { value: "oc1", region: "sea", label: "OCE" },
  { value: "ph2", region: "sea", label: "PH" },
  { value: "sg2", region: "sea", label: "SG" },
  { value: "th2", region: "sea", label: "TH" },
  { value: "tw2", region: "sea", label: "TW" },
  { value: "vn2", region: "sea", label: "VN" },
]

export function formatRegion(region: string) {
  const findRegion = regions.find((reg) => reg.value === region)

  if (!findRegion) {
    return null
  }

  return findRegion.region
}
