"use client"

import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useState, type SubmitEvent } from "react"

export default function ProfileSearch() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = search.trim()

    if (!query) return

    const queryParts = query.split("#")

    const response = await fetch(
      `/api/search?gameName=${queryParts[0]}&tagLine=${queryParts[1]}`
    )

    const data = await response.json()

    if (!response.ok) {
      console.log("Error")
      setError(data.error)
      return
    }

    setError("")

    router.push(`/profile/${data.gameName}/${data.tagLine}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup className="h-14 border-4 border-primary/30 bg-background/90 has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary/30">
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
