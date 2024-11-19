'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface League {
  id: string
  name: string
  country: string
  logo?: string;
  localizedName?: string;
}

export function Leagues() {
  const [leagues, setLeagues] = useState<League[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const response = await fetch(
          "https://free-api-live-football-daeta.p.rapidapi.com/football-get-all-leagues",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "73452e0975mshf95ab79883098b0p119f1djsnf35fc8d34115",
              Accept: "application/json",
              "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
            },
          }
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch leagues')
        }

        const data = await response.json()
        setLeagues(data.response.leagues || [])
      } catch (err) {
        setError('Failed to fetch leagues. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  if (isLoading) {
    return <div className="text-center">Loading leagues...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leagues && (leagues || [])?.map((league) => (
        <Card key={league.id} className="flex flex-col">
          <CardHeader className="flex-grow">
            <div className="flex items-center space-x-4">
              {league.logo && (
                <Image width={100} height={100} src={league.logo} alt={`${league.name} logo`} className=" w-6 h-6 object-contain" />
              )}
              <div>
                <CardTitle>{league.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{league?.localizedName}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}