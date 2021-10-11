import { Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Videogame from './components/Videogame';

function App() {
  return (
    <div className="App">
      <Route path = '/home' component= {Home}/>
      <Route path = '/videogame' component= {Videogame}/>
    </div>
  );
}

export default App;
