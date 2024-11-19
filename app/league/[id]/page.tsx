'use client'
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

async function getLeagueDetails(id: string) {
  const res = await fetch(
    `https://free-api-live-football-data.p.rapidapi.com/football-get-league-detail?leagueid=${id}`,
    {
      headers: {
        "x-rapidapi-key": "73452e0975mshf95ab79883098b0p119f1djsnf35fc8d34115",
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch league details");
  }

  return res.json();
}

export default  function LeagueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let leagueData;

  const [ league,  setLeague] = useState()

  try {
    leagueData = await getLeagueDetails(params.id);
  } catch (error) {
    console.error("Error fetching league details:", error);
    notFound();
  }

  if (!leagueData || !leagueData.response) {
    notFound();
  }

  const { name, country, logo, seasons } = leagueData.response.leagues;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {logo && (
            <Image
              width={100}
              height={100}
              src={logo}
              alt={`${name} logo`}
              className="w-24 h-24 object-contain"
            />
          )}
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">{name}</CardTitle>
            <p className="text-xl text-muted-foreground">{country}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
          {/* <div className="grid gap-4 md:grid-cols-2">
            {seasons?.map((season: any) => (
              <Card key={season.year}>
                <CardHeader>
                  <CardTitle>{season.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Start Date: {season.start}</p>
                  <p>End Date: {season.end}</p>
                  <p>Current: {season.current ? "Yes" : "No"}</p>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
