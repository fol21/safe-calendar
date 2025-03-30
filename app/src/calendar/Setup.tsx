import React, { useEffect } from "react";
import { GlobalContext } from "../renderer";
import "./Setup.css";
import { useNavigate } from "react-router";
import { IPlanningInterval, IPlanningIntervalCalendar, PlanningIntervalEventsGenerator } from "../api";
import { DateTime } from "luxon";

export const Setup: React.FC = () => {
    const context = React.useContext(GlobalContext);
    const [contextForm, setContextForm] = React.useState(context);
    const navigation = useNavigate();


    const handleGenerate = () => {

        const pis: IPlanningInterval[] = [];
        const generator = new PlanningIntervalEventsGenerator();
        console.log("context", context);
        try {
            let _startDate = context.startDate;
            for (let i = 0; i < context.numberOfPis; i++) {
                let pi = generator
                    .plan({
                        startDate: _startDate,
                        iterations: context.iterations,
    
                        iterationIntervalWeeks: 2,
                    }, i + 1)
                    .iteratate()
                    .checkout();
                
                pis.push(pi);
                _startDate = DateTime.fromJSDate(_startDate).plus({ weeks: pi.iterationIntervalWeeks * pi.iterations }).toJSDate();
            }
            context.piCalendar = {
                path: context.startDate.getFullYear().toString(),
                pis: pis,
            }
            navigation("/calendar");
        } catch (e) {
            console.error(e);
            alert((e as Error).message);
        }
    }

    useEffect(() => {
        context.piCalendar = {} as IPlanningIntervalCalendar;
    });

    return (
        <div className="setup-container">
            <div className="setup-card">
                <h1>Setup</h1>
                <p>Setup your SaFe calendar</p>
                <div className="setup-form">
                    <label htmlFor="numberOfPis">Number of Pi's:</label>
                    <input
                        type="number"
                        id="numberOfPis"
                        value={context.numberOfPis}
                        onChange={(e) => {
                            context.numberOfPis = Number(e.target.value)
                            setContextForm({ ...contextForm, numberOfPis: context.numberOfPis });
                        }}
                    />
                    <label htmlFor="iterations">Iterations:</label>
                    <input
                        type="number"
                        id="iterations"
                        value={context.iterations}
                        onChange={(e) => {
                            context.iterations = Number(e.target.value)
                            setContextForm({ ...contextForm, iterations: context.iterations });
                        }}
                    />
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={context.startDate.toISOString().split("T")[0]}
                        onChange={(e) => {
                            context.startDate = DateTime.fromISO(e.target.value).toJSDate();
                            setContextForm({ ...contextForm, startDate: context.startDate });
                        }}
                    />
                    <button onClick={handleGenerate}>
                        <h4>Generate</h4>
                    </button>
            </div>
        </div>
    </div>);
}