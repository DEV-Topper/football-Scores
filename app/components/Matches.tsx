import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockMatches = [
  { id: 1, homeTeam: 'Team A', awayTeam: 'Team B', date: '2023-06-15', time: '15:00' },
  { id: 2, homeTeam: 'Team C', awayTeam: 'Team D', date: '2023-06-16', time: '18:30' },
  { id: 3, homeTeam: 'Team E', awayTeam: 'Team F', date: '2023-06-17', time: '20:00' },
]

export function Matches() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockMatches.map((match) => (
        <Card key={match.id}>
          <CardHeader>
            <CardTitle>{match.homeTeam} vs {match.awayTeam}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Date: {match.date}</p>
            <p className="text-sm text-muted-foreground">Time: {match.time}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}