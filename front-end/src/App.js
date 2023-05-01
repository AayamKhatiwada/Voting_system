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
import AdminSideBar from "./components/Admin/AdminSideBar/adminSidebar";
import AdminVoters from "./components/Admin/AdminVoters/adminVoters";
import AdminParty from "./components/Admin/AdminParty/adminParty";
import AdminPartyRegister from "./components/Admin/AdminPartyRegister/adminPartyRegister";
import AdminUserView from "./components/Admin/AdminUserView/adminUserView";
import AdminCandidate from "./components/Admin/AdminCandidate/adminCandidate";
import AdminCandidateRegister from "./components/Admin/AdminCandidateRegister/adminCandidateRegister";

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

          <Route path="/vote" element={<VoteParty />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <>
              <AdminSideBar />
              <RequireAdminAuth>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="/votes" element={<AdminDashboard />} />
                  <Route path="/voters" element={<AdminVoters />} />
                  <Route path="/party" element={<AdminParty />} />
                  <Route path="/party/:id" element={<AdminPartyRegister />} />
                  <Route path="/voters/:id" element={<AdminUserView />} />
                  <Route path="/candidate" element={<AdminCandidate />} />
                  <Route path="/candidate/:id" element={<AdminCandidateRegister />} />
                </Routes>
              </RequireAdminAuth>
            </>
          } />
          <Route path="/verify" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
