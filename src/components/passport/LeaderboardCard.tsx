
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  name: string;
  score: number;
  position?: number;
  isCurrentUser?: boolean;
}

interface LeaderboardCardProps {
  data: LeaderboardEntry[];
  title?: string;
  description?: string;
  currentUserRank?: number;
  category?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  data,
  title = "Passport Leaderboard",
  description = "Top achievers this month",
  currentUserRank,
  category
}) => {
  // Prepare data with position info if not present
  const leaderboardData = data.map((entry, index) => ({
    ...entry,
    position: entry.position || index + 1
  }));

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-slate-400" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-700" />;
      default:
        return <span className="w-4 inline-block text-center">{position}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {category && (
            <Badge variant="outline">{category}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.name} className={entry.isCurrentUser ? "bg-primary/5" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center justify-center">
                    {getPositionIcon(entry.position)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>{entry.name}</span>
                    {entry.isCurrentUser && (
                      <Badge className="ml-2 px-2 py-0 text-xs" variant="outline">You</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {currentUserRank && currentUserRank > leaderboardData.length && (
          <div className="mt-4 pt-2 border-t">
            <TableRow className="bg-primary/5 flex w-full">
              <TableCell className="font-medium w-12 flex-none">
                <div className="flex items-center justify-center">
                  {currentUserRank}
                </div>
              </TableCell>
              <TableCell className="flex-grow">
                <div className="flex items-center">
                  <span>Your ranking</span>
                  <Badge className="ml-2 px-2 py-0 text-xs" variant="outline">You</Badge>
                </div>
              </TableCell>
              <TableCell className="text-right flex-none w-20">
                {/* This would show the user's actual score */}
                --
              </TableCell>
            </TableRow>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            View Full Leaderboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
