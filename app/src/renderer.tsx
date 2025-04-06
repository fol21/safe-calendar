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


import React, { createContext, useReducer } from 'react';
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router';

import App from './calendar/App'
import { Setup } from './calendar/Setup';

import './index.css';
import { GlobalContext, GlobalContextDispatch, hadleUpdateContextReducer, resetState } from './state/reducer';


const RootElement: React.FC = () => {
    const [context, dispatch] = useReducer(hadleUpdateContextReducer, resetState);
    return (
        <GlobalContext.Provider value={context}>
            <GlobalContextDispatch.Provider value={dispatch}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Setup />} />
                        <Route path="/calendar" element={<App />} />
                    </Routes>
                </HashRouter>
            </GlobalContextDispatch.Provider>
        </GlobalContext.Provider>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<RootElement />);
