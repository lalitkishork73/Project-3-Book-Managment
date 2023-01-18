import React from "react";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Loginpage from './pages/loginpage';
import Signuppage from './pages/signuppage';
import Homenavebar from './components/homeNavebar';
import Review from "./pages/review";
import Error from "./pages/error"
import Bookpage from "./pages/bookpage";
import Footer from "./pages/footer";
import Newbook from "./components/Newbook";
import ModifieBook from "./components/ModifieBook"
import RequireAuth from "./components/RequireAuth";
function App() {
  return (
    <>
      <Homenavebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/review/:id" element={<Review />} />
        <Route element={<RequireAuth />}>
          <Route path="/books" element={<Bookpage />} >
            <Route index="true" element={<Newbook />} />
            <Route path="update" element={<ModifieBook />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />


    </>
  );
}

export default App;
