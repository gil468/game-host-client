export type EndRoundResponse = {
  songGuessedBy: string | null;
  artistGuessedBy: string | null;
  correctAnswer: Song;
  scores: ScoresProps;
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
