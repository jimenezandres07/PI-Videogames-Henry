import { Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Videogame from './components/Videogame';
import Form from './components/Form';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      
      <Route exact path = '/home' component= {NavBar}/>
      <Route exact path = '/' component= {LandingPage}/>
      <Route exact path = '/home' component= {Home}/>
      <Route exact path = '/videogame/:id' component= {Videogame}/>
      <Route exact path = '/form' component= {Form}/>
    </div>
  );
}

export default App;
