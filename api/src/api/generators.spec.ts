import { DateTime } from "luxon";
import { IPlanningInterval, IPlanningIntervalCalendar } from ".";
import { BasicPlanningIntervalGenerator } from "./generators/generators";
import { PlanningIntervalEventsGenerator } from "./generators/PlanningIntervalEventsGenerator";

describe('generator', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should create a planning interval', () => {
        const generator = new BasicPlanningIntervalGenerator();
        
        const pi = generator
            .plan({
                startDate: new Date(2025, 4, 19),
                iterations: 4,
                iterationIntervalWeeks: 2,
            })
            .iteratate()
            .checkout();
        
        console.log(pi);

        expect(pi.planningIntervalIterations[pi.planningIntervalIterations.length - 1].path).toBe("PI2025.1/SP4");
    })

    it('should create iterated', () => {
        const generator = new BasicPlanningIntervalGenerator();
        
        const pi = generator
            .plan({
                startDate: new Date(2025, 4, 19),
                iterations: 4,
                iterationIntervalWeeks: 2,
            })
            .iterateOne()
            .iterateOne()
            .iterateOne()
            .iteratate()
            .checkout();
        
        console.log(pi);

        expect(pi.planningIntervalIterations[pi.planningIntervalIterations.length - 1].path).toBe("PI2025.1/SP4");
    });

    it('should create iterated with events', () => {
        process.env.TZ =  "America/Sao_Paulo"

        const generator = new PlanningIntervalEventsGenerator();
        
        const pi = generator
            .plan({
                startDate: new Date(2025, 4, 19),
                iterations: 4,
                iterationIntervalWeeks: 2,
            })
            .iterateOne()
            .iterateOne()
            .iteratate()
            .checkout();
        
        console.log(pi);
        console.log(pi.planningIntervalIterations[0].events);
        console.log(pi.planningIntervalIterations[pi.planningIntervalIterations.length - 1].events);

        expect(pi.planningIntervalIterations[0].path).toBe("PI2025.1/SP1");
        expect(pi.planningIntervalIterations[0].events?.length).toBe(2);
        expect(pi.planningIntervalIterations[pi.planningIntervalIterations.length - 1].path).toBe("PI2025.1/SP4");
        expect(pi.planningIntervalIterations[pi.planningIntervalIterations.length - 1].events?.length).toBe(3);
    });

    it('should return flatten iterated events', () => {
        const generator = new PlanningIntervalEventsGenerator();
        const numofPis = 2;
        const pis: IPlanningInterval[] = [];

        let _startDate = new Date(2025, 2, 3);
        for (let i = 0; i < numofPis; i++) {
            console.log(_startDate);
            pis.push(generator.plan({
                    startDate: _startDate,
                    iterations: 4,
                    iterationIntervalWeeks: 2,
                }, i + 1)
                .iterateOne()
                .iterateOne()
                .iteratate()
                .checkout()
            );
            _startDate = DateTime.fromJSDate(_startDate).plus({'weeks': pis[i].iterationIntervalWeeks * 4}).toJSDate();
        }
        
        const calendar: IPlanningIntervalCalendar = {
            path: "2025",
            pis: pis,
        }
        console.log(JSON.stringify(calendar.pis
            .flatMap(pi => pi.planningIntervalIterations)
            .flatMap(it => it.events)
        , null, 2));

        expect(true);
    });

    it('should not create iterated', () => {
        try {
            const generator = new BasicPlanningIntervalGenerator();
            
            const pi = generator
                .plan({
                    startDate: new Date(2025, 4, 19),
                    iterations: 4,
                    iterationIntervalWeeks: 2,
                })
                .iterateOne()
                .iterateOne()
                .iterateOne()
                .iterateOne()
                .iteratate()
                .checkout();
            
            console.log(pi);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
            expect((e as Error).message).toBe("No more iterations to iterate.");
        }

    })
});