import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockLiveScores = [
  { id: 1, homeTeam: 'Team A', awayTeam: 'Team B', score: '2 - 1', time: '65:00' },
  { id: 2, homeTeam: 'Team C', awayTeam: 'Team D', score: '0 - 0', time: '12:00' },
  { id: 3, homeTeam: 'Team E', awayTeam: 'Team F', score: '3 - 2', time: '89:00' },
]

export function LiveScores() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockLiveScores.map((match) => (
        <Card key={match.id}>
          <CardHeader>
            <CardTitle>{match.homeTeam} vs {match.awayTeam}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-center">{match.score}</p>
            <p className="text-sm text-muted-foreground text-center">Time: {match.time}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}