import { DevilFruit, ViewType } from "../../types";

export interface DevilFruitCardProps {
  fruit: DevilFruit;
  number: string;
  type: ViewType;
}

export interface ChapterInfo {
  id: number;
  title: string;
  description: string;
  tome?: {
    tome_japan_date_publish: string;
  };
}

export interface EpisodeInfo {
  id: number;
  title: string;
  description: string;
  release_date: string;
}

export type OwnerType = "currentOwner" | "previousOwner" | "seraphim";
