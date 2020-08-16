export declare const SUPPORTED_SPORTS: string[];
export declare const SUPPORTED_WEATHER_SPORTS: string[];
export declare const SUPPORTED_CONTESTS: string[];
export declare const LINEUP_RULES: any;
export declare const DFS_PIPELINE_BUCKET_NAME: string;
export declare const FANTASY_ANALYTICS_BUCKET_NAME: string;

export type FantasyData = {
    playerId: number,
    name: string,
    Fanduel: number,
    DraftKings: number,
    position?: string,
    positionPercentile?: number,
    overallPercentile?: number
}

export type RecentFantasyData = {
    date: string,
    fantasyData: FantasyData[],
    avgPositionPercentile: number,
    avgOverallPercentile: number,
    positions: string[]
}

export interface StartTime {
    sport: string,
    date: string
}