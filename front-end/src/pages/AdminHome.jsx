import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AdminSidebar, Students, UsersAccounts, AddUserForm, EditUserForm, AddStudent ,EditStudent} from '../components/Admin';
import { Layout } from "../components/Ui";
import MyProfile from "./MyProfile";


export default function AdminHome({drizzle, drizzleState }) {
  const routes = [
      { path: "/", exact: true, sidebar: () => <></>, main: () => <h2></h2> },
      { path: "/profile", exact: true, sidebar: () => <MyProfile></MyProfile>, main: () => <h2></h2> },
      { path: "/users", sidebar: () => <UsersAccounts drizzle={drizzle}
      drizzleState={drizzleState}></UsersAccounts>, main: () => <h2></h2> },
      { path: "/students", sidebar: () => <Students drizzle={drizzle}
      drizzleState={drizzleState}></Students>, main: () => <h2></h2> },
      { path: "/addUser", sidebar: () => <AddUserForm drizzle={drizzle}
      drizzleState={drizzleState} ></AddUserForm>, main: () => <></>},
      { path: "/addStudent", sidebar: () => <AddStudent drizzle={drizzle}
      drizzleState={drizzleState} ></AddStudent>, main: () => <></>},
      { path: "/editUser/:id", sidebar: () => <EditUserForm></EditUserForm>, main: () => <></> },
      { path: "/editStudent/:id", sidebar: () => <EditStudent drizzle={drizzle}
      drizzleState={drizzleState} ></EditStudent>, main: () => <></> }
    ];
  return (
    <Router>
      <Layout Navbar={AdminSidebar}>
        <div>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.sidebar />} />
            ))}
          </Routes>
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.main  />} />
            ))}
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}
