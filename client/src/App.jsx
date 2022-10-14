import { Route, Routes } from "react-router-dom";
import Home from "./components/genome_explorer/Home"
import Scene from './components/protein_explorer/Scene';


function App() {

  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/protein_explorer' element={<Scene />} />
      <Route exact path='/genome_explorer' element={<Home />}/>
    </Routes>
  )
}

export default App;
