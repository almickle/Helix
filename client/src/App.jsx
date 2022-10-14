import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/genome_explorer/Home"
import Scene from './components/protein_explorer/Scene';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/protein_explorer' element={<Scene />} />
        <Route path='/genome_explorer' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
