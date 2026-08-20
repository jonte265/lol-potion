"use client"

import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { formatRegion, regions } from "@/lib/region"
import { useState, type SubmitEvent } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export default function ProfileSearch() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("euw1")
  const [error, setError] = useState("")

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = search.trim()

    if (!query) return

    const queryParts = query.split("#")

    const response = await fetch(
      `/api/search?region=${formatRegion(region)}&gameName=${queryParts[0]}&tagLine=${queryParts[1]}`
    )

    const data = await response.json()

    if (!response.ok) {
      console.log("Error")
      setError(data.error)
      return
    }

    setError("")

    router.push(`/profile/${region}/${data.gameName}/${data.tagLine}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup className="h-14 border-4 border-primary/30 bg-background/90 has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary/30">
          <InputGroupAddon align="inline-start">
            <Select
              items={regions}
              value={region}
              onValueChange={(value) => value && setRegion(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputGroupAddon>

          <InputGroupInput
            className="h-full px-4 text-base md:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Game Name#Tagline"
          />

          <InputGroupAddon align="inline-end">
            <InputGroupButton type="submit" size="icon-sm">
              <SearchIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <p className="pt-4 text-center text-destructive">{error}</p>
    </div>
  )
}
