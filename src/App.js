import React from "react";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from './pages/loginpage';
import Signuppage from './pages/signuppage';
import Homenavebar from './components/homeNavebar';
function App() {
  return (
    <>
      <BrowserRouter>
        <Homenavebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
