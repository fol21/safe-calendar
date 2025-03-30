import React from "react";
import { GlobalContext } from "../renderer";
import "./Setup.css";
import { useNavigate } from "react-router";

export const Setup: React.FC = () => {
    const context = React.useContext(GlobalContext);
    console.log("Setup context", context);
    const [contextForm, setContextForm] = React.useState({
        numberOfPis: context.numberOfPis,
        iterations: context.iterations,
        startDate: context.startDate.toISOString().split("T")[0],
    });
    const navigation = useNavigate();

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
                            setContextForm({ ...contextForm, numberOfPis: Number(e.target.value) });
                        }}
                    />
                    <label htmlFor="iterations">Iterations:</label>
                    <input
                        type="number"
                        id="iterations"
                        value={context.iterations}
                        onChange={(e) => {
                            context.iterations = Number(e.target.value)
                            setContextForm({ ...contextForm, iterations: Number(e.target.value)});
                        }}
                    />
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={(new Date()).toISOString().split("T")[0]}
                        onChange={(e) => {
                            context.startDate = new Date(e.target.value);
                            setContextForm({ ...contextForm, startDate: new Date(e.target.value).toISOString().split("T")[0] });
                        }}
                    />
                    <button onClick={() => {navigation("/calendar")}}>
                        <h4>Generate</h4>
                    </button>
            </div>
        </div>
    </div>);
}