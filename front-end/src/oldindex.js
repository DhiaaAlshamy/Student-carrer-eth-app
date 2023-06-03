import { Drizzle, generateStore } from "@drizzle/store";
import MyStringStore from "./contracts/MyStringStore.json";
import StudentsStore from "./contracts/StudentsStore.json";
import UsersStore from "./contracts/UsersStore.json";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './oldApp';
import reportWebVitals from './reportWebVitals';
import Web3 from 'web3'

let web3

const root = ReactDOM.createRoot(document.getElementById('root'));
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
web3 = new Web3(new Web3.providers.HttpProvider("HTTP://192.168.0.242:7345"))
// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [MyStringStore,StudentsStore,UsersStore],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://192.168.0.242:7345",
    },
  },
};

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options);
// console.log(drizzle.contracts);
root.render(<App drizzle={drizzle} />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
