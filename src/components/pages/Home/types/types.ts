import { LanguagesStr, Levels } from "../../../../interfaces/types";

export interface Filters {
  languages: LanguagesStr[];
  levels: Levels[];
}
export interface Card {
  _id?: string | number;
  time: number;
  level: string;
  flag?: string;
  typeWrite: string;
  language: string;
  img: string;
  content: string;
}
