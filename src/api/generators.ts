import { DateTime } from "luxon";
import { IPlanningInterval } from ".";

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
    iterateOne(): IPlanningIntervalGenerator;
    iteratate(): IPlanningIntervalGenerator;
    checkout(): IPlanningInterval;
    reset(): IPlanningIntervalGenerator;
}

export class BasicPlanningIntervalGenerator implements IPlanningIntervalGenerator {
    public pi: IPlanningInterval = {} as IPlanningInterval;

    protected _currentStartDate: Date = new Date(2000, 0, 1);
    protected _currentEndDate: Date = new Date(2000, 0, 1);
    protected _currentIteration: number = 0;


    public plan(pi: Omit<IPlanningInterval, "path" | "planningIntervalIterations">, calendarIteration=1): IPlanningIntervalGenerator {
        if(pi.iterations <= 0 || pi.iterationIntervalWeeks <= 0) {
            throw new Error("Invalid iterations or iterationIntervalDays values. They must be greater than 0.");
        }
        if(pi.startDate.getDay() !== 1) {
            throw new Error("Start date must be a Monday.");
        }
        this.pi.iterations = pi.iterations;
        this.pi.iterationIntervalWeeks = pi.iterationIntervalWeeks;
        this.pi.startDate = pi.startDate;
        this.pi = pi as IPlanningInterval;
        this.pi.path = `PI${this.pi.startDate.getFullYear()}.${calendarIteration}`;
        this.pi.planningIntervalIterations = [];

        this._currentEndDate = DateTime
            .fromJSDate(pi.startDate)
            .plus({ days: (this.pi.iterationIntervalWeeks - 1) * 7 + 4 })
            .toJSDate();
        if(this._currentEndDate.getDay() !== 5) {
            throw new Error("End date must be a Friday.");
        }
        return this;
    }

    public iterateOne(): IPlanningIntervalGenerator {
        if(this._currentIteration >= this.pi.iterations) {
            throw new Error("No more iterations to iterate.");
        }
        if(!Array.isArray(this.pi.planningIntervalIterations)) {
            throw new Error("Planning interval iterations not initialized.");
        }
        this._currentIteration++;

        this.pi.planningIntervalIterations.push({
            path: `${this.pi.path}/SP${this._currentIteration }`,
            startDate: this._currentStartDate,
            endDate: this._currentEndDate,
            isIpIteration: false,
        });
        this._currentStartDate = DateTime
            .fromJSDate(this._currentStartDate)
            .plus({days: 7 * this.pi.iterationIntervalWeeks})
            .toJSDate();
        this._currentEndDate = DateTime
            .fromJSDate(this._currentEndDate)
            .plus({days: 7 * this.pi.iterationIntervalWeeks})
            .toJSDate();

        return this;
    }

    public iteratate(): IPlanningIntervalGenerator {
        if(this._currentIteration >= this.pi.iterations) {
            throw new Error("No more iterations to iterate.");
        }
        if(!Array.isArray(this.pi.planningIntervalIterations)) {
            throw new Error("Planning interval iterations not initialized.");
        }

        let startDate = new Date(this.pi.startDate);
        let endDate = new Date(this._currentEndDate);
        const iterationsRemaining = this.pi.iterations - this._currentIteration;

        for(let i = 0; i < iterationsRemaining - 1; i++) {
            this.pi.planningIntervalIterations.push({
                path: `${this.pi.path}/SP${i + 1}`,
                startDate,
                endDate,
                isIpIteration: false,
            });
            startDate = DateTime.fromJSDate(startDate).plus({days: 7 * this.pi.iterationIntervalWeeks}).toJSDate();
            endDate = DateTime.fromJSDate(endDate).plus({days: 7 * this.pi.iterationIntervalWeeks}).toJSDate();
        }
        
        // Innovation Iteration
        this.pi.planningIntervalIterations.push({
            path: `${this.pi.path}/SP${this.pi.iterations}`,
            startDate,
            endDate,
            isIpIteration: true
        });

        this.pi.planningIntervalIterations;
        return this;
    }

    checkout() {
        const _c = {...this.pi} as IPlanningInterval;
        this.reset();

        return _c;
    }

    reset() {
        this.pi = {} as IPlanningInterval;
        this._currentStartDate = new Date(2000, 0, 1);
        this._currentEndDate = new Date(2000, 0, 1);
        this._currentIteration = 0;
        return this;
    }
}