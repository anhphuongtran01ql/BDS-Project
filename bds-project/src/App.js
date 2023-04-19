import "./App.css";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./components/ClientLayout/ClientLayout";
import Homepage from "../src/components/Layout/Homepage";
import Login from "../src/components/Auth/Login";
import NotFoundPage from "./components/Auth/NotFound";
import { SnackBarContext } from "./context/snackbarContext";
import { useState } from "react";
import AlertMassage from "./components/Layout/AlertMessage";
import DetailsPost from "./components/Post";
import CreatePost from "./components/Post/Create/CreatePost";
import AdminHomepage from "./components/Admin/Homepage";
import { PrivateRoute } from "./routes/privateRoutes";
import { UserInfo } from "./components/Admin/Users/detail";
import Content from "./components/Admin/Layout/content";

function App() {
  const [snackbarStatus, setSnackbarStatus] = useState({});

  return (
    <SnackBarContext.Provider value={[snackbarStatus, setSnackbarStatus]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/post/:postId" element={<DetailsPost />}></Route>
            <Route path="/post/create" element={<CreatePost />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/admin" element={<AdminHomepage />}>
              <Route path="/admin/list-users" element={<Content />}></Route>
              <Route
                path="/admin/list-users/:userId"
                element={<UserInfo />}
              ></Route>
            </Route>
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
