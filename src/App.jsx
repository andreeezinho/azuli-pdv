import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./hooks/PrivateRoute";
import Login from "./pages/Login/Login";
import Pdv from "./pages/Pdv/Pdv";
import Finalizar from "./pages/Pdv/Finalizar";
import MyProfile from "./pages/MyProfile/MyProfile";
import Product from "./pages/Product/Product";
import LoginRoute from "./hooks/LoginRoute";
import RecoveryPassword from "./pages/RecoveryPassword/RecoveryPassword";
import { Toaster } from "sonner";

function App() {
  return(
    <>
      <Toaster position='top-center' richColors />

      <Router>
        <Routes>

          <Route path="/login" element={<LoginRoute />}>
            <Route index element={<Login />} />
          </Route>

          {/* ROTAS PUBLICAS */}
          <Route path="/recuperar-senha" element={<RecoveryPassword />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Pdv />} />
            <Route path="/finalizar" element={<Finalizar />} />
            <Route path="/produtos" element={<Product />} />
            <Route path="/me" element={<MyProfile />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App
