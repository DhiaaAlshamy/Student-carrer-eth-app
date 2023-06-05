import React, { useContext, useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import useDrizzleContractFunction from "../hooks/useDrizzleContractFunction";

function TokenBalance({ tokenName }) {
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
  const bl = useDrizzleContractFunction("TokenStore","transfer");
  const [balance, setBalance] = useState(null);
  const [allowance, setAllowance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (drizzleState.accounts[0]) {
        const tokenContract = drizzle.contracts.TokenStore;
        const balance = await tokenContract.methods.balanceOf(drizzleState.accounts[0]).call();
        const allowance = await tokenContract.methods.allowance(drizzleState.accounts[0],drizzleState.accounts[0]).call();
        setBalance(balance);
        setAllowance(allowance);
      }
    };

    fetchBalance();
  }, [drizzleState.accounts[0], drizzle.contracts.TokenStore.methods]);
  
  const addBalance=()=>{
    bl.send(drizzleState.accounts[0],100)

  }

  if (!balance) {
    return <p>Loading...</p>;
  }



  return (
    <div>
      <p> {balance}</p>
    </div>
  );
}

export default TokenBalance;
