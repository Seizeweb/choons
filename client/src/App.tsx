import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';
import List from './components/List/List';
import Profile from './containers/Profile/Profile';

function App() {
  return (
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
  );
}

export default App;
