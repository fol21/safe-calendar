import { DateTime } from "luxon";
import { IPlanningIntervalEvent, PlanningIntervalEventType } from "..";
import { BasicPlanningIntervalGenerator, IPlanningIntervalGenerator } from "./generators";

export class PlanningIntervalEventsGenerator extends BasicPlanningIntervalGenerator {
    
    public iterateOne(mods?: {isIpIteration: boolean}): IPlanningIntervalGenerator {
        super.iterateOne(mods);
        this._generateEvents();
        return this;
    }

    protected _generateEvents(addOns?: IPlanningIntervalEvent[]) {
        const it = this.pi.planningIntervalIterations[this.pi.planningIntervalIterations.length - 1];
        it.events = [];

        // Planning event
        it.events.push({
            type: PlanningIntervalEventType.PLANNING,
            startDate: DateTime.fromJSDate(it.startDate).startOf("day").toJSDate(),
            endDate: DateTime.fromJSDate(it.startDate).endOf("day").toJSDate(),
        } as IPlanningIntervalEvent);

        // Review event
        if(!it.isIpIteration) {
            it.events.push({
                type: PlanningIntervalEventType.REVIEW,
                startDate: DateTime.fromJSDate(it.endDate).startOf("day").toJSDate(),
                endDate: DateTime.fromJSDate(it.endDate).endOf("day").toJSDate(),
            } as IPlanningIntervalEvent);
        }

        if(it.isIpIteration) {
            // PI Planning event
            it.events.push({
                type: PlanningIntervalEventType.PI_PLANNING,
                startDate: DateTime.fromJSDate(it.endDate).minus({days: 1}).startOf("day").toJSDate(),
                endDate: DateTime.fromJSDate(it.endDate).minus({days: 1}).endOf("day").toJSDate(),
            } as IPlanningIntervalEvent);
            it.events.push({
                type: PlanningIntervalEventType.PI_PLANNING,
                startDate: DateTime.fromJSDate(it.endDate).minus({days: 2}).startOf("day").toJSDate(),
                endDate: DateTime.fromJSDate(it.endDate).minus({days: 2}).endOf("day").toJSDate(),
            } as IPlanningIntervalEvent);
        }

        if(addOns) {
            it.events.push(...addOns);
        }

        return this;
    }
    
}