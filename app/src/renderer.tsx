/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */


import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client'
import App from './calendar/App'
import './index.css';
import { HashRouter, Route, Routes } from 'react-router';
import { Setup } from './calendar/Setup';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

export interface GlobalContextState {
    numberOfPis: number;
    iterations: number;
    startDate: Date;
}

const resetState: GlobalContextState = {
    numberOfPis: 0,
    iterations: 0,
    startDate: new Date(2000, 0, 1),
};

export const GlobalContext = createContext(resetState);

const RootElement =
    <GlobalContext.Provider value={resetState}>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Setup />} />
                <Route path="/calendar" element={<App />} />
            </Routes>
        </HashRouter>
    </GlobalContext.Provider>

document.getElementById('root') as HTMLElement;
const root = createRoot(document.getElementById('root'));
root.render(RootElement)
