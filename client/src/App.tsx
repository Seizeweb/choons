import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
