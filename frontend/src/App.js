import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Register from "./pages/register.jsx";
function App(){
    return(
      <div>
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>} />
                  <Route path = "/home" element={<Home/>} />
                  <Route path = "/register" element={<Register/>} />
              </Routes>
          </BrowserRouter>
      </div>
    );
}
export default App