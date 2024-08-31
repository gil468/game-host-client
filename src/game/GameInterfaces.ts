export type EndRoundResponse = {
  songGuessedBy: string | null;
  artistGuessedBy: string | null;
  correctAnswer: Song;
  scores: ScoresProps;
};

export type ServerStatusGame =
  | 'CREATED'
  | 'PENDING_ROUND_START'
  | 'ROUND_IN_PROGRESS'
  | 'ROUND_ENDED';

export type RejoinResponse = {
  round: number;
  totalRounds: number;
  gameId: string;
  gameStatus: ServerStatusGame;
  gameSecret: string;
  roundData: { currentGuessingPlayer?: string };
  gamePlayers: Record<string, Player>;
};

export type ScoresProps = (Player & { gainedScore: number })[];

export type Song = {
  title: string;
  artist: string;
  albumCoverUrl: string;
};

export type Player = {
  userName: string;
  score: number;
};

export type BuzzerRevokedProps = {
  answeredBy: string;
  title?: string;
  artist?: string;
};
