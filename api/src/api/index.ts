export interface IPlanningInterval {
    startDate: Date;
    iterations: number;
    iterationIntervalWeeks: number;
    planningIntervalIterations: IPlanningIntervalIteration[];
    path: string
    id?: string;
}


export interface IPlanningIntervalIteration {
    startDate: Date;
    endDate: Date;
    isIpIteration: boolean;
    path: string;
    events?: IPlanningIntervalEvent[];
    id?: string;
}

export interface IPlanningIntervalEvent {
    path: string;
    type: PlanningIntervalEventType;
    startDate: Date;
    endDate: Date;
    id?: string;
}

export enum PlanningIntervalEventType {
    PLANNING= 'Planning',
    REVIEW= 'Review',
    PI_PLANNING= 'PI_Planning',
    INSPECT_ADAPT= 'Inspect_Adapt',
}
export interface IPlanningIntervalCalendar {
    path: string;
    pis: IPlanningInterval[];
    id?: string;
}

export {
    BasicPlanningIntervalGenerator,
} from "./generators/generators";

export { PlanningIntervalEventsGenerator } from "./generators/PlanningIntervalEventsGenerator";