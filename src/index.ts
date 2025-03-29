import { BasicPlanningIntervalGenerator } from "./api/generators";

const generator = new BasicPlanningIntervalGenerator();

generator
    .plan({
        id: "id01",
        startDate: new Date(2025, 4, 19),
        iterations: 4,
        iterationIntervalWeeks: 2,
    })
    .iteratate();

console.log(generator.pi);