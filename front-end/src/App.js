import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserTypeSelection from "./UserTypeSelection";
import StudentsStore from "./contracts/StudentsStore.json";
import UsersStore from "./contracts/UsersStore.json";
import { DrizzleContext } from "@drizzle/react-plugin";

import { AdminSidebar, Students, UsersAccounts, AddUserForm, EditUserForm, AddStudent ,EditStudent, Employers} from './components/Admin';

import { AdminHome, StudentHome } from "./pages";
import Web3 from "web3";
import { Drizzle, generateStore } from "@drizzle/store";
import MyProfile from "./pages/MyProfile";
import { MySemesters } from "./components/Student";

function App() {
    
    const [userType, setUserType] = useState(null);
    let web3
  
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Use MetaMask provider
    window.ethereum.enable().then(() => {
      web3 = new Web3(window.ethereum)
      // console.log(web3);
      web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
            App.account = account;
            console.log("account", App.account);
        }
    })
    }).catch((error) => {
      console.error(error)
    })
    // web3 = new Web3(new Web3.providers.HttpProvider("HTTP://192.168.0.242:7345"))
  } else {
    // Use local provider (e.g., Ganache)
  }
  // let drizzle know what contracts we want and how to access our test blockchain
  const options = {
    contracts: [StudentsStore,UsersStore],
    web3: {
      fallback: {
        type: "ws",
        url: "ws://192.168.0.242:7345",
      },
    },
  };
  
  // setup the drizzle store and drizzle
  const drizzle = new Drizzle(options);
  
  // use the drizzle context to access the drizzle state
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzleState } = drizzleContext;
  
          // check if drizzle is initialized
          if (!drizzleState) {
            return "Loading...";
          }
  
          // render the app with the routes and the drizzle state
          return (
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<UserTypeSelection userType={userType} setUserType={setUserType} />} />
                  <Route path="/admin" element={<AdminHome />}>
                    {/* Define child routes inside the parent route element */}
                    <Route path="profile" element={<MyProfile />} />
                    <Route path="users" element={<UsersAccounts drizzle={drizzle} drizzleState={drizzleState} />} />
                    <Route path="students" element={<Students drizzle={drizzle} drizzleState={drizzleState} />} />
                    <Route path="employers" element={<Employers drizzle={drizzle} drizzleState={drizzleState} />} />
                    <Route path="addUser" element={<AddUserForm drizzle={drizzle} drizzleState={drizzleState} />} />
                    <Route path="addStudent" element={<AddStudent drizzle={drizzle} drizzleState={drizzleState} />} />
                    <Route path="editUser/:id" element={<EditUserForm />} />
                    <Route path="editStudent/:id" element={<EditStudent drizzle={drizzle} drizzleState={drizzleState} />} />
                  </Route>
                  <Route path="/student" element={<StudentHome />}>
                    {/* Define child routes inside the parent route element */}
                    <Route path="profile" element={<MyProfile />} />
                    <Route path="mySemesters" element={<MySemesters />} />
                    </Route>
                </Routes>
              </div>
            </Router>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
  }
  
  export default App;