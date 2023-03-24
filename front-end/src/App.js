import SignInPage from "./pages/sign-in";
import Register from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contactus from "./pages/contactus";
import { ToastContainer } from 'react-toastify';
import VoteParty from "./pages/vote-party";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contactus />} />
          <Route path="signIn" element={<SignInPage />} />
          <Route path="register" element={<Register />} />
          <Route path="vote-party" element={<VoteParty />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
