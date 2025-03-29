
export interface IPlanningInterval {
    id: string;
    startDate: Date;
    iterations: number;
    iterationIntervalDays: number;
}

export interface IPlanningIntervaliteration {
    id: string;
    startDate: Date;
    endDate: Date;
    isIpiteration: boolean;
}

export interface IPlanningIntervalEvent {
    id: string;
    path: string;
    type: PlanningIntervalEventType;
    startDate: Date;
    endDate: Date;
}

export enum PlanningIntervalEventType {
    PLANNING= 'Planning',
    REVIEW= 'Review',
    PI_PLANNING= 'PI_Planning',
    INSPECT_ADAPT= 'Inspect_Adapt',
}