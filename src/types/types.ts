export type Wordnett = string;

export type MyLetter = {
  letter: string;
  typed: boolean;
};

export type MyWord = MyLetter[];

export type Pattern = number[];

export type GameData = {
  myWords: string[];
  solutions: string[];
  maxWords: number;
  myScore: number;
  maxScore: number;
};

export type GameMessage = {
  message: string;
  color: string;
};

export type GameDataUpdate = Partial<GameData>

