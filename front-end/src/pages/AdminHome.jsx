import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { AdminSidebar, Students, UsersAccounts, AddUserForm, EditUserForm, AddStudent ,EditStudent, Employers} from '../components/Admin';
import { Layout } from "../components/Ui";
import MyProfile from "./MyProfile";


export default function AdminHome({drizzle, drizzleState }) {
  return (
    <>
      <Layout Navbar={AdminSidebar}>
        <div>
       <Outlet/>
        </div>
      </Layout>
    </>
  );
}
