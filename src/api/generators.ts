import { DateTime } from "luxon";
import { IPlanningInterval, IPlanningIntervalIteration } from ".";

/**
    1. Escolher uma segunda feira para ser Planning;
    2. Espaçar duas semanas para uma sexta ser a Review;
    3. Realizar passo 1 e 2 E vezes, em semanas em sequencia, sendo E o número de sprints de execução;
    4. Realizar o passo 1 em sequencia para Planning de sprint de inovação;
    5. Marcar quarta e quinta da semana seguinte a semana de planning como PI plannings;
    6. Realizar passo 2 para review da sprint de inovação;
 */
export interface IPlanningIntervalGenerator {

    plan(pi: IPlanningInterval): IPlanningIntervalGenerator;
    iteratate(): IPlanningIntervalGenerator;
}

export class BasicPlanningIntervalGenerator implements IPlanningIntervalGenerator {
    public pi: IPlanningInterval = {} as IPlanningInterval;
    protected iterations: IPlanningIntervalIteration[] = [];
    protected _firstEndDate: Date = new Date(2000, 0, 1);


    public plan(pi: IPlanningInterval, calendaqrIteration=1): IPlanningIntervalGenerator {
        if(pi.iterations <= 0 || pi.iterationIntervalWeeks <= 0) {
            throw new Error("Invalid iterations or iterationIntervalDays values. They must be greater than 0.");
        }
        if(pi.startDate.getDay() !== 1) {
            throw new Error("Start date must be a Monday.");
        }
        this.pi = pi;
        this._firstEndDate = DateTime
            .fromJSDate(pi.startDate)
            .plus({ days: (this.pi.iterationIntervalWeeks - 1) * 7 + 4 })
            .toJSDate();
        if(this._firstEndDate.getDay() !== 5) {
            throw new Error("End date must be a Friday.");
        }
        this.pi.path = `PI${this.pi.startDate.getFullYear()}.${calendaqrIteration}`;
        return this;
    }

    public iteratate(): IPlanningIntervalGenerator {
        
        // Execution Iterations
        let startDate = this.pi.startDate;
        let endDate = this._firstEndDate;
        for(let i = 0; i < this.pi.iterations - 1; i++) {
            this.iterations.push({
                id: `${this.pi.id}/SP${i + 1}`,
                path: `${this.pi.path}/SP${i + 1}`,
                startDate,
                endDate,
                isIpIteration: false,
            });
            startDate = DateTime.fromJSDate(startDate).plus({days: 7 * this.pi.iterationIntervalWeeks}).toJSDate();
            endDate = DateTime.fromJSDate(endDate).plus({days: 7 * this.pi.iterationIntervalWeeks}).toJSDate();
        }
        
        // Innovation Iteration
        this.iterations.push({
            id: `${this.pi.id}/SP${this.pi.iterations}`,
            path: `${this.pi.path}/SP${this.pi.iterations}`,
            startDate,
            endDate,
            isIpIteration: true
        });

        this.pi.planningIntervalIterations = this.iterations;
        return this;
    }
}