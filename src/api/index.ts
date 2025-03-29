export interface IPlanningInterval {
    startDate: Date;
    iterations: number;
    iterationIntervalWeeks: number;
    id?: string;
    path?: string

    planningIntervalIterations?: IPlanningIntervalIteration[];
}

export interface IPlanningIntervalIteration {
    startDate: Date;
    endDate: Date;
    isIpIteration: boolean;
    id?: string;
    path: string;

    events?: IPlanningIntervalEvent[];
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
export interface PlanningIntervalCalendar {
    id: string;
    path: string;
    pis: IPlanningInterval[];
}