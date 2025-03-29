import { BasicPlanningIntervalGenerator } from "./generators";

describe('generator', () => {

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
    })
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