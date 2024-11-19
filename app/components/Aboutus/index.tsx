"use client";

import React, { useEffect, useState } from "react";

interface Match {
  id: number;
  utcDate: string;
  status: string;
  minute: number;
  competition: {
    name: string;
  };
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export default function Component() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveScores = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/livescores", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API error response:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData}`
        );
      }

      const data = await response.json();
      console.log("Received data:", JSON.stringify(data).slice(0, 200) + "...");

      if (data.error) {
        throw new Error(data.error);
      }

      setMatches(data.matches || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching live scores:", err);
      setError(`Failed to fetch live scores. ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveScores();
    const interval = setInterval(fetchLiveScores, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const filteredMatches = matches.filter((match) => {
    if (filter === "ALL") return true;
    if (filter === "LIVE")
      return match.status === "IN_PLAY" || match.status === "PAUSED";
    if (filter === "FINISHED") return match.status === "FINISHED";
    if (filter === "SCHEDULED")
      return match.status === "SCHEDULED" || match.status === "TIMED";
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">LiveScore</h1>
        <div className="mb-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Football
          </button>
        </div>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-[180px] px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter matches"
          >
            <option value="ALL">All Matches</option>
            <option value="LIVE">Live</option>
            <option value="FINISHED">Finished</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>
          <button
            onClick={fetchLiveScores}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            aria-label="Refresh scores"
          >
            Refresh
          </button>
        </div>
      </header>

      {isLoading ? (
        <div
          className="flex justify-center items-center h-64"
          aria-live="polite"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center" aria-live="assertive">
          <p>{error}</p>
          <p className="mt-2">
            We&lsquo;re experiencing technical difficulties. Please try again
            later or contact support if the problem persists.
          </p>
        </div>
      ) : (
        <div className="h-[calc(100vh-200px)] overflow-y-auto bg-white rounded-lg shadow">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No matches available at the moment.
            </div>
          ) : (
            filteredMatches.map((match) => (
              <div
                key={match.id}
                className="mb-4 border-b p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">
                    {match.competition.name}
                  </span>
                  {match.status === "IN_PLAY" && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      {match.minute}&apos;
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 items-center gap-4 text-lg">
                  <div className="text-right font-medium">
                    {match.homeTeam.name}
                  </div>
                  <div className="text-center font-bold text-xl">
                    {match.score.fullTime.home !== null &&
                    match.score.fullTime.away !== null
                      ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                      : "vs"}
                  </div>
                  <div className="text-left font-medium">
                    {match.awayTeam.name}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500 text-center">
                  {match.status === "FINISHED"
                    ? "Full Time"
                    : match.status === "IN_PLAY"
                    ? "Live"
                    : new Date(match.utcDate).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
