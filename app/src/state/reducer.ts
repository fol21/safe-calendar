import { createContext } from "react";
import { IPlanningIntervalCalendar } from "../api";

export interface GlobalContextState {
    numberOfPis: number;
    iterations: number;
    startDate: Date;
    piCalendar: IPlanningIntervalCalendar;
}

export const resetState: GlobalContextState = {
    numberOfPis: 0,
    iterations: 0,
    startDate: new Date(),
    piCalendar: {} as IPlanningIntervalCalendar,
};

export function hadleUpdateContextReducer(
    context: GlobalContextState,
    action: {type: string, payload?: Partial<GlobalContextState>} 
){
    switch (action.type) {
        case "UPDATE":
            return { ...context, ...action.payload };
        case "RESET_CALENDAR":
            return { ...context, piCalendar: {} as IPlanningIntervalCalendar };
        case "RESET":
            return resetState;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export const GlobalContext = createContext(resetState);
export const GlobalContextDispatch = createContext(null);
