import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {AdminSidebar, UsersAccounts,Students} from './components/Admin'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from './components/Ui';
import { AdminHome } from './pages';
import ReadString from './ReadString';
import SetString from './SetString';
import ReadStudents from './ReadStudents';

class App extends Component {
  state = { loading: true, drizzleState: null, metamaskConnected: true };
 
  componentDidMount() {
    const { drizzle } = this.props;

    // check if MetaMask is installed and connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            this.setState({ metamaskConnected: true });
          }
        })
        .catch((error) => console.error(error));
    }

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return "Loading Drizzle...";
    } else if (!this.state.metamaskConnected) {
      return "Please connect to MetaMask";
    } else {
      return (
        <div className="App">
            <p>{this.state.drizzleState.accounts[0]}</p>
          <AdminHome  drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState} >

          </AdminHome>
          {/* <SetString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          /> */
          }
        </div>
      );
    }
  }
}

export default App;