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
import Register from "./components/Auth/Register";
import EditPost from "./components/Post/Edit/EditPost";
import ListOfTypeOfApartments from "./components/Admin/TypeApartment/list";
import { EditTypeApartmentForm } from "./components/Admin/TypeApartment/edit";
import { CreateTypeApartmentForm } from "./components/Admin/TypeApartment/create";
import ListPost from "./components/Admin/Post/list";
import ListPostByUserId from "./components/Post/PostByUserId/list";

function App() {
  const [snackbarStatus, setSnackbarStatus] = useState({});

  return (
    <SnackBarContext.Provider value={[snackbarStatus, setSnackbarStatus]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/post/:postId" element={<DetailsPost />}></Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/post/create" element={<CreatePost />}></Route>
              <Route path="/post/edit/:id" element={<EditPost />}></Route>
              <Route
                path="/mod/list-post/:id"
                element={<ListPostByUserId />}
              ></Route>
            </Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/admin" element={<AdminHomepage />}>
              <Route path="/admin/list-users" element={<Content />}></Route>
              <Route
                path="/admin/list-types-apartment"
                element={<ListOfTypeOfApartments />}
              ></Route>
              <Route
                path="/admin/list-types-apartment/:id"
                element={<EditTypeApartmentForm />}
              ></Route>
              <Route
                path="/admin/list-types-apartment/create"
                element={<CreateTypeApartmentForm />}
              ></Route>
              <Route
                path="/admin/list-users/:userId"
                element={<UserInfo />}
              ></Route>
              <Route path="/admin/list-posts" element={<ListPost />}></Route>
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
