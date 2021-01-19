import { createContext, useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';
import List from './components/List/List';
import Profile from './containers/Profile/Profile';
import Player from './components/Player/Player';
import { NowPlayingInterface, NowPlayingDataInterface } from './interfaces';
import LoginPage from './containers/LoginPage/LoginPage';
import { getUser, logout } from './apiService';

const initValue: NowPlayingInterface = {
  nowPlaying: null,
  setNowPlaying: () => {},
};

export const PlayerContext = createContext(initValue);

const token = localStorage.getItem('token');

function App() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingDataInterface | null>(null);
  const value: NowPlayingInterface = { nowPlaying, setNowPlaying };
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [username, setUsername] = useState('');

  const handleAuthenticate = (loggedUsername: string) => {
    setUsername(loggedUsername);
    setIsAuthenticated(true);
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
    setIsAuthenticated(false);
    setUsername('');
  };

  useEffect(() => {
    (async () => {
      if (token) {
        setIsAuthenticated(true);
        const { username } = await getUser();
        setUsername(username);
      }
    })();
  }, []);

  return (
    <PlayerContext.Provider value={value}>
      {nowPlaying && <Player nowPlaying={nowPlaying} closePlayer={() => setNowPlaying(null)} />}
      <Router>
        <Navbar username={username} logout={handleLogout} />
        <Switch>
          <Route path='/list'>
            <List />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/'>{isAuthenticated ? <Dashboard /> : <LoginPage onAuthenticate={handleAuthenticate} />}</Route>
        </Switch>
      </Router>
    </PlayerContext.Provider>
  );
}

export default App;
