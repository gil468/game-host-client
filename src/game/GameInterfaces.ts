export type EndRoundResponse = {
  songGuessedBy: string | null;
  artistGuessedBy: string | null;
  correctAnswer: Song;
  scores: Omit<Player, 'id'>[];
};

export type Song = {
  title: string;
  artist: string;
};

export type Player = {
  id: string;
  userName: string;
  score: number;
};
