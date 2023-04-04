import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./components/ClientLayout/ClientLayout";
import Homepage from "../src/components/Layout/Homepage";
import Login from "../src/components/Auth/Login";
import NotFoundPage from "./components/Auth/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="" element={<Homepage />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
