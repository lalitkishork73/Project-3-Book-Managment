import React from "react";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Loginpage from './pages/loginpage';
import Signuppage from './pages/signuppage';
import Homenavebar from './components/homeNavebar';
import Review from "./pages/review";
import Error from "./pages/error"
import Bookpage from "./pages/bookpage";
function App() {
  return (
    <>
      <Homenavebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/books" element={<Bookpage />} />
        <Route path="*" element={<Error />} />
      </Routes>


    </>
  );
}

export default App;
