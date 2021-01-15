import { createContext, useState, useEffect, useContext } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';
import List from './components/List/List';
import Profile from './containers/Profile/Profile';
import Player from './components/Player/Player';
import { NowPlayingInterface } from './interfaces';

const initNowPlaying: NowPlayingInterface = {
  nowPlaying: {
    current: {
      artist: '',
      url: '',
      bandcampId: '',
      title: '',
    },
    next: '',
  },
  setNowPlaying: () => {},
};

export const PlayerContext = createContext(initNowPlaying);

function App() {
  const [nowPlaying, setNowPlaying] = useState(initNowPlaying.nowPlaying);
  const value = { nowPlaying, setNowPlaying };

  return (
    <PlayerContext.Provider value={value}>
      <Player />
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
