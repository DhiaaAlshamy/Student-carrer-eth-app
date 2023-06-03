import React, { useState, useEffect } from "react";
import { FaUserTie, FaUserGraduate, FaUser, FaArrowRight } from "react-icons/fa";
import Web3 from "web3";
import useDrizzle from "./hooks/useDrizzle";
import useDrizzleContractData from "./hooks/useDrizzleContractData";


const UserTypeSelection = ({userType,setUserType}) => {
  // Declare state variables for user type, account, and error message
  const [account, setAccount] = useState(null);
  const users = useDrizzleContractData("UsersStore", "getAllUsers");
  const [error, setError] = useState(null);
  const ganacheURL = "http://192.168.0.242:7345";
  const {drizzle,drizzleState} = useDrizzle()

// Use useEffect hook to check the account when it changes
useEffect(() => {
    // Declare a function to check the account
    const checkAccount = async () => {
      try {
        // Create a new web3 instance using Ganache URL
        const web3 = new Web3(ganacheURL);
        // Get the first Ganache account from web3
        const ganacheAccounts = await web3.eth.getAccounts();
        const ganacheAccount = ganacheAccounts[0];
        // console.log("safsa",ganacheAccounts);
        if(userType === "Admin"){
          if (account.toLowerCase() !== ganacheAccount.toLowerCase()) {
            // Display an error message if they don't match
            setError("Please connect the first Ganache account to be an admin.");
          } else {
            // Clear any previous error messages
            setError(null);
          }
        } 
        if(userType === "Student"){
          console.log(users);
          const us = users.find((us)=>us.publicAddress.toLowerCase()===account.toLowerCase());
          if(!us){
            setError("your account is not registered , please connect to a correct account .");
          }
          else if(us.role!=="Student"){
            setError("You are connect to non-student account ");

          }
          else{
            setError(null)
          }
        } 
        if(userType === "Employer"){
          console.log(users);
          const us = users.find((us)=>us.publicAddress.toLowerCase()===account.toLowerCase());
          if(!us){
            setError("your account is not registered , please connect to a correct account .");
          }
          else if(us.role!=="Employer"){
            setError("You are connect to non-Employer account ");

          }
          else{
            setError(null)
          }
        }

        
          
         
        
        // Compare it with the connected account
      } catch (err) {
        console.error(err);
        setError("Error checking Ganache account.");
      }
    };
  
    // Check the account if the user type is admin and the account is not null
    if (account) {
      checkAccount();
    }
  }, [account,userType,users]);
  

  // Declare a function to handle user type selection
  const handleSelect = (type) => {
    // Reset the error message
    setError(null);
    // Set the user type
    setUserType(type);
    // If the user type is admin, request account access
      requestAccount();
    

  };

  // Declare a function to request account access using MetaMask
  const requestAccount = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access and get the first account
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        // Set the account state
        setAccount(account);
      } catch (err) {
        // Handle any errors
        console.error(err);
        setError("Something went wrong while requesting account access.");
      }
    } else {
      // Display an error message if MetaMask is not installed
      setError("Please install MetaMask to connect your account.");
    }
  };
  const handleClick = () => {
    // Redirect to the dashboard based on the user type
    switch (userType) {
      case "Admin":
        window.location.href = "/admin";
        break;
      case "Student":
        window.location.href = "/student";
        break;
      case "Employer":
        window.location.href = "/employer";
        break;
      default:
        break;
    }
  };

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Select your user type
      </h1>
      <div className="flex justify-center items-center space-x-8">
        {/* User type selection buttons */}
        <button
          className={`p-4 rounded-full border-4 ${
            userType === "Admin" ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => handleSelect("Admin")}
        >
          <FaUserTie className="text-4xl" />
        </button>
        <button
          className={`p-4 rounded-full border-4 ${
            userType === "Student" ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => handleSelect("Student")}
        >
          <FaUserGraduate className="text-4xl" />
        </button>
        <button
          className={`p-4 rounded-full border-4 ${
            userType === "Other" ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => handleSelect("Employer")}
        >
          <FaUser className="text-4xl" />
        </button>
      </div>
      {/* Display the selected user type or error message */}
      <div className="mt-4 text-center">
        {(error) ? (
          <p className="text-red-500">{error}</p>
        ) : (
          userType && <p className="text-green-500">You are a {userType}</p>
        )}
      </div>
      {console.log(error||userType)}
      {(error || !userType)? (<p></p>):
      (
          
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Welcome {userType}!
      </h1>
      <div className="flex justify-center items-center">
        {/* Dashboard button */}
        <button
        onClick={handleClick}
          className="p-4 rounded-lg bg-green-500 text-white flex items-center space-x-2"
        >
          <span>Go to {userType} Dashboard</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
      )}
    </div>
  );
};

export default UserTypeSelection;