"use client"

import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useState } from "react"

export default function ProfileSearch() {
  const [search, setSearch] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = search.trim()

    if (!query) return

    console.log("submit search", search)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroupInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Game Name#Tagline"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="submit" size="icon-xs">
              <SearchIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
