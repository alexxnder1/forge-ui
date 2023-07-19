
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Components
import Authentication from "./Pages/Authentication/Authentication";
import Chat, { Message, ChatSettings } from './Pages/Chat/Chat';
import Hud from './Pages/Hud/Hud';
import Car from './Pages/Hud/Vehicle';
import Scoreboard from './Pages/Scoreboard/Scoreboard';

declare global {
  interface Window {
    SetLogin(): void;
    SetUsername(name: string): void;
    SetSettings(s: ChatSettings): void;
    RetrieveChatData(): void;
    FocusChat(p: boolean): void;
    SendMessage(s: Message): void;
  }
  const mp: any;
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="auth" element={<Authentication />} />
      <Route path="chat" element={<Chat />} />
      <Route path="hud" element={<Hud />} />
      <Route path="car" element={<Car />} />     
      <Route path="scoreboard" element={<Scoreboard/>}/> 
    </Route>
  )
  );
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();

export const regex = /(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))/g;
