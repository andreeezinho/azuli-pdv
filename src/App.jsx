import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./hooks/PrivateRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MyProfile from "./pages/MyProfile/MyProfile";
import LoginRoute from "./hooks/LoginRoute";
import RecoveryPassword from "./pages/RecoveryPassword/RecoveryPassword";
import { Toaster } from "sonner";

function App() {
  return(
    <>
      <Toaster position='top-right' richColors />

      <Router>
        <Routes>

          <Route path="/login" element={<LoginRoute />}>
            <Route index element={<Login />} />
          </Route>

          {/* ROTAS PUBLICAS */}
          <Route path="/recuperar-senha" element={<RecoveryPassword />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="/me" element={<MyProfile />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App
