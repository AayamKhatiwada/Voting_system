import SignInPage from "./pages/sign-in";
import Register from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contactus from "./pages/contactus";
import { ToastContainer } from 'react-toastify';
import VoteParty from "./pages/vote-party";
import UserProfile from "./pages/UserProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyEmail from "./pages/verifyEmail";

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
          <Route path="profile" element={<UserProfile />} />
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="verify" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
