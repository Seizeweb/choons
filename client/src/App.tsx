import { createContext, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';
import List from './components/List/List';
import Profile from './containers/Profile/Profile';
import Player from './components/Player/Player';
import { NowPlayingInterface, NowPlayingDataInterface } from './interfaces';

const initValue: NowPlayingInterface = {
  nowPlaying: null,
  setNowPlaying: () => {},
};

export const PlayerContext = createContext(initValue);

function App() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingDataInterface | null>(null);
  const value: NowPlayingInterface = { nowPlaying, setNowPlaying };

  return (
    <PlayerContext.Provider value={value}>
      {nowPlaying && <Player nowPlaying={nowPlaying} closePlayer={() => setNowPlaying(null)} />}
      <Router>
        <Navbar />
        <Switch>
          <Route path='/list'>
            <List />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </PlayerContext.Provider>
  );
}

export default App;
