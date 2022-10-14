import { Route, Switch } from "react-router-dom";
import Home from "./components/genome_explorer/Home"
import Scene from './components/protein_explorer/Scene';


function App() {

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/protein_explorer'>
        <Scene />
      </Route>
      <Route exact path='/genome_explorer'>
        <Home />
      </Route>
    </Switch>
  )
}

export default App;
