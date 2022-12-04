import React from "react";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from './pages/loginpage';
import Signuppage from './pages/signuppage';
import Homenavebar from './components/homeNavebar';
import Review from "./pages/review";
function App() {
  return (
    <>
      <BrowserRouter>
        <Homenavebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
