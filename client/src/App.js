import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/genome_explorer/Home"
import Scene from './components/protein_explorer/Scene';


function App() {

  return (
    <div id="app" style={{ userSelect: 'none' }}>
      <BrowserRouter>
        <Routes>
          <Route path='genome_explorer' element={<Home />} />
          <Route path='protein_explorer' element={<Scene />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
