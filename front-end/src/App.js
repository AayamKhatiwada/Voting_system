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
import WithoutAuthOnly from "./Reuseables/withoutAuthOnly";
import RequireAuth from "./Reuseables/RequireAuth";
import RequireAdminAuth from "./Reuseables/RequireAdminAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/signIn" element={
            <WithoutAuthOnly>
              <SignInPage />
            </WithoutAuthOnly>
          } />
          <Route path="/register" element={
            <WithoutAuthOnly>
              <Register />
            </WithoutAuthOnly>
          } />

          <Route path="/profile" element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          } />

          <Route path="/vote-party" element={<VoteParty />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={
            <RequireAdminAuth>
              <AdminDashboard />
            </RequireAdminAuth>
          } />
          <Route path="/verify" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
