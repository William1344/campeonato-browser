import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
// desktop
import { Home, NovoCmp, MainCmp, MainChaves, NovoTime, NovoJgdr, LoadGame, RnkgDesk } from './pages';
// mobile
import { MainCamp, RankingMob, ViewGm, ViewTm, ViewUs } from './mobile/screens';

const rout = createBrowserRouter([
  {
    path: '/desktop',
    element: <Home/>,
    loader: () => import('./pages/Home/Home'),
  },{
    path: '/desktop/novo-campeonato',
    element: <NovoCmp/>,
    loader: () => import('./pages/NovoCmp/NovoCmp'),
  },{
    path: '/desktop/main-campeonato',
    element: <MainCmp/>,
    loader: () => import('./pages/MainCmp/MainCmp'),
  },{
    path: '/desktop/novo-time',
    element: <NovoTime/>,
    loader: () => import('./pages/NovoTime/NovoTime'),
  },{
    path: '/desktop/novo-jgdr',
    element: <NovoJgdr/>,
    loader: () => import('./pages/NovoJgdr/NovoJgdr'),
  },{
    path: '/desktop/main-chave',
    element: <MainChaves/>,
    loader: () => import('./pages/MainChaves/MainChaves'),
  },{
    path: '/desktop/load-game',
    element: <LoadGame/>,
    loader: () => import('./pages/LoadGame/LoadGame'),
  },{
    path: '/desktop/ranking',
    element: <RnkgDesk/>,
    loader: () => import('./pages/RankingDesk/RnkgDesk'),
  },

  // mobile
  {
    path: '/campeonato',
    element: <MainCamp/>,
    loader: () => import('./mobile/screens/MainCamp/MainCamp'),
  },{
    path: '/campeonato/ranking',
    element: <RankingMob/>,
    loader: () => import('./mobile/screens/Ranking/Ranking'),
  },{
    path: '/campeonato/view-user',
    element: <ViewUs/>,
    loader: () => import('./mobile/screens/ViewUser/ViewUs'),
  },{
    path: '/campeonato/view-time',
    element: <ViewTm/>,
  },{
    path: '/campeonato/view-game',
    element: <ViewGm/>,
    loader: () => import('./mobile/screens/ViewGame/ViewGm'),
  }

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={rout}/>
);
serviceWorker.unregister();

