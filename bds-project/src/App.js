import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./components/ClientLayout/ClientLayout";
import Homepage from "../src/components/Layout/Homepage";
import Login from "../src/components/Auth/Login";
import NotFoundPage from "./components/Auth/NotFound";
import { SnackBarContext } from "./context/snackbarContext";
import { useState } from "react";
import AlertMassage from "./components/Layout/AlertMessage";
import AdminHomepage from "./components/Admin/Homepage";
import { PrivateRoute } from "./routes/privateRoutes";

function App() {
  const [snackbarStatus, setSnackbarStatus] = useState({});
  
  return (
    <SnackBarContext.Provider value={[snackbarStatus, setSnackbarStatus]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route path="" element={<Homepage />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminHomepage />}></Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {snackbarStatus.hasOwnProperty("msg") && (
          <AlertMassage message={snackbarStatus.msg} key={snackbarStatus.key} />
        )}
      </div>
    </SnackBarContext.Provider>
  );
}

export default App;
