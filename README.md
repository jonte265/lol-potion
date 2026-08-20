# LoL Potion

LoL Potion is a League of Legends profile and match-history viewer built with
Next.js.

Search for a Riot ID across supported regions to see ranked stats,
champion mastery, recent matches, player builds, and detailed team statistics.

## Live Demo

## Features

- Multi-region Riot ID search
- Ranked Solo/Duo, Flex, and additional queue information
- Recent match history with win/loss styling
- Expandable team statistics for every match
- Champion, item, rune, and summoner spell data from Data Dragon
- Item and spell tooltips
- Champion mastery overview
- Regional Challenger leaderboards

## Tech stack

- Next.js React Framework
- React and TypeScript
- Tailwind CSS
- shadcn/ui with Base UI
- Riot Games API and Data Dragon
- Lucide icons

## Getting started

### Prerequisites

- Node.js 20.9 or later
- npm
- A Riot Games development API key

### Installation

Clone this repo

cd lol-potion

npm install

Create a `.env.local` file in the project root:

```env
RIOT_API_KEY=your-riot-api-key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```text
app/                    Routes, layouts, and API handlers
components/common/      Shared components and typography
components/features/    Profile, match, and leaderboard features
components/ui/          shadcn/ui primitives
lib/riot.ts             Riot Games API requests
lib/ddragon.ts          Data Dragon data and asset helpers
lib/profile.ts          Profile-page data composition
lib/matches.ts          Match formatting helpers
lib/stat.ts             Gameplay statistic calculations
```

Home page uses Incremental Static Regeneration to avoid repeated Riot API requests for every
visitor.
