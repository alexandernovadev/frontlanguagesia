export interface StatisticsData {
  success: boolean;
  lectures: {
    A1: number;
    A2: number;
    B1: number;
    B2: number;
    C1: number;
    C2: number;
    total: number;
  };
  words: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
}
